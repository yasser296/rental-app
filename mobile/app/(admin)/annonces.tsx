import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { annoncesSeed } from "@/api/mock";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useBiensStore } from "@/stores/biens.store";
import { Annonce, AnnonceStatus } from "@/types/models";

export default function AnnoncesAdminScreen() {
  const biens = useBiensStore((state) => state.biens);
  const [annonces, setAnnonces] = useState<Annonce[]>(annoncesSeed);

  function update(id: string, statut: AnnonceStatus) {
    setAnnonces((items) => items.map((item) => (item.id === id ? { ...item, statut } : item)));
  }

  return (
    <Screen title="Annonces" subtitle="Moderation et publication des annonces.">
      {annonces.map((annonce) => {
        const bien = biens.find((item) => item.id === annonce.bienId);
        return (
          <Card key={annonce.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.title}>{bien?.titre ?? "Annonce"}</Text>
              <Badge
                label={annonce.statut}
                tone={annonce.statut === "publiee" ? "success" : annonce.statut === "refusee" ? "danger" : "warning"}
              />
            </View>
            <Text style={styles.meta}>Publiee le {annonce.datePublication}</Text>
            <View style={styles.actions}>
              <Button title="Publier" onPress={() => update(annonce.id, "publiee")} />
              <Button title="Refuser" variant="danger" onPress={() => update(annonce.id, "refusee")} />
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
  actions: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
