import Skills from "../components/sections/Skills";
import Timeline from "../components/sections/Timeline";
import SectionDivider from "../components/primitives/SectionDivider";

export default function SkillsPage() {
  return (
    <div className="pb-24 md:pb-0">
      <Skills />
      <SectionDivider label="REVISION HISTORY" />
      <Timeline />
    </div>
  );
}