import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectHoloCard from "@/components/projects/ProjectHoloCard";
import { projects } from "@/data/portfolio-data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>(".project-holo-item");
      const scroller = root.closest(".overflow-y-scroll") as HTMLElement | null;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(cards, {
          y: 28,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: root,
            scroller: scroller || undefined,
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <div className="flex items-end justify-between gap-6 mb-10">
        <h3 className="text-orange uppercase tracking-wide font-['Rubik'] text-lg font-medium">
          PROJECTS
        </h3>
        <p className="text-orange font-['Rubik'] text-sm uppercase tracking-wide">
          {String(projects.length).padStart(2, "0")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center sm:justify-items-start">
        {projects.map((project, index) => (
          <div key={project.id} className="project-holo-item w-full max-w-[380px]">
            <ProjectHoloCard project={project} index={index} total={projects.length} />
          </div>
        ))}
      </div>
    </div>
  );
}
