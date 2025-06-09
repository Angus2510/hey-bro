import { Brain } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Brain className="size-4" />
            </div>
            HeyBro
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-4">Strength in Opening Up</h2>
          <p className="text-lg text-center max-w-md">
            A private space to check in with yourself, set goals, and get
            direct, no-BS support when you need it most.
          </p>
        </div>
      </div>
    </div>
  );
}
