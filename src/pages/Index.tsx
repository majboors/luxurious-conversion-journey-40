import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { EmailCollectionPopup } from "@/components/EmailCollectionPopup";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(true);
  const [formData, setFormData] = useState({
    websiteName: "",
    websiteDescription: "",
    category: "",
    goal: "",
    traffic: ""
  });

  // Add scroll tracking for main sections
  useScrollTracking('main-content');
  useScrollTracking('hero-section');
  useScrollTracking('benefits-section');
  useScrollTracking('pricing-section');

  useEffect(() => {
    const handleShowChat = (event: CustomEvent) => {
      setShowChat(true);
      setFormData(event.detail.formData);
    };

    window.addEventListener('showChat', handleShowChat as EventListener);
    return () => window.removeEventListener('showChat', handleShowChat as EventListener);
  }, []);

  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <div className="min-h-screen bg-background" id="main-content">
        <EmailCollectionPopup 
          open={showEmailPopup} 
          onOpenChange={setShowEmailPopup} 
        />
        {showChat ? (
          <div className="fixed inset-0 z-50 bg-background">
            <ChatInterface formData={formData} />
          </div>
        ) : (
          <>
            <div id="hero-section">
              <Hero />
            </div>
            <div className={`transition-opacity duration-500 ${showChat ? 'opacity-0 hidden' : 'opacity-100'}`}>
              <div id="benefits-section">
                <Benefits />
              </div>
              <div id="pricing-section">
                <Pricing />
              </div>
            </div>
          </>
        )}
        <WhatsAppChat />
      </div>
    </ThemeProvider>
  );
};

export default Index;