"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  city: string | null; // Placeholder for reverse geocoding result
  country: string | null; // Placeholder for reverse geocoding result
  error: string | null;
  permissionStatus: "prompt" | "granted" | "denied" | "unavailable";
}

interface LocationContextType extends LocationData {
  isLoading: boolean;
  requestLocationPermission: () => void;
  fetchLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null); // Placeholder
  const [country, setCountry] = useState<string | null>(null); // Placeholder
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] =
    useState<LocationData["permissionStatus"]>("prompt");

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`
      );
      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.statusText}`);
      }
      const data = await response.json();
      if (data && data.address) {
        setCity(
          data.address.city || data.address.town || data.address.village || null
        );
        setCountry(data.address.country || null);
      } else {
        throw new Error("No address found for the coordinates.");
      }
    } catch (geoError) {
      console.error("Reverse geocoding error:", geoError);
      // Keep existing error or set a specific one for geocoding
      setError(
        (prevError) => prevError || "Failed to determine location details."
      );
    }
  };

  const handleGeoSuccess = async (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    setLatitude(lat);
    setLongitude(lon);
    setError(null);
    setPermissionStatus("granted");
    await reverseGeocode(lat, lon); // Call reverse geocoding
    setIsLoading(false);
  };

  const handleGeoError = (err: GeolocationPositionError) => {
    let errorMessage = "An unknown error occurred.";
    let status: LocationData["permissionStatus"] = "unavailable";
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = "Location permission denied.";
        status = "denied";
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case err.TIMEOUT:
        errorMessage = "The request to get user location timed out.";
        break;
    }
    setError(errorMessage);
    setPermissionStatus(status);
    setIsLoading(false);
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setPermissionStatus("unavailable");
      return;
    }
    if (permissionStatus === "granted") {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        handleGeoSuccess,
        handleGeoError,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  const requestLocationPermission = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setPermissionStatus("unavailable");
      return;
    }
    setIsLoading(true);
    // This will trigger the browser's permission prompt
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  };

  // Check initial permission status (if API available)
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((status) => {
        setPermissionStatus(status.state as LocationData["permissionStatus"]);
        if (status.state === "granted") {
          // fetchLocation(); // Optionally auto-fetch if already granted
        }
        status.onchange = () => {
          setPermissionStatus(status.state as LocationData["permissionStatus"]);
        };
      });
    } else if (navigator.geolocation) {
      // Fallback for browsers that don't support Permissions API well for 'geolocation'
      // The 'prompt' state will lead to requestLocationPermission being called by components
    } else {
      setPermissionStatus("unavailable");
      setError(
        "Geolocation is not supported or permission API is unavailable."
      );
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        latitude,
        longitude,
        city,
        country,
        error,
        isLoading,
        permissionStatus,
        requestLocationPermission,
        fetchLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
