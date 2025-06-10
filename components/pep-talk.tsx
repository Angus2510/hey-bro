import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface PepTalkProps {
  onClose?: () => void;
}

// Curated list of motivational messages specifically for men
const PEP_TALKS = [
  "You're doing better than you think. Keep pushing forward.",
  "Strength isn't about never falling; it's about getting back up every time you do.",
  "The work you're putting in now is building the foundation for your future self.",
  "It's okay to not have all the answers. What matters is that you're asking the questions.",
  "Progress isn't always visible day to day, but looking back, you'll see how far you've come.",
  "Your struggles don't define you, but how you respond to them does.",
  "Sometimes the bravest thing you can do is admit when you're not okay.",
  "Your worth isn't measured by your productivity or success.",
  "The strongest men know when to ask for help.",
  "You don't need to carry the weight of the world alone.",
  "One day at a time. Sometimes one hour at a time. You've got this.",
  "The path forward isn't always clear, but taking one step is better than standing still.",
  "Your presence matters. The people in your life value you more than you know.",
  "Feeling lost is part of the journey, not a sign you've failed.",
  "The strongest decision you can make is to prioritize your mental health.",
  "Real strength comes from vulnerability, not from hiding your struggles.",
  "You've overcome tough times before, and you'll overcome this too.",
  "It takes courage to face your fears. You're braver than you realize.",
  "Don't compare your behind-the-scenes to everyone else's highlight reel.",
  "You're not meant to have it all figured out. Nobody does.",
];

export function PepTalk({ onClose }: PepTalkProps) {
  const [currentPepTalk, setCurrentPepTalk] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getRandomPepTalk = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PEP_TALKS.length);
      setCurrentPepTalk(PEP_TALKS[randomIndex]);
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    getRandomPepTalk();
  }, []);

  return (
    <Card className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-center">Need a Pep Talk?</h2>

      <div className="min-h-[120px] flex items-center justify-center">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <RefreshCw className="h-8 w-8 text-muted-foreground" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-lg font-medium"
          >
            {currentPepTalk}
          </motion.div>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <Button
          variant="outline"
          onClick={getRandomPepTalk}
          disabled={isLoading}
        >
          Another One
        </Button>

        <Button onClick={onClose} disabled={isLoading}>
          Thanks <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
