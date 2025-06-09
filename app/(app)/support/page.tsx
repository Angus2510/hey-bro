import { CrisisSupport } from "@/components/crisis-support";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Brain, MessageCircle, RefreshCw, Sparkles } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Get Support</h1>
        <p className="text-muted-foreground">
          Everyone needs support sometimes. Here are some resources that might
          help.
        </p>
      </div>

      <div className="space-y-6">
        <CrisisSupport />

        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">HeyBro Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button className="h-auto py-3 justify-start" asChild>
              <Link href="/chat">
                <MessageCircle className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Talk with HeyBro</div>
                  <div className="text-xs font-normal">
                    Chat with our AI companion
                  </div>
                </div>
              </Link>
            </Button>

            <Button className="h-auto py-3 justify-start" asChild>
              <Link href="/reset">
                <RefreshCw className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Mental Reset</div>
                  <div className="text-xs font-normal">
                    Quick exercises to clear your mind
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              className="h-auto py-3 justify-start"
              variant="outline"
              asChild
            >
              <Link href="/check-in">
                <Brain className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Daily Check-in</div>
                  <div className="text-xs font-normal">
                    Track your mental well-being
                  </div>
                </div>
              </Link>
            </Button>

            <Button
              className="h-auto py-3 justify-start"
              variant="outline"
              asChild
            >
              <Link href="/pep-talk">
                <Sparkles className="mr-2 h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Pep Talk</div>
                  <div className="text-xs font-normal">
                    Motivational reminders when needed
                  </div>
                </div>
              </Link>
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Additional Resources</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Mental Health Apps</h3>
              <p className="text-sm text-muted-foreground mb-2">
                These apps can complement HeyBro with specialized features:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>Headspace - Guided meditation and mindfulness</li>
                <li>Calm - Sleep, meditation, and relaxation</li>
                <li>Woebot - CBT-based chatbot for anxiety and depression</li>
                <li>
                  What&#39;s Up - CBT and ACT methods for managing negative
                  patterns
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-1">Online Communities</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Connect with others who understand what you&#39;re going
                through:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5">
                <li>
                  r/MentalHealth - Reddit community for mental health support
                </li>
                <li>7 Cups - Free emotional support and counseling</li>
                <li>
                  Man Therapy - Resources specifically for men&#39;s mental
                  health
                </li>
                <li>
                  NAMI Connection - Support groups for those living with mental
                  health conditions
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
