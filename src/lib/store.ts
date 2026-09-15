import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TECHNICIANS } from "./catalog";
import type { Job, Role, ServiceId, Technician, TileId } from "./types";

interface AppState {
  role: Role;
  demoTechId: string;
  tileId: TileId;
  serviceFilter: ServiceId | "all";
  selectedTechId: string | null;
  technicians: Technician[];
  jobs: Job[];
  setRole: (role: Role) => void;
  setTileId: (id: TileId) => void;
  setServiceFilter: (id: ServiceId | "all") => void;
  setSelectedTechId: (id: string | null) => void;
  toggleOnline: (id: string) => void;
  createJob: (input: {
    techId: string;
    service: ServiceId;
    problem: string;
    address: string;
    when: string;
    estimatedPrice: number;
  }) => void;
  counterJob: (jobId: string, price: number) => void;
  acceptJob: (jobId: string) => void;
  rejectJob: (jobId: string) => void;
  completeJob: (jobId: string) => void;
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      role: "customer",
      demoTechId: "t1",
      tileId: "google",
      serviceFilter: "all",
      selectedTechId: null,
      technicians: TECHNICIANS,
      jobs: [],
      setRole: (role) => set({ role }),
      setTileId: (tileId) => set({ tileId }),
      setServiceFilter: (serviceFilter) => set({ serviceFilter }),
      setSelectedTechId: (selectedTechId) => set({ selectedTechId }),
      toggleOnline: (id) =>
        set((s) => ({
          technicians: s.technicians.map((t) =>
            t.id === id ? { ...t, online: !t.online } : t,
          ),
        })),
      createJob: (input) =>
        set((s) => ({
          jobs: [
            {
              id: "j" + Date.now(),
              techId: input.techId,
              service: input.service,
              problem: input.problem,
              address: input.address,
              when: input.when,
              estimatedPrice: input.estimatedPrice,
              offeredPrice: null,
              status: "pending",
              createdAt: Date.now(),
            },
            ...s.jobs,
          ],
        })),
      counterJob: (jobId, price) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId
              ? { ...j, offeredPrice: price, status: "countered" }
              : j,
          ),
        })),
      acceptJob: (jobId) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId ? { ...j, status: "accepted" } : j,
          ),
        })),
      rejectJob: (jobId) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId ? { ...j, status: "rejected" } : j,
          ),
        })),
      completeJob: (jobId) =>
        set((s) => ({
          jobs: s.jobs.map((j) =>
            j.id === jobId ? { ...j, status: "done" } : j,
          ),
        })),
    }),
    {
      name: "tamirjoo-v2",
      partialize: (s) => ({
        role: s.role,
        tileId: s.tileId,
        jobs: s.jobs,
        technicians: s.technicians,
        demoTechId: s.demoTechId,
      }),
    },
  ),
);
