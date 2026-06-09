import { StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";
import { Bien } from "@/types/models";

type RecapReservationProps = {
  bien: Bien;
  dateDebut: string;
  dateFin: string;
  total: number;
};

export function RecapReservation({ bien, dateDebut, dateFin, total }: RecapReservationProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Recapitulatif</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Bien</Text>
        <Text style={styles.value}>{bien.titre}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Dates</Text>
        <Text style={styles.value}>{dateDebut} au {dateFin}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.total}>{total} MAD</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10 },
  title: { color: colors.text, fontSize: 17, fontWeight: "800" },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  label: { color: colors.textMuted },
  value: { color: colors.text, fontWeight: "700", flex: 1, textAlign: "right" },
  total: { color: colors.primary, fontWeight: "900" }
});
