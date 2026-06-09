import { payerReservation } from "@/api/paiements.api";
import { Paiement } from "@/types/models";

export async function initierPaiement(
  reservationId: string,
  montant: number,
  modePaiement: Paiement["modePaiement"]
) {
  return payerReservation(reservationId, montant, modePaiement);
}
