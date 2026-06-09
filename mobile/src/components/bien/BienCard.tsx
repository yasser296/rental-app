import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { colors } from "@/constants/colors";
import { Bien } from "@/types/models";

type BienCardProps = {
  bien: Bien;
  onPress?: () => void;
};

export function BienCard({ bien, onPress }: BienCardProps) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Card style={styles.card}>
        <Image source={{ uri: bien.image }} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.row}>
            <Text style={styles.title}>{bien.titre}</Text>
            <Badge label={bien.disponible ? "Disponible" : "Indispo"} tone={bien.disponible ? "success" : "danger"} />
          </View>
          <Text style={styles.meta}>{bien.localisation} · {bien.categorie} · note {bien.note}</Text>
          <Text style={styles.price}>{bien.prix} MAD / jour</Text>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.82 },
  card: { padding: 0, overflow: "hidden" },
  image: { width: "100%", height: 150, backgroundColor: colors.surfaceMuted },
  body: { padding: 12, gap: 8 },
  row: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10 },
  title: { color: colors.text, fontSize: 17, fontWeight: "800", flex: 1 },
  meta: { color: colors.textMuted, fontSize: 13 },
  price: { color: colors.primary, fontSize: 16, fontWeight: "800" }
});
