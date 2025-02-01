import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";
import { useState } from "react";

const Index = () => {
  const [isChatActive, setIsChatActive] = useState(false);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen bg-background">
        <Hero isChatActive={isChatActive} />
        {!isChatActive && (
          <>
            <Benefits />
            <Pricing />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;