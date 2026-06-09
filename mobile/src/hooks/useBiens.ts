import { filterBiens, useBiensStore } from "@/stores/biens.store";

export function useBiens() {
  const { biens, filters, setFilters, addBien, updateBien } = useBiensStore();
  return {
    biens,
    filteredBiens: filterBiens(biens, filters),
    filters,
    setFilters,
    addBien,
    updateBien
  };
}
