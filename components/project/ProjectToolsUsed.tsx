import { Wrench } from "lucide-react";

export function ProjectToolsUsed({ tools }: { tools: string[] }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground/50">
        <Wrench className="h-4 w-4 text-primary" aria-hidden="true" />
        Tools Used
      </h2>
      {tools.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full border border-card-border bg-card px-3 py-1 text-sm font-medium text-heading shadow-card"
            >
              {tool}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-foreground/40">
          Add the tools used for this project.
        </p>
      )}
    </section>
  );
}
