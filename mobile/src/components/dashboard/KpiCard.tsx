import { StyleSheet, Text } from "react-native";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";

type KpiCardProps = {
  label: string;
  value: string;
  tone?: "primary" | "accent" | "warning";
};

export function KpiCard({ label, value, tone = "primary" }: KpiCardProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, styles[tone]]}>{value}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 140, gap: 8 },
  label: { color: colors.textMuted, fontSize: 13 },
  value: { fontSize: 24, fontWeight: "900" },
  primary: { color: colors.primary },
  accent: { color: colors.accent },
  warning: { color: colors.warning }
});
