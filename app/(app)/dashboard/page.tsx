"use client";
import { MoodSelector } from "@/components/mood-selector";
import { GoalSetter } from "@/components/goal-setter";
import { MoodTracker } from "@/components/mood-tracker";
import { PepTalk } from "@/components/pep-talk";
import { MentalReset } from "@/components/mental-reset";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  // Mock data for demonstration
  const mockMoodHistory = [
    {
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      mood: "happy" as const,
    },
    {
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      mood: "stressed" as const,
    },
    {
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      mood: "angry" as const,
    },
    {
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      mood: "sad" as const,
    },
    {
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      mood: "numb" as const,
    },
    {
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      mood: "happy" as const,
    },
  ];

  const mockGoals = ["Get through breakup", "Improve sleep quality"];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Welcome, Bro</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="p-4 bg-primary/10 border-primary/20">
              <h2 className="font-medium mb-2">Daily Check-in</h2>
              <p className="text-sm text-muted-foreground mb-3">
                How are you feeling today?
              </p>
              <Button asChild>
                <Link href="/check-in">Check In Now</Link>
              </Button>
            </Card>

            <Card className="p-4 bg-muted/50">
              <h2 className="font-medium mb-2">Need to Talk?</h2>
              <p className="text-sm text-muted-foreground mb-3">
                The HeyBro AI chatbot is here for you 24/7.
              </p>
              <Button variant="outline" asChild>
                <Link href="/chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Chatting
                </Link>
              </Button>
            </Card>
          </div>

          {/* Mood Tracker */}
          <MoodTracker moodHistory={mockMoodHistory} />

          {/* Premium Teaser */}
          <Card className="p-4 mt-6 bg-card/50 border-dashed">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 rounded-full p-2">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Unlock Premium Features</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Get advanced journaling tools, deeper AI reflections,
                  exclusive pep talk packs, and more.
                </p>
                <Button variant="outline" size="sm">
                  Coming Soon
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Goals Section */}
          <GoalSetter
            existingGoals={mockGoals}
            onUpdateGoals={(goals) => console.log("Updated goals:", goals)}
          />

          {/* Quick Support Tools */}
          <Card className="p-4">
            <h2 className="font-medium mb-3">Quick Support</h2>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/reset">Mental Reset (2 min)</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/pep-talk">Need a Pep Talk?</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link href="/vent">Private Venting Zone</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
