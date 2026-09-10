import { Hero } from "@/components/Hero";
import { StatCards } from "@/components/StatCards";
import { ToolsStrip } from "@/components/ToolsStrip";
import { BentoDashboard } from "@/components/bento/BentoDashboard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatCards />
      <ToolsStrip />
      <BentoDashboard />
    </>
  );
}
