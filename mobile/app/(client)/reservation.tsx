import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { CalendrierPicker } from "@/components/reservation/CalendrierPicker";
import { RecapReservation } from "@/components/reservation/RecapReservation";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";
import { calculateTotal, useReservationsStore } from "@/stores/reservations.store";

export default function ReservationScreen() {
  const { bienId } = useLocalSearchParams<{ bienId: string }>();
  const user = useAuthStore((state) => state.user);
  const bien = useBiensStore((state) => state.biens.find((item) => item.id === bienId));
  const createReservation = useReservationsStore((state) => state.createReservation);
  const [dateDebut, setDateDebut] = useState("2026-06-12");
  const [dateFin, setDateFin] = useState("2026-06-15");

  if (!bien || !user) {
    return (
      <Screen title="Reservation impossible">
        <Button title="Retour" onPress={() => router.back()} />
      </Screen>
    );
  }

  const currentBien = bien;
  const currentUser = user;
  const total = calculateTotal(dateDebut, dateFin, currentBien.prix);

  function submit() {
    const reservation = createReservation({
      clientId: currentUser.id,
      bienId: currentBien.id,
      dateDebut,
      dateFin,
      montantTotal: total
    });
    router.push({ pathname: "/(client)/paiement", params: { reservationId: reservation.id } });
  }

  return (
    <Screen title="Reservation" subtitle="Verifiez les dates avant de passer au paiement.">
      <CalendrierPicker
        dateDebut={dateDebut}
        dateFin={dateFin}
        onChange={(field, value) => (field === "dateDebut" ? setDateDebut(value) : setDateFin(value))}
      />
      <RecapReservation bien={currentBien} dateDebut={dateDebut} dateFin={dateFin} total={total} />
      <Button title="Continuer vers le paiement" onPress={submit} />
      <Button title="Retour" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}
