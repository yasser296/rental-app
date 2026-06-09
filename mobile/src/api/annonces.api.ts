import { annoncesSeed, wait } from "@/api/mock";
import { Annonce, AnnonceStatus } from "@/types/models";

export async function listAnnonces(): Promise<Annonce[]> {
  return wait(annoncesSeed);
}

export async function moderateAnnonce(id: string, statut: AnnonceStatus): Promise<Annonce | undefined> {
  const annonce = annoncesSeed.find((item) => item.id === id);
  if (annonce) annonce.statut = statut;
  return wait(annonce);
}
