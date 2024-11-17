export interface Location {
  state: string;
  district: string;
  mandal: string;
  village?: string;
  pincode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  // For hyperlocal targeting
  radius?: number; // in kilometers
  landmarks?: string[];
  constituency?: string;
  zone?: string;
}

export interface LocationPreference {
  userId: string;
  primaryLocation: Location;
  secondaryLocations: Location[];
  interests: string[];
  lastUpdated: string;
}