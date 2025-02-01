import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  // Listen for the custom event from WebsiteForm
  useState(() => {
    const handleShowChat = () => setShowChat(true);
    window.addEventListener('showChat', handleShowChat);
    return () => window.removeEventListener('showChat', handleShowChat);
  });

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
            {/* Benefits and Pricing are only shown on initial landing */}
            <div className={`transition-opacity duration-500 ${showChat ? 'opacity-0 hidden' : 'opacity-100'}`}>
              <Benefits />
              <Pricing />
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;