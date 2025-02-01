import { useTheme } from "next-themes";
import { TypewriterText } from "./TypewriterText";
import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  const { theme } = useTheme();
  
  const loadingMessages = [
    "Finding developer...",
    "Processing timezones...",
    "Finding best developer...",
    "Found your developer!",
    "Connecting you to our best designer...",
    "Please wait while we ensure the developer is reading your project...",
    "Giving strict instructions to developer...",
    "Preparing your confidential project details...",
    "Setting up your customer profile...",
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center flex-col gap-8 animate-fade-in">
      <Loader2 className="h-12 w-12 animate-spin text-secondary-DEFAULT" />
      <div className="h-12 text-xl font-medium">
        <TypewriterText words={loadingMessages} delay={3000} />
      </div>
    </div>
  );
};