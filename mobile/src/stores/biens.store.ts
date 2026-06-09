import { create } from "zustand";
import { biensSeed } from "@/api/mock";
import { Bien, BienFilters } from "@/types/models";

type BiensState = {
  biens: Bien[];
  filters: BienFilters;
  setFilters: (filters: Partial<BienFilters>) => void;
  addBien: (bien: Omit<Bien, "id" | "note" | "photos">) => void;
  updateBien: (id: string, changes: Partial<Bien>) => void;
};

const defaultFilters: BienFilters = { query: "", categorie: "tous", localisation: "" };

export const useBiensStore = create<BiensState>((set) => ({
  biens: biensSeed,
  filters: defaultFilters,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  addBien: (bien) =>
    set((state) => ({
      biens: [
        {
          ...bien,
          id: `b-${Date.now()}`,
          photos: [bien.image],
          note: 4.4
        },
        ...state.biens
      ]
    })),
  updateBien: (id, changes) =>
    set((state) => ({
      biens: state.biens.map((bien) => (bien.id === id ? { ...bien, ...changes } : bien))
    }))
}));

export function filterBiens(biens: Bien[], filters: BienFilters) {
  const query = filters.query.toLowerCase().trim();
  const location = filters.localisation.toLowerCase().trim();

  return biens.filter((bien) => {
    const matchesQuery = !query || `${bien.titre} ${bien.description}`.toLowerCase().includes(query);
    const matchesCategory = filters.categorie === "tous" || bien.categorie === filters.categorie;
    const matchesLocation = !location || bien.localisation.toLowerCase().includes(location);
    return matchesQuery && matchesCategory && matchesLocation;
  });
}
