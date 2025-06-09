"use client";

import { useState } from "react";
import { PepTalk } from "@/components/pep-talk";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HomeIcon } from "lucide-react";

export default function PepTalkPage() {
  const [completed, setCompleted] = useState(false);

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Need a Pep Talk?</h1>
        <p className="text-muted-foreground">
          Sometimes we all need a reminder of our strength and resilience.
        </p>
      </div>

      {!completed ? (
        <PepTalk onClose={() => setCompleted(true)} />
      ) : (
        <div className="text-center py-8">
          <h2 className="text-xl font-medium mb-3">Feeling Better?</h2>
          <p className="text-muted-foreground mb-6">
            Remember, you can come back for a pep talk anytime you need one.
          </p>
          <Button asChild>
            <Link href="/dashboard">
              <HomeIcon className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
