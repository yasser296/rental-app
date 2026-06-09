import { StyleSheet, Text, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { colors } from "@/constants/colors";

type BienMapProps = {
  localisation: string;
};

export function BienMap({ localisation }: BienMapProps) {
  return (
    <View style={styles.map}>
      <MapPin color={colors.primary} size={28} />
      <Text style={styles.title}>{localisation}</Text>
      <Text style={styles.text}>Localisation proche du bien.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 12
  },
  title: { color: colors.text, fontWeight: "800" },
  text: { color: colors.textMuted, textAlign: "center", fontSize: 13 }
});
