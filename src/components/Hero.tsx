import { TypewriterText } from "./TypewriterText";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { WebsiteForm } from "./WebsiteForm";

export const Hero = ({ isChatActive = false }) => {
  const words = [
    "We'll build your website lightning fast!",
    "Expert developers at your service",
    "Quality code, delivered quickly",
    "Your vision, our expertise",
    "Professional web solutions"
  ];
  const { theme, setTheme } = useTheme();
  const [showForm, setShowForm] = useState(false);

  if (isChatActive) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-8 animate-fade-in">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
          You are talking to one of our best developers!
        </h2>
        <div className="text-xl text-foreground/80">
          <TypewriterText words={words} delay={3000} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-DEFAULT to-accent-DEFAULT p-4 relative">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-secondary-DEFAULT" />
        ) : (
          <Moon className="h-6 w-6 text-secondary-DEFAULT" />
        )}
      </button>

      <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground">
          Get <TypewriterText words={["Rich", "Famous", "Successful", "Profitable", "Unstoppable"]} delay={2000} /> <br />
          Get a website.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-12 text-foreground/80">
          Your professional website is just one click away
        </p>

        {/* Main CTA */}
        <Button
          size="lg"
          onClick={() => setShowForm(true)}
          className="bg-secondary-DEFAULT text-secondary-foreground hover:bg-secondary-DEFAULT/90 text-lg px-8 py-6 h-auto transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-secondary-DEFAULT/20 animate-pulse"
        >
          Get Your Website Now for 15 USD
        </Button>
      </div>

      <WebsiteForm open={showForm} onOpenChange={setShowForm} />
    </div>
  );
};