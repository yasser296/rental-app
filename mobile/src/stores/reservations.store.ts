import { create } from "zustand";
import { reservationsSeed } from "@/api/mock";
import { Reservation, ReservationStatus } from "@/types/models";

type ReservationDraft = {
  clientId: string;
  bienId: string;
  dateDebut: string;
  dateFin: string;
  montantTotal: number;
};

type ReservationsState = {
  reservations: Reservation[];
  createReservation: (draft: ReservationDraft) => Reservation;
  updateStatus: (id: string, statut: ReservationStatus) => void;
};

export const useReservationsStore = create<ReservationsState>((set, get) => ({
  reservations: reservationsSeed,
  createReservation: (draft) => {
    const reservation: Reservation = {
      ...draft,
      id: `r-${Date.now()}`,
      statut: "en_attente"
    };
    set({ reservations: [reservation, ...get().reservations] });
    return reservation;
  },
  updateStatus: (id, statut) =>
    set((state) => ({
      reservations: state.reservations.map((reservation) =>
        reservation.id === id ? { ...reservation, statut } : reservation
      )
    }))
}));

export function calculateTotal(dateDebut: string, dateFin: string, prix: number) {
  const start = new Date(dateDebut).getTime();
  const end = new Date(dateFin).getTime();
  const days = Math.max(1, Math.ceil((end - start) / 86_400_000));
  return days * prix;
}
