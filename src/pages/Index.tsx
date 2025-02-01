import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen bg-background">
        {showChat ? (
          <div className="fixed inset-0 z-50 bg-background">
            <ChatInterface
              formData={{
                websiteName: "",
                category: "",
                goal: "",
                traffic: ""
              }}
            />
          </div>
        ) : (
          <>
            <Hero />
            <Benefits />
            <Pricing />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;