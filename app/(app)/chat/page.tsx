"use client";

import { useState, useEffect } from "react";
import { ChatInterface } from "@/components/chat-interface";
import { Message, ChatSettings, DEFAULT_CHAT_SETTINGS } from "@/lib/types";
import { nanoid } from "nanoid";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_CHAT_SETTINGS);

  // Initial greeting message
  useEffect(() => {
    // Only add welcome message if there are no messages yet
    if (messages.length === 0) {
      setMessages([
        {
          id: nanoid(),
          content: getWelcomeMessage(settings.tone),
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length, settings.tone]);

  const handleSendMessage = async (content: string) => {
    // Add user message to the chat
    const userMessage: Message = {
      id: nanoid(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real implementation, this would be an API call to your AI service
      // For MVP, we'll simulate a response
      setTimeout(() => {
        const aiResponse: Message = {
          id: nanoid(),
          content: getSimulatedResponse(content, settings),
          role: "assistant",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setIsLoading(false);

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          content:
            "Sorry, I'm having trouble responding right now. Please try again later.",
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
}

// Helper functions for simulating responses

function getWelcomeMessage(tone: ChatSettings["tone"]): string {
  switch (tone) {
    case "friendly":
      return "Hey there! I'm HeyBro, your mental health buddy. How can I support you today?";
    case "blunt":
      return "Hey. I'm HeyBro. No judgment, no BS. What's on your mind?";
    case "supportive":
      return "Hey bro, I've got your back. Whatever you're going through, we'll work through it together. What's up?";
    default:
      return "Hey there! I'm HeyBro, your mental health buddy. How can I support you today?";
  }
}

function getSimulatedResponse(
  userMessage: string,
  settings: ChatSettings
): string {
  const lowerCaseMessage = userMessage.toLowerCase();

  // Check for common themes in the message
  if (
    lowerCaseMessage.includes("stress") ||
    lowerCaseMessage.includes("anxious") ||
    lowerCaseMessage.includes("worried")
  ) {
    switch (settings.tone) {
      case "friendly":
        return settings.manToManMode
          ? "Stress happens. Try deep breathing - in for 4, hold for 4, out for 6. Repeat 5 times."
          : "I can hear that you're feeling stressed. That's completely normal, and it happens to all of us. Something that might help is taking a few deep breaths - try breathing in for 4 counts, holding for 4, and exhaling for 6. Do this about 5 times and see if it helps calm your nervous system.";
      case "blunt":
        return settings.manToManMode
          ? "Everyone gets stressed. It's how you handle it that matters. Deep breathing. Exercise. Cut the alcohol. Sleep more."
          : "Look, everyone gets stressed. It's how you handle it that matters. Try some deep breathing right now. Then consider exercise - it's not just for your body, it crushes stress too. Cut back on alcohol if that's in the picture, and prioritize sleep. Basic stuff, but it works.";
      case "supportive":
        return settings.manToManMode
          ? "I've been there with the stress, man. Physical activity helped me the most. Even a 10-min walk can reset your mind."
          : "I've definitely been there with the stress, man. When I was going through a rough patch, physical activity helped me the most. Even just a 10-minute walk can help reset your mind. What kind of physical activities do you enjoy? We could think about how to fit those in more regularly.";
    }
  }

  if (
    lowerCaseMessage.includes("sad") ||
    lowerCaseMessage.includes("depress") ||
    lowerCaseMessage.includes("down")
  ) {
    switch (settings.tone) {
      case "friendly":
        return settings.manToManMode
          ? "Feeling down is tough. Name 3 small things that brought you any joy recently, no matter how small."
          : "I'm sorry to hear you're feeling down. Those emotions are valid, even though they're difficult to experience. Could you try to name three small things that brought you any amount of joy recently? They can be really small things - like the taste of your coffee or a moment of sunshine.";
      case "blunt":
        return settings.manToManMode
          ? "Depression hits hard. But sitting with it won't help. What's one tiny action you can take right now?"
          : "Depression hits hard, I know. But sitting with it without action won't help. What's one tiny action you can take right now? Not tomorrow, not when you 'feel better' - right now. Even just washing your face or stepping outside for 2 minutes counts.";
      case "supportive":
        return settings.manToManMode
          ? "I hear you, brother. Those dark days are brutal. You're not alone in this. What helped me was telling someone close to me."
          : "I hear you, brother. Those dark days are brutal, and they can make you feel totally isolated. But you're not alone in this - not by a long shot. When I was going through it, what helped most was telling someone close to me. Have you been able to open up to anyone about how you're feeling?";
    }
  }

  if (
    lowerCaseMessage.includes("angry") ||
    lowerCaseMessage.includes("pissed") ||
    lowerCaseMessage.includes("furious")
  ) {
    switch (settings.tone) {
      case "friendly":
        return settings.manToManMode
          ? "Anger is normal. Step away for 5 minutes if you can. Come back when your body feels calmer."
          : "It sounds like you're feeling pretty angry right now, and that's a completely normal emotion. If possible, can you step away from the situation for about 5 minutes? Sometimes giving yourself that brief space allows your body's stress response to calm down a bit, so you can think more clearly.";
      case "blunt":
        return settings.manToManMode
          ? "Anger feels justified in the moment. But acting on it rarely helps. Channel it into something physical instead."
          : "Anger always feels justified in the moment. But acting on it rarely makes things better. Channel it into something physical instead - pushups, a run, or even hitting a pillow. Your body needs to process that energy somehow. After that, you can think about what's really going on underneath the anger.";
      case "supportive":
        return settings.manToManMode
          ? "I get it, man. Sometimes life just pisses you off. Take a minute to breathe before you do anything else."
          : "I get it, man. Sometimes life just pisses you off and there's no way around that feeling. Been there plenty of times myself. First thing, take a minute to just breathe before you do or say anything. Then, when you're ready, let's figure out what's got you so fired up and what we can actually do about it.";
    }
  }

  // Generic responses for other types of messages
  switch (settings.tone) {
    case "friendly":
      return settings.manToManMode
        ? "I hear you. What else is on your mind?"
        : "I appreciate you sharing that with me. It helps me understand what you're going through better. Is there anything specific about this situation that's been particularly challenging for you?";
    case "blunt":
      return settings.manToManMode
        ? "Got it. What's the next step you're thinking about?"
        : "Alright, I understand the situation. Let's not overthink this - what's the next concrete step you're considering? Sometimes we need to break things down to move forward.";
    case "supportive":
      return settings.manToManMode
        ? "I'm with you on this one. What do you think is the best way forward?"
        : "I'm with you on this one, brother. We all face these kinds of challenges. Based on what you've shared, what do you think might be the best way forward? I'm here to talk through options if that helps.";
    default:
      return "I understand. Tell me more about what you're experiencing.";
  }
}
