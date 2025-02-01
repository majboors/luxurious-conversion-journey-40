import { TypewriterText } from "./TypewriterText";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const Hero = () => {
  const words = ["Rich", "Famous", "Successful", "Profitable", "Unstoppable"];
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-DEFAULT to-accent-DEFAULT p-4 relative">
      {/* Theme Toggle */}
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
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
          Get <TypewriterText words={words} delay={2000} /> <br />
          Get a website.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-12 text-foreground/80">
          Your professional website is just one click away
        </p>

        {/* Main CTA */}
        <Button
          size="lg"
          className="bg-secondary-DEFAULT text-secondary-foreground hover:bg-secondary-DEFAULT/90 text-lg px-8 py-6 h-auto animate-pulse"
        >
          Get Your Website Now for 15 USD
        </Button>

        {/* Secondary CTAs */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {["Start Building", "I Want My Site", "Begin Now"].map((text, index) => (
            <Button
              key={index}
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/10 text-foreground"
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};