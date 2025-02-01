import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Calendar, BookOpen, Image, DollarSign, Megaphone, Users, Target, ChevronRight } from "lucide-react";

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

interface WebsiteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WebsiteForm = ({ open, onOpenChange }: WebsiteFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);
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
      // Show completion dialog or proceed to next step
      console.log("Form completed:", formData);
    }
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
              { icon: ShoppingCart, label: "Ecommerce" },
              { icon: Calendar, label: "Events" },
              { icon: BookOpen, label: "Blogs" },
              { icon: Image, label: "Portfolio" },
            ].map(({ icon: Icon, label }) => (
              <Button
                key={label}
                variant={formData.category === label ? "default" : "outline"}
                className="h-24 space-y-2 flex flex-col items-center justify-center hover:scale-105 transition-all duration-300"
                onClick={() => setFormData({ ...formData, category: label })}
              >
                <Icon className="h-6 w-6" />
                <span>{label}</span>
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

  return (
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
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};