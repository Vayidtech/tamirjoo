export type ServiceId =
  | "plumbing"
  | "electric"
  | "ac"
  | "appliance"
  | "carpentry"
  | "paint"
  | "locksmith"
  | "heating";

export type JobStatus =
  | "pending"
  | "countered"
  | "accepted"
  | "rejected"
  | "done";

export type TileId = "google" | "googleHybrid" | "esri";

export type Role = "customer" | "tech";

export interface Technician {
  id: string;
  name: string;
  initials: string;
  photo: string;
  hue: number;
  rating: number;
  reviews: number;
  services: ServiceId[];
  lat: number;
  lng: number;
  online: boolean;
  experienceYears: number;
  completed: number;
  visitFee: number;
  about: string;
}

export interface Job {
  id: string;
  techId: string;
  service: ServiceId;
  problem: string;
  address: string;
  when: string;
  estimatedPrice: number;
  offeredPrice: number | null;
  status: JobStatus;
  createdAt: number;
}
