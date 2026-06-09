import { reservationsSeed, wait } from "@/api/mock";
import { Reservation } from "@/types/models";

export async function listReservations(): Promise<Reservation[]> {
  return wait(reservationsSeed);
}

export async function createReservation(payload: Omit<Reservation, "id" | "statut">): Promise<Reservation> {
  const reservation: Reservation = {
    ...payload,
    id: `r-${Date.now()}`,
    statut: "en_attente"
  };
  reservationsSeed.unshift(reservation);
  return wait(reservation);
}
