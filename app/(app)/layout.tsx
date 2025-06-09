"use client";

import { useState } from "react";
import {
  Brain,
  LifeBuoy,
  Menu,
  MessageCircle,
  RefreshCw,
  UserRound,
  Users, // Added for Men's Circles
  X,
  AlertTriangle, // Added for mobile crisis button
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CrisisSupport } from "@/components/crisis-support";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

interface AppLayoutProps {
  children: React.ReactNode;
}

const commonNavLinks = [
  { href: "/dashboard", icon: UserRound, label: "Dashboard" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/check-in", icon: Brain, label: "Check-in" },
  { href: "/circles", icon: Users, label: "Men's Circles" }, // Added Men's Circles link
  { href: "/reset", icon: RefreshCw, label: "Mental Reset" },
  { href: "/pep-talk", icon: UserRound, label: "Pep Talk" },
  { href: "/vent", icon: MessageCircle, label: "Vent Zone" },
  { href: "/support", icon: LifeBuoy, label: "Get Support" },
];

const NavLinkItem = ({
  href,
  icon: Icon,
  label,
  onClick,
  isActive,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <Link href={href} onClick={onClick} passHref>
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start text-base px-3 py-2.5 h-auto" // Ensure button height is auto
    >
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
      <span className="truncate">{label}</span>
    </Button>
  </Link>
);

export default function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const pathname = usePathname(); // To determine active link, if needed

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* --- Desktop Sidebar (Fixed) --- */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-64 xl:w-72 lg:flex-col lg:border-r lg:bg-card">
        <div className="flex flex-col flex-1 p-3 overflow-hidden">
          {" "}
          {/* Added overflow-hidden */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 font-semibold text-lg mb-6 p-2 hover:bg-muted rounded-md flex-shrink-0" // Added flex-shrink-0
          >
            <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
              <Brain className="size-4" />
            </div>
            HeyBro
          </Link>
          <ScrollArea className="flex-1">
            {" "}
            {/* Wrap nav with ScrollArea */}
            <nav className="space-y-1 pr-2">
              {" "}
              {/* Added pr-2 for scrollbar spacing */}
              {commonNavLinks.map((link) => (
                <NavLinkItem
                  key={link.href}
                  {...link}
                  // isActive={pathname === link.href}
                />
              ))}
            </nav>
          </ScrollArea>
          <div className="mt-auto pt-3 border-t flex-shrink-0 px-2 pb-2">
            {" "}
            {/* Added px-2 pb-2 for padding */}
            <CrisisSupport asNavLink={true} /> {/* Use the new prop here */}
          </div>
        </div>
      </aside>

      {/* --- Mobile Header (Fixed) --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 border-b bg-card z-30 flex items-center justify-between px-2 sm:px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-medium">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md">
            <Brain className="size-4" />
          </div>
          <span className="hidden sm:inline">HeyBro</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <CrisisSupport isButtonOnly={true} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* --- Mobile Menu (Overlay) --- */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 flex"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-3/4 max-w-xs flex-col border-r bg-card p-3">
            <div className="flex items-center justify-between mb-5 p-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 font-semibold text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
                  <Brain className="size-4" />
                </div>
                HeyBro
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="space-y-1 flex-1 overflow-y-auto">
              {commonNavLinks.map((link) => (
                <NavLinkItem
                  key={link.href}
                  {...link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  // isActive={pathname === link.href}
                />
              ))}
            </nav>
            <div className="mt-auto pt-3 border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-sm"
                asChild
              >
                <Link
                  href="https://github.com/username/projectname" // Replace with actual link
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="opacity-70">v0.1.0</span>
                  <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">
                    Beta
                  </span>
                </Link>
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* --- Mobile Bottom Navigation (Fixed) --- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-14 border-t bg-card z-30 grid grid-cols-4">
        {commonNavLinks.slice(0, 3).map(
          (
            link // Display first 3 links
          ) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center pt-2 pb-1 text-xs text-muted-foreground hover:text-primary"
                // pathname === link.href && "text-primary bg-muted/50"
              )}
            >
              <link.icon className="h-5 w-5 mb-0.5" />
              <span className="truncate text-[10px] sm:text-xs">
                {link.label}
              </span>
            </Link>
          )
        )}
        {/* Crisis Support Button as the 4th item */}
        <Link
          href="/support"
          className={cn(
            "flex flex-col items-center justify-center pt-2 pb-1 text-xs text-destructive hover:bg-destructive/10"
            // pathname === "/support" && "bg-destructive/20 text-destructive-foreground"
          )}
        >
          <AlertTriangle className="h-5 w-5 mb-0.5" />
          <span className="truncate text-[10px] sm:text-xs">Support</span>
        </Link>
      </nav>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col lg:pl-64 xl:pl-72">
        <div className="flex-1 overflow-y-auto bg-background p-4 pt-[calc(3.5rem+1rem)] pb-[calc(3.5rem+1rem)] sm:p-6 sm:pt-[calc(3.5rem+1.5rem)] sm:pb-[calc(3.5rem+1.5rem)] lg:pt-6 lg:pb-6 lg:px-6 xl:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
