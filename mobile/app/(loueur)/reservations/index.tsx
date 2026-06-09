import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useBiensStore } from "@/stores/biens.store";
import { useReservationsStore } from "@/stores/reservations.store";

export default function ReservationsLoueurScreen() {
  const biens = useBiensStore((state) => state.biens);
  const { reservations, updateStatus } = useReservationsStore();

  return (
    <Screen title="Demandes" subtitle="Confirmez ou annulez les reservations.">
      {reservations.map((reservation) => {
        const bien = biens.find((item) => item.id === reservation.bienId);
        return (
          <Card key={reservation.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{bien?.titre ?? "Bien"}</Text>
              <Badge label={reservation.statut} tone={reservation.statut === "annulee" ? "danger" : "warning"} />
            </View>
            <Text style={styles.meta}>{reservation.dateDebut} au {reservation.dateFin}</Text>
            <Text style={styles.price}>{reservation.montantTotal} MAD</Text>
            <View style={styles.actions}>
              <Button title="Confirmer" onPress={() => updateStatus(reservation.id, "confirmee")} />
              <Button title="Annuler" variant="danger" onPress={() => updateStatus(reservation.id, "annulee")} />
            </View>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  title: { color: colors.text, fontWeight: "800", flex: 1 },
  meta: { color: colors.textMuted },
  price: { color: colors.primary, fontWeight: "900" },
  actions: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
