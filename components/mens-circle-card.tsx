"use client";

import { MensCircle } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Mail, MapPin, Users } from "lucide-react";
import Image from "next/image";

interface MensCircleCardProps {
  circle: MensCircle;
}

export function MensCircleCard({ circle }: MensCircleCardProps) {
  return (
    <Card className="flex flex-col h-full">
      {circle.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={circle.imageUrl}
            alt={`${circle.name} image`}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{circle.name}</CardTitle>
        <CardDescription>Organized by: {circle.organizer}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {circle.description}
        </p>
        <div className="space-y-1 text-sm">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
            <span>
              {circle.location.online
                ? `Online via ${circle.location.platform || "Unknown Platform"}`
                : `${circle.location.city}, ${
                    circle.location.state ? `${circle.location.state}, ` : ""
                  }${circle.location.country}`}
            </span>
          </div>
          {circle.meetingTime && (
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <span>{circle.meetingTime}</span>
            </div>
          )}
        </div>
        {circle.topics && circle.topics.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">
              Focus Topics:
            </h4>
            <div className="flex flex-wrap gap-1">
              {circle.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        {circle.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={circle.website} target="_blank" rel="noopener noreferrer">
              <Globe className="mr-1.5 h-4 w-4" />
              Website
            </a>
          </Button>
        )}
        {circle.contactEmail && (
          <Button variant="outline" size="sm" asChild>
            <a href={`mailto:${circle.contactEmail}`}>
              <Mail className="mr-1.5 h-4 w-4" />
              Contact
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
