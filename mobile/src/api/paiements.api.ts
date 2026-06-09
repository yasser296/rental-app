import { wait } from "@/api/mock";
import { Paiement } from "@/types/models";

export async function payerReservation(
  reservationId: string,
  montant: number,
  modePaiement: Paiement["modePaiement"]
): Promise<Paiement> {
  return wait({
    id: `p-${Date.now()}`,
    reservationId,
    montant,
    datePaiement: new Date().toISOString(),
    modePaiement,
    statut: "valide"
  });
}
