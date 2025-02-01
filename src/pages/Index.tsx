import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";

const Index = () => {
  return (
    <div className="min-h-screen bg-primary-DEFAULT">
      <Hero />
      <Benefits />
      <Pricing />
    </div>
  );
};

export default Index;