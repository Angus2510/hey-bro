"use client";

import { MensCircleCard } from "@/components/mens-circle-card";
import { MensCircle } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, MapPin, LocateFixed, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "@/contexts/LocationContext";

// Mock Data - Replace with API call later
const mockCirclesData: MensCircle[] = [
  {
    id: "1",
    name: "Austin Men's Development Network",
    description:
      "A supportive group for men in Austin focusing on personal growth, emotional intelligence, and building strong community bonds. We meet weekly.",
    organizer: "John Doe",
    location: {
      city: "Austin",
      state: "TX",
      country: "USA",
      online: false,
      address: "123 Main St, Austin, TX",
    },
    meetingTime: "Wednesdays at 7:00 PM CST",
    topics: ["Personal Growth", "Emotional Intelligence", "Community"],
    contactEmail: "john.doe@example.com",
    website: "https://example.com/austinmenscircle",
    imageUrl: "/images/mens-circle-1.jpg", // Placeholder - ensure you have images in /public/images
  },
  {
    id: "2",
    name: "The Digital Brotherhood - Online Circle",
    description:
      "An online men's circle for those who prefer to connect digitally. We discuss topics ranging from mental health to career development.",
    organizer: "Mike Smith",
    location: {
      city: "Online",
      country: "Global",
      online: true,
      platform: "Zoom & Discord",
    },
    meetingTime: "First Monday of each month, 8:00 PM GMT",
    topics: ["Mental Health", "Career", "Digital Connection"],
    contactEmail: "mike.smith@example.com",
    imageUrl: "/images/mens-circle-online.jpg",
  },
  {
    id: "3",
    name: "Vancouver Men's Sharing Circle",
    description:
      "A safe space for men in Vancouver, BC, to share experiences, offer support, and foster genuine connections. All are welcome.",
    organizer: "David Lee",
    location: {
      city: "Vancouver",
      state: "BC",
      country: "Canada",
    },
    meetingTime: "Bi-weekly on Saturdays, 2:00 PM PST",
    topics: ["Vulnerability", "Storytelling", "Support"],
    website: "https://example.com/vancouvercircle",
    imageUrl: "/images/mens-circle-2.jpg",
  },
  // Add more mock circles as needed
];

export default function MensCirclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState(""); // This might be used for manual location input
  const [showOnlyLocal, setShowOnlyLocal] = useState(false); // New state for local filter

  const {
    city: userCity,
    country: userCountry,
    permissionStatus,
    requestLocationPermission,
    fetchLocation,
    isLoading: isLocationLoading,
    error: locationError,
    latitude,
    longitude,
  } = useLocation();

  useEffect(() => {
    // Fetch location if permission is granted but we don't have coordinates yet.
    if (permissionStatus === "granted" && !latitude && !longitude) {
      fetchLocation();
    }
  }, [permissionStatus, latitude, longitude, fetchLocation]);

  // Effect to update locationFilter input if userCity becomes available and local search is active
  useEffect(() => {
    if (showOnlyLocal && userCity && permissionStatus === "granted") {
      setLocationFilter(userCity);
    } else if (!showOnlyLocal) {
      // Optionally clear location filter if not showing local, or handle differently
      // setLocationFilter("");
    }
  }, [showOnlyLocal, userCity, permissionStatus]);

  const filteredCircles = mockCirclesData.filter((circle) => {
    const nameMatch = circle.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = circle.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let locationSearchMatch = true;
    if (locationFilter) {
      // Manual text input for location
      const cityMatch = circle.location.city
        .toLowerCase()
        .includes(locationFilter.toLowerCase());
      const platformMatch = circle.location.platform
        ?.toLowerCase()
        .includes(locationFilter.toLowerCase());
      locationSearchMatch = circle.location.online
        ? !!platformMatch
        : cityMatch;
    }

    let localCityMatch = true;
    if (showOnlyLocal && userCity && permissionStatus === "granted") {
      if (circle.location.online) {
        // For online circles, local filter might not apply or apply differently
        localCityMatch = true; // Or some other logic, e.g. check if organizer is from user's city/country
      } else {
        localCityMatch =
          circle.location.city.toLowerCase() === userCity.toLowerCase();
        if (userCountry && circle.location.country) {
          // Optionally refine with country
          localCityMatch =
            localCityMatch &&
            circle.location.country.toLowerCase() === userCountry.toLowerCase();
        }
      }
    } else if (showOnlyLocal && permissionStatus !== "granted") {
      // If user wants local but permission not granted, effectively show no local results
      // Or prompt them again (handled by UI below)
      localCityMatch = false;
    }

    return (
      (nameMatch || descriptionMatch) && locationSearchMatch && localCityMatch
    );
  });

  const handleToggleLocalSearch = () => {
    if (permissionStatus === "prompt") {
      requestLocationPermission();
      // setShowOnlyLocal(true) will be handled by useEffect or user can click again
    } else if (permissionStatus === "granted") {
      setShowOnlyLocal(!showOnlyLocal);
      if (!showOnlyLocal && userCity) {
        // If turning on local search and city is known
        setLocationFilter(userCity); // Pre-fill location input
      } else if (showOnlyLocal) {
        // If turning off local search
        setLocationFilter(""); // Clear location input
      }
    } else {
      // Permission denied or unavailable, button might be disabled or show a message
      setShowOnlyLocal(false); // Ensure it's off
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Men&apos;s Circles
          </h1>
          <p className="text-muted-foreground">
            Find or create supportive communities for growth and connection.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Circle
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search circles by name, topic..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative md:col-span-1">
          {" "}
          {/* Adjusted grid span */}
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={
              showOnlyLocal && userCity
                ? `Showing: ${userCity}`
                : "Filter by city or online platform..."
            }
            className="pl-10"
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              if (showOnlyLocal) setShowOnlyLocal(false); // If user types, disable auto local filter
            }}
            disabled={showOnlyLocal && permissionStatus === "granted"} // Disable if showing local based on GPS
          />
        </div>
        <Button
          variant={showOnlyLocal ? "secondary" : "outline"}
          className="w-full sm:w-auto"
          onClick={handleToggleLocalSearch}
          disabled={
            isLocationLoading ||
            (permissionStatus === "denied" && !showOnlyLocal) ||
            permissionStatus === "unavailable"
          }
        >
          <LocateFixed className="mr-2 h-4 w-4" />
          {isLocationLoading
            ? "Locating..."
            : showOnlyLocal
            ? "Show All Circles"
            : "Find Near Me"}
        </Button>
        {/* <Button variant="outline" className="w-full sm:w-auto md:col-start-3">
          <ListFilter className="mr-2 h-4 w-4" /> More Filters
        </Button> */}
      </div>

      {/* Location Permission/Error Messages */}
      {showOnlyLocal && permissionStatus === "prompt" && (
        <div className="p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-lg text-center">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Click &quot;Find Near Me&quot; again to allow location access for
            local results.
          </p>
        </div>
      )}
      {showOnlyLocal && permissionStatus === "denied" && (
        <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-lg text-center">
          <p className="text-sm text-red-700 dark:text-red-300">
            Location permission denied. Please enable it in your browser
            settings to find circles near you.
          </p>
        </div>
      )}
      {locationError && (
        <div className="p-4 border border-red-500/50 bg-red-500/10 rounded-lg text-center">
          <p className="text-sm text-red-700 dark:text-red-300">
            Location Error: {locationError}
          </p>
        </div>
      )}

      {/* Circles Grid */}
      {filteredCircles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCircles.map((circle) => (
            <MensCircleCard key={circle.id} circle={circle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No Circles Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters. Or, be the first to create
            one!
          </p>
        </div>
      )}
    </div>
  );
}
