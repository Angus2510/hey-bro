"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Lock, Trash2 } from "lucide-react";

export default function VentPage() {
  const [ventText, setVentText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pastVents, setPastVents] = useState<
    { id: string; date: Date; preview: string }[]
  >([
    {
      id: "1",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      preview: "I'm so frustrated with my job right now...",
    },
    {
      id: "2",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      preview: "The breakup is still affecting me...",
    },
  ]);

  const handleSubmit = () => {
    if (ventText.trim()) {
      // In a real app, this would save the vent to the user's profile
      const newVent = {
        id: Date.now().toString(),
        date: new Date(),
        preview: ventText.substring(0, 40) + "...",
      };

      setPastVents([newVent, ...pastVents]);
      setVentText("");
      setIsSubmitted(true);

      // Reset the submission status after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const handleDelete = (id: string) => {
    setPastVents(pastVents.filter((vent) => vent.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Private Venting Zone</h1>
        <p className="text-muted-foreground">
          Get it all out. No judgment, no advice, no responses. Just a space to
          express yourself.
        </p>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Say What&#39;s On Your Mind</h2>
          <div className="flex items-center text-xs text-muted-foreground">
            <Lock className="h-3 w-3 mr-1" />
            Private
          </div>
        </div>

        <Textarea
          value={ventText}
          onChange={(e) => setVentText(e.target.value)}
          placeholder="Type anything you need to get off your chest..."
          className="min-h-[150px] mb-3"
        />

        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            No one will see this but you.
          </p>
          <div className="flex items-center gap-2">
            {isSubmitted && (
              <span className="text-green-500 flex items-center text-sm">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Saved
              </span>
            )}
            <Button onClick={handleSubmit} disabled={!ventText.trim()}>
              Save
            </Button>
          </div>
        </div>
      </Card>

      {pastVents.length > 0 && (
        <div>
          <h2 className="font-medium mb-3">Past Vents</h2>
          <div className="space-y-2">
            {pastVents.map((vent) => (
              <Card key={vent.id} className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm">{vent.preview}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {vent.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(vent.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
