import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

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

  return (
    <div className="flex flex-col h-[600px] bg-background p-4 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "developer" ? "justify-start" : "justify-end"
            }`}
          >
            {message.sender === "developer" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                <img
                  src="https://media.licdn.com/dms/image/D4D03AQGg8KiLDrpqQw/profile-displayphoto-shrink_800_800/0/1696799729144?e=1716422400&v=beta&t=Qd_RyI_7QQE6RqzQHqvyLLxqvkGP-RpPZqjQvLBvN0I"
                  alt="Waleed Ajmal"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "developer"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Waleed is typing...</span>
          </div>
        )}
      </div>
    </div>
  );
};