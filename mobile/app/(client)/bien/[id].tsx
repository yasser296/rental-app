import { router, useLocalSearchParams } from "expo-router";
import { CalendarPlus } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { BienGalerie } from "@/components/bien/BienGalerie";
import { BienMap } from "@/components/bien/BienMap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useBiensStore } from "@/stores/biens.store";

export default function BienDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bien = useBiensStore((state) => state.biens.find((item) => item.id === id));

  if (!bien) {
    return (
      <Screen title="Bien introuvable">
        <Button title="Retour" onPress={() => router.back()} />
      </Screen>
    );
  }

  return (
    <Screen title={bien.titre} subtitle={`${bien.localisation} · ${bien.prix} MAD / jour`}>
      <BienGalerie photos={bien.photos} />
      <Card style={styles.card}>
        <Badge label={bien.disponible ? "Disponible" : "Indisponible"} tone={bien.disponible ? "success" : "danger"} />
        <Text style={styles.description}>{bien.description}</Text>
        <Text style={styles.meta}>Categorie: {bien.categorie} · Note: {bien.note}</Text>
      </Card>
      <BienMap localisation={bien.localisation} />
      <Button
        title="Reserver ce bien"
        disabled={!bien.disponible}
        leftIcon={<CalendarPlus color={colors.surface} size={18} />}
        onPress={() => router.push({ pathname: "/(client)/reservation", params: { bienId: bien.id } })}
      />
      <Button title="Retour" variant="ghost" onPress={() => router.back()} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 10 },
  description: { color: colors.text, fontSize: 15, lineHeight: 22 },
  meta: { color: colors.textMuted }
});
