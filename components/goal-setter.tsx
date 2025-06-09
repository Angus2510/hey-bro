"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GoalSetterProps {
  existingGoals?: string[];
  onUpdateGoals: (goals: string[]) => void;
  maxGoals?: number;
}

const SUGGESTED_GOALS = [
  "Get through breakup",
  "Feel more confident",
  "Manage stress better",
  "Improve sleep",
  "Reduce anxiety",
  "Develop healthier habits",
  "Find work-life balance",
  "Build better relationships",
];

export function GoalSetter({
  existingGoals = [],
  onUpdateGoals,
  maxGoals = 3,
}: GoalSetterProps) {
  const [goals, setGoals] = useState<string[]>(existingGoals);
  const [newGoal, setNewGoal] = useState("");

  const handleAddGoal = (goal: string) => {
    if (goals.length >= maxGoals) return;

    const trimmedGoal = goal.trim();
    if (trimmedGoal && !goals.includes(trimmedGoal)) {
      const updatedGoals = [...goals, trimmedGoal];
      setGoals(updatedGoals);
      onUpdateGoals(updatedGoals);
      setNewGoal("");
    }
  };

  const handleRemoveGoal = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    onUpdateGoals(updatedGoals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddGoal(newGoal);
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">What are you working on?</h2>
      <p className="text-muted-foreground mb-4">
        Setting goals helps us give you more personalized support. These are
        optional and can be changed anytime.
      </p>

      <AnimatePresence>
        {goals.length > 0 && (
          <div className="mb-4 space-y-2">
            <h3 className="text-sm font-medium">Your goals:</h3>
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between bg-muted p-2 rounded"
              >
                <span>{goal}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveGoal(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {goals.length < maxGoals && (
        <>
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add a personal goal..."
              className="flex-1"
            />
            <Button type="submit" disabled={!newGoal.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </form>

          {goals.length === 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Suggested goals:</h3>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_GOALS.map((goal) => (
                  <Button
                    key={goal}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}
