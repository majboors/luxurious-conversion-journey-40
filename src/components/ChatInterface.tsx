import { useState, useEffect } from "react";
import { Loader2, Send, ExternalLink } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TypewriterText } from "./TypewriterText";
import { toast } from "./ui/use-toast";

interface ChatInterfaceProps {
  formData: {
    websiteName: string;
    category: string;
    goal: string;
    traffic: string;
  };
}

interface Message {
  id: number;
  text: string;
  sender: "developer" | "user";
  isTyping?: boolean;
  isLink?: boolean;
}

export const ChatInterface = ({ formData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const words = [
    "Building your dream website",
    "Expert development in progress",
    "Creating your success story",
    "Crafting the perfect solution",
    "Making your vision reality"
  ];

  const handleExampleClick = () => {
    toast({
      title: "Example Website",
      description: "Opening example website preview...",
    });
    window.open('https://example.com', '_blank');
  };

  const addMessage = (text: string, sender: "developer" | "user", delay: number, isLink: boolean = false) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text,
          sender,
          isLink
        }]);
        resolve();
      }, delay);
    });
  };

  useEffect(() => {
    const initializeChat = async () => {
      // First message with selected options - only add if values exist
      if (formData.websiteName || formData.category || formData.goal || formData.traffic) {
        const selectedOptionsMessage = [
          "Here are my website requirements:",
          `Website Name: ${formData.websiteName || 'Not specified'}`,
          `Category: ${formData.category || 'Not specified'}`,
          `Goal: ${formData.goal || 'Not specified'}`,
          `Expected Traffic: ${formData.traffic || 'Not specified'}`
        ].join('\n');

        await addMessage(selectedOptionsMessage, "user", 1000);
      }

      setIsTyping(true);
      await addMessage("Assalamualaikum, I'm on the project.", "developer", 2000);
      await addMessage("We've made over thousands of websites!", "developer", 2000);
      setIsTyping(false);

      setIsTyping(true);
      await addMessage(
        "Wait, I just checked—we've made a similar website for a brand in Australia. Please give me 10 seconds to customize it for you.",
        "developer",
        2000
      );
      setIsTyping(false);

      // Add 10-second delay before showing the example website link
      await new Promise(resolve => setTimeout(resolve, 10000));

      await addMessage(
        `View your example website: ${formData.websiteName || 'Your Website'}`,
        "developer",
        0,
        true
      );
    };

    initializeChat();
  }, [formData]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, "user", 0);
      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Side Panel with Animations */}
      <div className="w-1/4 border-r border-border bg-primary/5 p-4 flex flex-col space-y-8 animate-slide-in-right">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-secondary-DEFAULT mb-2">
            <TypewriterText words={words} delay={3000} />
          </h3>
        </div>
        <div className="space-y-4">
          {["Professional Design", "Fast Development", "SEO Optimized"].map((benefit, index) => (
            <div 
              key={benefit}
              className="p-3 bg-background/50 rounded-lg text-sm animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {benefit}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-primary/5">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="https://www.aurumbureau.com/wp-content/uploads/2020/11/Aurum-Speakers-Bureau-Samy-Kamkar.jpg"
              alt="Developer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">You're talking to one of our best developers!</h3>
            <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "developer" ? "justify-start" : "justify-end"
              }`}
            >
              {message.sender === "developer" && (
                <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <img
                    src="https://www.aurumbureau.com/wp-content/uploads/2020/11/Aurum-Speakers-Bureau-Samy-Kamkar.jpg"
                    alt="Developer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender === "developer"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.isLink ? (
                  <button
                    onClick={handleExampleClick}
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <span className="whitespace-pre-wrap">{message.text}</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Samy is typing...</span>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};