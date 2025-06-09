import { MentalReset } from "@/components/mental-reset";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export default function ResetPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Mental Reset</h1>
        <p className="text-muted-foreground">
          Take a few minutes to reset your mind and refocus.
        </p>
      </div>

      <div className="space-y-6">
        <MentalReset />

        <Card className="p-4">
          <h2 className="font-medium mb-3 flex items-center">
            <RefreshCw className="mr-2 h-4 w-4" />
            Why This Helps
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>Box Breathing</strong> - Used by Navy SEALs and first
              responders to stay calm under pressure. It activates your
              parasympathetic nervous system, reducing stress and improving
              focus.
            </p>
            <p>
              <strong>Grounding Exercise</strong> - Helps interrupt overwhelming
              thoughts by connecting you to your senses and the present moment.
            </p>
            <p>
              <strong>Journaling</strong> - Putting thoughts into words can
              reduce their emotional intensity and help you gain perspective on
              challenging situations.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
