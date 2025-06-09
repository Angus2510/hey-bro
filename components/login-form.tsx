"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAnonymousSignIn = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setError(null);
    if (!nickname.trim()) {
      setError("Nickname is required.");
      return;
    }
    try {
      const result = await signIn("credentials", {
        name: nickname,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        console.error("Sign-in error:", result.error);
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleSocialSignIn = async (provider: "google" | "facebook") => {
    setError(null);
    try {
      const result = await signIn(provider, { redirect: false });
      if (result?.error) {
        setError(result.error);
        console.error("Social sign-in error:", result.error);
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Social sign-in failed:", err);
      setError(
        "An unexpected error occurred with social login. Please try again."
      );
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Join HeyBro</h1>
        <p className="text-muted-foreground text-sm text-balance">
          No pressure. Talk anonymously or create an account.
        </p>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="BroAnon123"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <Button
          type="button"
          className="w-full"
          onClick={handleAnonymousSignIn}
        >
          Continue Anonymously
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or sign in to save your progress
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("google")}
          type="button"
        >
          <FaGoogle className="mr-2" />
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialSignIn("facebook")}
          type="button"
        >
          <FaFacebook className="mr-2" />
          Continue with Facebook
        </Button>
      </div>
      <div className="text-center text-sm">
        By continuing, you agree to our{" "}
        <a href="#" className="underline underline-offset-4">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4">
          Terms of Service
        </a>
      </div>
    </form>
  );
}
