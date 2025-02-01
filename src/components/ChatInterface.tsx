import { useState, useEffect } from "react";
import { Loader2, Send, ExternalLink, Check } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TypewriterText } from "./TypewriterText";
import { toast } from "./ui/use-toast";
import { handleAction } from "@/utils/actionHandler";
import { useScrollTracking } from "@/hooks/useScrollTracking";
import { getThemePreview } from "@/utils/themePreview";

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
  const [canType, setCanType] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const words = [
    "Building your dream website",
    "Expert development in progress",
    "Creating your success story",
    "Crafting the perfect solution",
    "Making your vision reality"
  ];

  const handleExampleClick = async () => {
    await handleAction('button_click', { button_id: 'example_website' });
    toast({
      title: "Example Website",
      description: "Opening example website preview...",
    });
    window.open(previewUrl || 'https://example.com', '_blank');
  };

  const redirectToWhatsApp = async (message: string) => {
    await handleAction('button_click', { button_id: 'whatsapp_redirect' });
    const baseUrl = "https://api.whatsapp.com/send/?phone=923461115757";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${baseUrl}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, '_blank');
  };

  const addMessage = async (text: string, sender: "developer" | "user", delay: number, isLink: boolean = false) => {
    if (sender === "user") {
      await handleAction('text_input', { text });
    }
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

      try {
        const preview = await getThemePreview(formData);
        setPreviewUrl(preview.preview_url);
        setSearchQuery(preview.search_query);

        // Add the plain English description to the chat
        if (preview.plain_description) {
          await addMessage(
            `Here's how I understood your requirements:\n${preview.plain_description}`,
            "developer",
            0
          );
        }

        // Add the raw response to the chat for debugging
        if (preview.raw_response) {
          await addMessage(
            `Debug - Raw API Response:\n${preview.raw_response}`,
            "developer",
            0
          );
        }

        await addMessage(
          `This is your website ${preview.search_query}`,
          "developer",
          0,
          true
        );
      } catch (error) {
        console.error('Failed to get theme preview:', error);
        await addMessage(
          `View your example website: ${formData.websiteName || 'Your Website'}`,
          "developer",
          0,
          true
        );
      }
      
      setCanType(true);
    };

    initializeChat();
  }, [formData]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() && canType) {
      await handleAction('text_input', { text: inputMessage });
      await addMessage(inputMessage, "user", 0);
      redirectToWhatsApp(inputMessage);
      setInputMessage("");
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputMessage(text);
    await handleAction('text_input', { text });
  };

  // Add scroll tracking
  useScrollTracking('chat-messages');
  useScrollTracking('benefits-sidebar');

  return (
    <div className="flex h-screen bg-background">
      <div id="benefits-sidebar" className="w-1/4 border-r border-border bg-primary/5 p-4 flex flex-col space-y-8 animate-slide-in-right overflow-y-auto">
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
        
        {/* CTA Package - Only shown after example website is sent */}
        {canType && (
          <div className="bg-white rounded-xl p-6 shadow-lg animate-fade-in">
            <h4 className="text-xl font-bold text-primary-DEFAULT mb-4 text-center">
              Special Offer
            </h4>
            <ul className="space-y-3 mb-6">
              {[
                "No BS Website",
                "Instant Website",
                "You Own It",
                "5 Free Revisions"
              ].map((feature, index) => (
                <li key={feature} className="flex items-center gap-2 text-primary-DEFAULT">
                  <Check className="h-5 w-5 text-secondary-DEFAULT" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={handleExampleClick}
              className="w-full bg-secondary-DEFAULT text-secondary-foreground py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Buy Now! $15
            </button>
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col">
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

        <div id="chat-messages" className="flex-1 overflow-y-auto p-4 space-y-4">
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

        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={handleInputChange}
              placeholder={canType ? "Type your message..." : "Please wait for developer..."}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!canType}
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!canType}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
