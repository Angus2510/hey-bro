// Types for the chatbot
export type MoodType =
  | "happy"
  | "sad"
  | "angry"
  | "stressed"
  | "numb"
  | "other";
export type ChatTone = "friendly" | "blunt" | "supportive";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  isAnonymous?: boolean;
  goals?: string[];
  moodHistory?: {
    date: Date;
    mood: MoodType;
    note?: string;
  }[];
  preferences?: {
    chatTone: ChatTone;
  };
}

export interface ChatSettings {
  tone: ChatTone;
  manToManMode: boolean;
}

// Default settings
export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  tone: "friendly",
  manToManMode: false,
};

// Types for Men's Circles
export interface MensCircle {
  id: string;
  name: string;
  description: string;
  organizer: string; // Could be UserProfile or just a name
  location: {
    // Simple for now, can be expanded
    city: string;
    state?: string;
    country: string;
    online?: boolean; // If it's an online circle
    platform?: string; // e.g., Zoom, Discord if online
    address?: string; // For in-person
  };
  meetingTime?: string; // e.g., "Tuesdays at 7 PM", or a more structured date/time
  topics?: string[];
  contactEmail?: string;
  website?: string;
  imageUrl?: string; // Optional image for the circle
}
