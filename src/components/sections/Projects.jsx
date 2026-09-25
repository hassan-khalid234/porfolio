import { projects } from "../../data/projects";
import PipelineSchematic from "../schematic/PipelineSchematic";

export default function Projects() {
    return (
        <section className="py-16 px-6 md:px-12 flex flex-col gap-20 items-center">
            {projects.map((p) => (
                <div key={p.id} className="w-full max-w-4xl">
                    {/* desktop */}
                    <div className="hidden md:block">
                        <PipelineSchematic project={p} />
                    </div>
                    {/* mobile */}
                    <div className="block md:hidden">
                        <PipelineSchematic project={p} mobile />
                    </div>
                </div>
            ))}
        </section>
    );
}