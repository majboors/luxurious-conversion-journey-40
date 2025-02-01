import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Calendar, BookOpen, Image } from "lucide-react";
import { LoadingScreen } from "./LoadingScreen";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ChatInterface } from "./ChatInterface";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WebsiteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormStep {
  title: string;
  description: string;
}

const steps: FormStep[] = [
  {
    title: "What's Your Website Name?",
    description: "Choose a memorable name for your website",
  },
  {
    title: "What Is Your Website About?",
    description: "Select the category that best fits your website",
  },
  {
    title: "What Do You Aim to Do?",
    description: "Tell us your main goal",
  },
  {
    title: "Expected Traffic",
    description: "How many visitors are you expecting?",
  },
];

export const WebsiteForm = ({ open, onOpenChange }: WebsiteFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showInitialLoading, setShowInitialLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFinalLoading, setShowFinalLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    websiteName: "",
    category: "",
    goal: "",
    traffic: "",
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onOpenChange(false);
      setShowInitialLoading(true);
      
      setTimeout(() => {
        setShowInitialLoading(false);
        setShowSuccess(true);
      }, 3000);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setShowFinalLoading(true);
    
    setTimeout(() => {
      setShowFinalLoading(false);
      setShowChat(true);
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 py-6">
            <Input
              placeholder="www.yourwebsite.com"
              value={formData.websiteName}
              onChange={(e) =>
                setFormData({ ...formData, websiteName: e.target.value })
              }
              className="text-lg py-6 px-4 transition-all duration-300 focus:scale-105"
            />
          </div>
        );
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4 py-6">
            {[
              { icon: ShoppingCart, label: "Ecommerce", hoverBg: "hover:bg-[#D6BCFA]" },
              { icon: Calendar, label: "Events", hoverBg: "hover:bg-[#FEF7CD]" },
              { icon: BookOpen, label: "Blogs", hoverBg: "hover:bg-[#D3E4FD]" },
              { icon: Image, label: "Portfolio", hoverBg: "hover:bg-[#86EFAC]" },
            ].map(({ icon: Icon, label, hoverBg }) => (
              <Button
                key={label}
                variant={formData.category === label ? "default" : "outline"}
                className={`h-24 relative group ${hoverBg} transition-colors duration-300`}
                onClick={() => setFormData({ ...formData, category: label })}
              >
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <Icon 
                    className={`h-6 w-6 absolute top-0 opacity-0 group-hover:opacity-100 transition-all duration-500 transform 
                      ${formData.category === label ? 'translate-y-8 opacity-100' : 'group-hover:translate-y-8'}`}
                  />
                  <span className="mt-8">{label}</span>
                </div>
              </Button>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 gap-4 py-6">
            {[
              { icon: DollarSign, label: "Make passive income" },
              { icon: Megaphone, label: "Inform people" },
              { icon: Users, label: "Build a community" },
              { icon: Target, label: "Generate leads" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant={formData.goal === label ? "default" : "outline"}
                className="h-24 space-y-2 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => setFormData({ ...formData, goal: label })}
              >
                <Icon className="h-6 w-6" />
                <span className="text-center text-sm">{label}</span>
              </Button>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 gap-4 py-6">
            {["Just starting out", "Moderate traffic", "High volume"].map(
              (option) => (
                <Button
                  key={option}
                  variant={formData.traffic === option ? "default" : "outline"}
                  className="h-16 hover:scale-105 transition-all duration-300"
                  onClick={() => setFormData({ ...formData, traffic: option })}
                >
                  {option}
                </Button>
              )
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (showChat) {
    return <ChatInterface formData={formData} />;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="space-y-8">
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% completed</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            {renderStep()}

            <div className="flex justify-end">
              <Button
                onClick={handleNext}
                className="w-32 h-12 text-lg hover:scale-105 transition-all duration-300"
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl text-center mb-4">
              You're in luck! We have one of our developers online right now.
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src="https://media.licdn.com/dms/image/D4D03AQGg8KiLDrpqQw/profile-displayphoto-shrink_800_800/0/1696799729144?e=1716422400&v=beta&t=Qd_RyI_7QQE6RqzQHqvyLLxqvkGP-RpPZqjQvLBvN0I"
                    alt="Waleed Ajmal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">Waleed Ajmal</h3>
                  <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/waleed-ajmal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>View LinkedIn Profile</span>
                </a>
                <AnimatedButton 
                  onClick={handleSuccessClose}
                  className="mt-4 w-full"
                >
                  Continue
                </AnimatedButton>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      {showInitialLoading && <LoadingScreen />}
      {showFinalLoading && <LoadingScreen />}
    </>
  );
};
