import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

type BadgeProps = {
  label: string;
  tone?: "neutral" | "success" | "warning" | "danger" | "info";
};

export function Badge({ label, tone = "neutral" }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, tone === "neutral" && styles.neutralText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 4, alignSelf: "flex-start" },
  neutral: { backgroundColor: colors.surfaceMuted },
  success: { backgroundColor: colors.successSoft },
  warning: { backgroundColor: colors.warningSoft },
  danger: { backgroundColor: colors.dangerSoft },
  info: { backgroundColor: "#dbeafe" },
  text: { color: colors.text, fontSize: 12, fontWeight: "700" },
  neutralText: { color: colors.textMuted }
});
