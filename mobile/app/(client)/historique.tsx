import { StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";
import { useReservationsStore } from "@/stores/reservations.store";

export default function HistoriqueScreen() {
  const user = useAuthStore((state) => state.user);
  const biens = useBiensStore((state) => state.biens);
  const reservations = useReservationsStore((state) => state.reservations);
  const mine = reservations.filter((reservation) => reservation.clientId === user?.id);

  return (
    <Screen title="Historique" subtitle="Vos demandes et reservations passees.">
      {mine.map((reservation) => {
        const bien = biens.find((item) => item.id === reservation.bienId);
        return (
          <Card key={reservation.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{bien?.titre ?? "Bien"}</Text>
              <Badge label={reservation.statut} tone={reservation.statut === "payee" ? "success" : "warning"} />
            </View>
            <Text style={styles.meta}>{reservation.dateDebut} au {reservation.dateFin}</Text>
            <Text style={styles.price}>{reservation.montantTotal} MAD</Text>
          </Card>
        );
      })}
      {mine.length === 0 ? <Text style={styles.empty}>Aucune reservation pour le moment.</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  title: { color: colors.text, fontSize: 16, fontWeight: "800", flex: 1 },
  meta: { color: colors.textMuted },
  price: { color: colors.primary, fontWeight: "900" },
  empty: { color: colors.textMuted, textAlign: "center", paddingVertical: 20 }
});
