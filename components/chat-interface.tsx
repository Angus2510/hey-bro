"use client";

import { useRef, useEffect, useState } from "react";
import { Message, ChatSettings, DEFAULT_CHAT_SETTINGS } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, Settings2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  settings?: ChatSettings;
  onSettingsChange?: (settings: ChatSettings) => void;
}

export function ChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
  settings = DEFAULT_CHAT_SETTINGS,
  onSettingsChange,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleToneChange = (tone: ChatSettings["tone"]) => {
    if (onSettingsChange) {
      onSettingsChange({ ...settings, tone });
    }
  };

  const handleManToManToggle = () => {
    if (onSettingsChange) {
      onSettingsChange({ ...settings, manToManMode: !settings.manToManMode });
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-lg font-semibold">HeyBro Chat</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </div>

      {isSettingsOpen && (
        <Card className="m-2 p-4">
          <h3 className="font-medium mb-2">Chatbot Settings</h3>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm text-muted-foreground mb-2">Tone</h4>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={settings.tone === "friendly" ? "default" : "outline"}
                  onClick={() => handleToneChange("friendly")}
                >
                  Friendly
                </Button>
                <Button
                  size="sm"
                  variant={settings.tone === "blunt" ? "default" : "outline"}
                  onClick={() => handleToneChange("blunt")}
                >
                  Blunt
                </Button>
                <Button
                  size="sm"
                  variant={
                    settings.tone === "supportive" ? "default" : "outline"
                  }
                  onClick={() => handleToneChange("supportive")}
                >
                  Supportive Big Bro
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-muted-foreground">
                  Man-to-Man Mode
                </h4>
                <Button
                  size="sm"
                  variant={settings.manToManMode ? "default" : "outline"}
                  onClick={handleManToManToggle}
                >
                  {settings.manToManMode ? "On" : "Off"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Stripped-down, no-fluff responses
              </p>
            </div>
          </div>
        </Card>
      )}

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-muted max-w-[80%] rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <span className="animate-bounce">●</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    ●
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  >
                    ●
                  </span>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 top-1/2 -translate-y-1/2 disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
