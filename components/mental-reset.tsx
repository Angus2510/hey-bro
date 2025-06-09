"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CircleHelp,
  FileEdit,
  MoveHorizontal,
  RefreshCw,
  Wind,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ResetType = "breathwork" | "grounding" | "journal";

interface MentalResetProps {
  onComplete?: () => void;
}

export function MentalReset({ onComplete }: MentalResetProps) {
  const [selectedReset, setSelectedReset] = useState<ResetType | null>(null);
  const [breathStep, setBreathStep] = useState(0);
  const [groundingStep, setGroundingStep] = useState(0);

  const resetStates = () => {
    setSelectedReset(null);
    setBreathStep(0);
    setGroundingStep(0);
    if (onComplete) onComplete();
  };

  const breathworkSteps = [
    { instruction: "Breathe in slowly", duration: 4000 },
    { instruction: "Hold", duration: 4000 },
    { instruction: "Breathe out slowly", duration: 6000 },
    { instruction: "Pause", duration: 2000 },
  ];

  const groundingSteps = [
    "Name 5 things you can see around you",
    "Notice 4 things you can touch or feel",
    "Acknowledge 3 things you can hear",
    "Identify 2 things you can smell",
    "Recognize 1 thing you can taste",
  ];

  const journalPrompts = [
    "What's the main thing on your mind right now?",
    "What's one small win you've had today or this week?",
    "What's something that's been bothering you that you haven't told anyone?",
    "If you could talk to yourself from a year ago, what would you say?",
    "What's one thing you can do today to make tomorrow better?",
  ];

  // Get a random journal prompt
  const randomJournalPrompt =
    journalPrompts[Math.floor(Math.random() * journalPrompts.length)];

  // Handle breathwork progression
  const handleBreathworkStep = () => {
    if (breathStep < breathworkSteps.length - 1) {
      setBreathStep(breathStep + 1);
    } else {
      setBreathStep(0);
    }
  };

  return (
    <Card className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <RefreshCw className="mr-2 h-5 w-5" />
        Mental Reset
      </h2>

      <AnimatePresence mode="wait">
        {!selectedReset ? (
          <motion.div
            key="options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <p className="text-muted-foreground mb-4">
              Need a quick reset? Choose an option below:
            </p>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setSelectedReset("breathwork")}
            >
              <Wind className="mr-2 h-5 w-5" />
              Box Breathing (60 sec)
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setSelectedReset("grounding")}
            >
              <MoveHorizontal className="mr-2 h-5 w-5" />
              5-4-3-2-1 Grounding Exercise
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setSelectedReset("journal")}
            >
              <FileEdit className="mr-2 h-5 w-5" />
              Quick Journaling Prompt
            </Button>
          </motion.div>
        ) : selectedReset === "breathwork" ? (
          <motion.div
            key="breathwork"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center space-y-6"
          >
            <div className="py-8">
              <motion.div
                key={breathStep}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-medium"
              >
                {breathworkSteps[breathStep].instruction}
              </motion.div>

              <motion.div
                className="w-20 h-20 bg-primary/20 rounded-full mx-auto mt-4 flex items-center justify-center"
                animate={{
                  scale:
                    breathStep === 0
                      ? [1, 1.3, 1.3]
                      : breathStep === 1
                      ? [1.3, 1.3]
                      : breathStep === 2
                      ? [1.3, 1, 1]
                      : [1, 1],
                }}
                transition={{
                  duration: breathworkSteps[breathStep].duration / 1000,
                  ease: "easeInOut",
                }}
                onAnimationComplete={handleBreathworkStep}
              >
                <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/40 rounded-full" />
                </div>
              </motion.div>
            </div>

            <Button variant="outline" onClick={resetStates}>
              I&apos;m Done
            </Button>
          </motion.div>
        ) : selectedReset === "grounding" ? (
          <motion.div
            key="grounding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-muted p-4 rounded-lg">
              <motion.div
                key={groundingStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-lg"
              >
                {groundingSteps[groundingStep]}
              </motion.div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={resetStates}>
                Exit
              </Button>

              {groundingStep < groundingSteps.length - 1 ? (
                <Button onClick={() => setGroundingStep(groundingStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={resetStates}>Complete</Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="journal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <CircleHelp className="mr-2 h-4 w-4" />
                Reflection Prompt
              </h3>
              <p className="text-lg">{randomJournalPrompt}</p>
            </div>

            <p className="text-sm text-muted-foreground">
              Take a moment to reflect on this question. You can write your
              thoughts in a private journal, or just think about it.
            </p>

            <Button onClick={resetStates}>Done</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
