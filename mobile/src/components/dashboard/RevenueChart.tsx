import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

type RevenueChartProps = {
  values: number[];
};

export function RevenueChart({ values }: RevenueChartProps) {
  const max = Math.max(...values, 1);
  return (
    <View style={styles.chart}>
      {values.map((value, index) => (
        <View key={`${value}-${index}`} style={styles.barWrap}>
          <View style={[styles.bar, { height: 24 + (value / max) * 90 }]} />
          <Text style={styles.label}>S{index + 1}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    padding: 12
  },
  barWrap: { flex: 1, alignItems: "center", gap: 6 },
  bar: { width: "100%", borderRadius: 6, backgroundColor: colors.accent },
  label: { color: colors.textMuted, fontSize: 11 }
});
