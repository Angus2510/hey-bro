import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6">
      <main className="text-center">
        <div className="mb-8">
          <Brain className="h-24 w-24 mx-auto text-primary" />
        </div>
        <h1 className="text-5xl font-bold mb-6">Welcome to HeyBro</h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
          A stigma-free space for men to check in with their mental health, set
          goals, and get support.
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard">Get Started</Link>
        </Button>
        <p className="text-sm text-muted-foreground mt-12">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Sign In
          </Link>
        </p>
      </main>

      <footer className="absolute bottom-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} HeyBro. All rights reserved.</p>
        <p className="mt-1">
          Remember, you&apos;re not alone. If you&apos;re in crisis, please seek
          immediate help.
        </p>
      </footer>
    </div>
  );
}
