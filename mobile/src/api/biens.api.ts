import { biensSeed, wait } from "@/api/mock";
import { Bien, BienFilters } from "@/types/models";

export async function searchBiens(filters: BienFilters): Promise<Bien[]> {
  const query = filters.query.trim().toLowerCase();
  const location = filters.localisation.trim().toLowerCase();

  return wait(
    biensSeed.filter((bien) => {
      const byQuery = !query || `${bien.titre} ${bien.description}`.toLowerCase().includes(query);
      const byCategory = filters.categorie === "tous" || bien.categorie === filters.categorie;
      const byLocation = !location || bien.localisation.toLowerCase().includes(location);
      return byQuery && byCategory && byLocation;
    })
  );
}

export async function getBienById(id: string): Promise<Bien | undefined> {
  return wait(biensSeed.find((bien) => bien.id === id));
}
