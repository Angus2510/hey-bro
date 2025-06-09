"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useLocation } from "@/contexts/LocationContext"; // Import useLocation

interface CrisisSupportProps {
  isButtonOnly?: boolean;
  asNavLink?: boolean; // New prop
}

export function CrisisSupport({
  isButtonOnly = false,
  asNavLink = false,
}: CrisisSupportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    latitude,
    longitude,
    city,
    country,
    error: locationError,
    permissionStatus,
    requestLocationPermission,
    fetchLocation,
  } = useLocation();

  useEffect(() => {
    // Fetch location if permission is granted but we don't have coordinates yet.
    if (permissionStatus === "granted" && !latitude && !longitude) {
      fetchLocation();
    }
  }, [permissionStatus, latitude, longitude, fetchLocation]);

  // Example: Log location when available or show an alert.
  // In a real app, you would use this to fetch country-specific resources or filter by proximity.
  useEffect(() => {
    if (latitude && longitude) {
      console.log("User Location:", { latitude, longitude, city, country });
      // Potentially adapt the `resources` array here based on country or proximity
      // For example: fetchResourcesByLocation(latitude, longitude);
    }
  }, [latitude, longitude, city, country]);

  const resources = [
    {
      name: "National Suicide Prevention Lifeline",
      contact: "988",
      description: "24/7, free and confidential support for people in distress",
      icon: <Phone className="h-4 w-4" />,
      action: "Call",
      url: "tel:988",
    },
    {
      name: "Crisis Text Line",
      contact: "Text HOME to 741741",
      description: "Free 24/7 support with a trained crisis counselor",
      icon: <MessageSquare className="h-4 w-4" />,
      action: "Text",
      url: "sms:741741&body=HOME",
    },
    {
      name: "Veterans Crisis Line",
      contact: "Call 988, then press 1",
      description: "Support for veterans and their loved ones",
      icon: <Phone className="h-4 w-4" />,
      action: "Call",
      url: "tel:988",
    },
    {
      name: "Find Local Resources (Example - SAMHSA for US)", // Clarified example
      contact: "SAMHSA Treatment Locator",
      description:
        "Find treatment facilities and programs in the United States. Other countries will have different services.",
      icon: <ExternalLink className="h-4 w-4" />,
      action: "Visit",
      url: "https://findtreatment.samhsa.gov/",
      countryScope: ["US"], // Example: Resource specific to the US
    },
  ];

  // Filter resources based on country if available (simple example)
  const getFilteredResources = () => {
    if (country) {
      return resources.filter(
        (r) => !r.countryScope || r.countryScope.includes(country)
      );
    }
    return resources.filter((r) => !r.countryScope); // Show general resources if no country
  };

  const displayResources = getFilteredResources();

  // Handling UI based on location permission for the main card view (not button/navlink)
  if (
    !asNavLink &&
    !isButtonOnly &&
    permissionStatus !== "granted" &&
    permissionStatus !== "unavailable"
  ) {
    return (
      <Card className="p-4 border-border bg-card text-card-foreground">
        <div className="flex items-center mb-3">
          <AlertTriangle className="mr-2 h-6 w-6 text-destructive flex-shrink-0" />
          <h2 className="text-xl font-semibold">
            Location for Localized Support
          </h2>
        </div>
        <p className="text-muted-foreground mb-4 text-sm">
          To provide you with the most relevant crisis support information
          (e.g., local helplines), we can use your current location. Your
          location data is not stored by us and is only used during your
          session.
        </p>
        {permissionStatus === "prompt" && (
          <Button
            onClick={requestLocationPermission}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Allow Location Access
          </Button>
        )}
        {permissionStatus === "denied" && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            <p>
              Location permission was denied. We will show general support
              resources.
            </p>
            <p className="mt-1">
              You can enable location access in your browser settings if you
              change your mind.
            </p>
          </div>
        )}
        {locationError && (
          <p className="text-sm text-destructive mt-2">
            Error: {locationError}
          </p>
        )}
      </Card>
    );
  }

  if (asNavLink) {
    // New condition for rendering as a nav link button
    return (
      <Link href="/support" passHref>
        <Button
          variant="destructive"
          className="w-full text-base py-3 h-auto flex items-center justify-center" // Ensure it's a big red button
          size="lg" // Make button large
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          Get Urgent Support
        </Button>
      </Link>
    );
  }

  if (isButtonOnly) {
    return (
      <>
        <Button
          variant="destructive"
          size="lg"
          className="fixed bottom-4 right-4 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Dark Moments Support
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center text-destructive">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Crisis Support
              </DialogTitle>
            </DialogHeader>
            {/* Consider location permission for dialog content too if needed */}
            <CrisisResourceList resources={displayResources} />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Card className="p-4 border-destructive/20">
      <h2 className="text-xl font-bold mb-4 flex items-center text-destructive">
        <AlertTriangle className="mr-2 h-5 w-5" />
        Crisis Support
      </h2>
      <p className="text-muted-foreground mb-4">
        If you&apos;re experiencing a crisis or having thoughts of harming
        yourself, please reach out for immediate support:
      </p>
      <CrisisResourceList resources={displayResources} />
    </Card>
  );
}

interface CrisisResourceListProps {
  resources: Array<{
    name: string;
    contact: string;
    description: string;
    icon: React.ReactNode;
    action: string;
    url: string;
    countryScope?: string[]; // Added to allow country-specific resources
  }>;
}

function CrisisResourceList({ resources }: CrisisResourceListProps) {
  return (
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <div
          key={index}
          className="flex items-start gap-3 p-3 bg-muted rounded-lg"
        >
          <div className="bg-background rounded-full p-2 border">
            {resource.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{resource.name}</h3>
            <p className="text-sm mb-1">{resource.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{resource.contact}</span>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="default">
                  {resource.action}
                </Button>
              </a>
            </div>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground mt-4">
        If you&apos;re in immediate danger, please call your local emergency
        services (e.g., 911 in the US) or go to the nearest emergency room.
      </p>
    </div>
  );
}
