import { useState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
}

export const ChatInterface = ({ formData }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");

  const addMessage = (text: string, sender: "developer" | "user", delay: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text,
          sender
        }]);
        resolve();
      }, delay);
    });
  };

  useEffect(() => {
    const initializeChat = async () => {
      // Summary message
      await addMessage(
        `Domain: ${formData.websiteName}\nCategory: ${formData.category}\nGoal: ${formData.goal}\nExpected Traffic: ${formData.traffic}`,
        "user",
        1000
      );

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

      // Add example link
      await addMessage(
        `View your example website: ${formData.websiteName}`,
        "developer",
        2000
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
    <div className="flex flex-col h-[600px] bg-background rounded-lg shadow-lg border border-border">
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
          <h3 className="font-semibold">Samy Kamkar</h3>
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
              <p className="whitespace-pre-wrap">{message.text}</p>
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
  );
};