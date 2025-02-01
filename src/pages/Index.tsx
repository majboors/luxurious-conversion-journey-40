import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <div className="min-h-screen bg-primary-DEFAULT">
        <Hero />
        <Benefits />
        <Pricing />
      </div>
    </ThemeProvider>
  );
};

export default Index;