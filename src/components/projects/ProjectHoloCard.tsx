import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { personalInfo } from "@/data/portfolio-data";
import type { Project } from "@/types/portfolio";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

interface ProjectHoloCardProps {
  project: Project;
  index: number;
  total: number;
}

export default function ProjectHoloCard({ project, index, total }: ProjectHoloCardProps) {
  const reducedMotion = usePrefersReducedMotion();
  const tags = project.techStack.slice(0, 4);
  const rarity = project.status === "active" ? "LIVE" : "ARCHIVED";

  const card = (
    <div className="relative isolate w-full max-w-[380px] overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <div className="relative z-20">
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="font-['Rubik'] text-[10px] uppercase tracking-[0.25em] text-black/40">
            FEEK // PROJECTS
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <h4 className="mb-5 font-['Rubik'] text-2xl font-bold uppercase leading-none tracking-tight text-foreground">
          {project.fullName}
        </h4>

        <div className="mb-5 rounded-xl border border-black/10 bg-black/[0.03] p-4">
          <p className="line-clamp-4 font-['Rubik'] text-sm leading-relaxed text-muted-foreground">
            {project.overview}
          </p>
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {tags.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 font-['Rubik'] text-[10px] uppercase tracking-wide text-foreground/70"
            >
              {tech}
            </span>
          ))}
          <span className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 font-['Rubik'] text-[10px] uppercase tracking-wide text-muted-foreground">
            {project.year}
          </span>
          <span className="rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 font-['Rubik'] text-[10px] uppercase tracking-wide text-muted-foreground">
            {project.org}
          </span>
        </div>

        <div className="mb-3 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
          <span className="font-['Rubik'] text-[11px] uppercase tracking-wide text-muted-foreground">
            by {personalInfo.name}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 font-['Rubik'] text-[10px] font-medium uppercase tracking-widest"
            style={{
              color: "var(--highlightColor)",
              borderColor: "color-mix(in oklab, var(--highlightColor) 45%, transparent)",
              backgroundColor: "color-mix(in oklab, var(--highlightColor) 12%, transparent)",
            }}
          >
            {rarity}
          </span>
        </div>

        <p className="font-mono text-[10px] lowercase tracking-wide text-black/25">
          {project.slug} / {project.id}
        </p>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[380px]">
      {reducedMotion ? (
        card
      ) : (
        <Tilt
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={1000}
          scale={1.02}
          glareEnable={false}
          transitionSpeed={900}
        >
          {card}
        </Tilt>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View project ${project.fullName}`}
          className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-['Rubik'] text-xs font-medium uppercase tracking-widest transition-shadow hover:shadow-[0_0_24px_var(--highlightColor)]"
          style={{
            color: "var(--highlightColor)",
            borderColor: "var(--highlightColor)",
            boxShadow: "0 0 12px color-mix(in oklab, var(--highlightColor) 40%, transparent)",
          }}
        >
          View project
          <ArrowUpRight className="size-4" />
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-['Rubik'] text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            Live site
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
