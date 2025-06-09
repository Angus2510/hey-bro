"use client";

import { useState } from "react";
import { MoodSelector } from "@/components/mood-selector";
import { MoodType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function CheckInPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);

  const handleMoodSubmit = (mood: MoodType, note?: string) => {
    // In a real app, this would save the mood data to the user's profile
    console.log("Mood submitted:", mood, note);
    setSelectedMood(mood);
    setIsCompleted(true);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Daily Check-in</h1>
        <p className="text-muted-foreground">
          Take a moment to check in with yourself. This only takes a few
          seconds.
        </p>
      </div>

      {!isCompleted ? (
        <MoodSelector onSubmit={handleMoodSubmit} />
      ) : (
        <div className="space-y-4">
          <Card className="p-4 bg-primary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 rounded-full p-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-medium">Check-in Complete</h2>
                <p className="text-sm text-muted-foreground">
                  Thanks for checking in today!
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="font-medium mb-4">
              What would you like to do next?
            </h2>
            <div className="space-y-3">
              <Button className="w-full justify-between" asChild>
                <Link href="/chat">
                  <div className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Talk about how you&#39;re feeling
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full justify-between"
                asChild
              >
                <Link href="/dashboard">
                  <div className="flex items-center">
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Return to dashboard
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Conditional follow-up based on mood */}
          {selectedMood === "sad" ||
          selectedMood === "angry" ||
          selectedMood === "stressed" ? (
            <Card className="p-4 mt-4 border-primary/20">
              <h2 className="font-medium mb-3">
                {selectedMood === "sad"
                  ? "Feeling down today?"
                  : selectedMood === "angry"
                  ? "Dealing with frustration?"
                  : "Managing stress?"}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedMood === "sad"
                  ? "It's okay to not feel okay. Taking small steps can help."
                  : selectedMood === "angry"
                  ? "Anger is normal. Finding healthy outlets makes a difference."
                  : "Stress affects us all. Simple techniques can help you regain control."}
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/reset">Try a Quick Mental Reset</Link>
              </Button>
            </Card>
          ) : null}
        </div>
      )}
    </div>
  );
}
