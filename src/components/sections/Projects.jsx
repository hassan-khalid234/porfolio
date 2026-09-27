import { projects } from "../../data/projects";
import PipelineSchematic from "../schematic/PipelineSchematic";

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6 md:px-12 flex flex-col gap-16 items-center scroll-mt-20">
      {projects.map((p, i) => (
        <div key={p.id} id={p.id} className="w-full max-w-4xl scroll-mt-20">
          <div className="hidden md:block">
            <PipelineSchematic project={p} sheetNumber={i + 1} sheetTotal={projects.length} />
          </div>
          <div className="block md:hidden">
            <PipelineSchematic project={p} mobile sheetNumber={i + 1} sheetTotal={projects.length} />
          </div>
        </div>
      ))}
    </section>
  );
}