import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen bg-background">
        <Hero />
        <Benefits />
        <Pricing />
      </div>
    </ThemeProvider>
  );
};

export default Index;