"use client";

import { useState } from "react";
import { MoodType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FaSmile,
  FaSadTear,
  FaAngry,
  FaHeadSideCough,
  FaMeh,
} from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";

interface MoodSelectorProps {
  onSubmit: (mood: MoodType, note?: string) => void;
  defaultMood?: MoodType;
}

const moodIcons = {
  happy: FaSmile,
  sad: FaSadTear,
  angry: FaAngry,
  stressed: FaHeadSideCough,
  numb: FaMeh,
  other: IoMdHelp,
};

const moodLabels = {
  happy: "Happy",
  sad: "Sad",
  angry: "Angry",
  stressed: "Stressed",
  numb: "Numb",
  other: "Other",
};

const moodColors = {
  happy: "bg-green-600 hover:bg-green-700",
  sad: "bg-blue-600 hover:bg-blue-700",
  angry: "bg-red-600 hover:bg-red-700",
  stressed: "bg-amber-600 hover:bg-amber-700",
  numb: "bg-gray-600 hover:bg-gray-700",
  other: "bg-purple-600 hover:bg-purple-700",
};

export function MoodSelector({ onSubmit, defaultMood }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(
    defaultMood || null
  );
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (selectedMood) {
      onSubmit(selectedMood, note.trim() || undefined);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-card rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        How are you feeling today?
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {(Object.keys(moodIcons) as MoodType[]).map((mood) => {
          const Icon = moodIcons[mood];
          return (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${
                selectedMood === mood
                  ? `ring-2 ring-primary ${moodColors[mood]}`
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Icon className="text-2xl mb-1" />
              <span className="text-sm">{moodLabels[mood]}</span>
            </button>
          );
        })}
      </div>

      {selectedMood && (
        <>
          <Textarea
            placeholder="Want to add a note? (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full mb-4"
            rows={3}
          />
          <Button onClick={handleSubmit} className="w-full">
            Continue
          </Button>
        </>
      )}
    </div>
  );
}
