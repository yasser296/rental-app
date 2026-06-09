import { router, useLocalSearchParams } from "expo-router";
import { CreditCard } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { initierPaiement } from "@/services/paiement.service";
import { useReservationsStore } from "@/stores/reservations.store";
import { Paiement } from "@/types/models";

const modes: Paiement["modePaiement"][] = ["carte", "wave", "orange_money"];

export default function PaiementScreen() {
  const { reservationId } = useLocalSearchParams<{ reservationId: string }>();
  const reservations = useReservationsStore((state) => state.reservations);
  const updateStatus = useReservationsStore((state) => state.updateStatus);
  const reservation = reservations.find((item) => item.id === reservationId);
  const [mode, setMode] = useState<Paiement["modePaiement"]>("carte");
  const [loading, setLoading] = useState(false);

  if (!reservation) {
    return (
      <Screen title="Paiement introuvable">
        <Button title="Retour" onPress={() => router.back()} />
      </Screen>
    );
  }

  const currentReservation = reservation;

  async function payer() {
    setLoading(true);
    await initierPaiement(currentReservation.id, currentReservation.montantTotal, mode);
    updateStatus(currentReservation.id, "payee");
    setLoading(false);
    router.replace("/(client)/historique");
  }

  return (
    <Screen title="Paiement" subtitle="Selectionnez un mode de paiement.">
      <Card style={styles.card}>
        <Text style={styles.amount}>{currentReservation.montantTotal} MAD</Text>
        <Text style={styles.note}>Reservation {currentReservation.id}</Text>
      </Card>
      <View style={styles.modeRow}>
        {modes.map((item) => (
          <Button
            key={item}
            title={item === "orange_money" ? "Orange" : item}
            variant={mode === item ? "primary" : "secondary"}
            onPress={() => setMode(item)}
          />
        ))}
      </View>
      <Button
        title={loading ? "Validation..." : "Payer maintenant"}
        disabled={loading}
        leftIcon={<CreditCard color={colors.surface} size={18} />}
        onPress={payer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 6 },
  amount: { color: colors.primary, fontSize: 30, fontWeight: "900" },
  note: { color: colors.textMuted },
  modeRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
