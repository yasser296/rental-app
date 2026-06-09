import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { BienCard } from "@/components/bien/BienCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";

export default function BiensLoueurScreen() {
  const user = useAuthStore((state) => state.user);
  const biens = useBiensStore((state) => state.biens.filter((bien) => bien.loueurId === user?.id));

  return (
    <Screen title="Mes biens" subtitle="Publiez et mettez a jour vos biens.">
      <Button
        title="Nouveau bien"
        leftIcon={<Plus color={colors.surface} size={18} />}
        onPress={() => router.push("/(loueur)/biens/ajouter")}
      />
      {biens.map((bien) => (
        <BienCard
          key={bien.id}
          bien={bien}
          onPress={() => router.push({ pathname: "/(loueur)/biens/[id]/modifier", params: { id: bien.id } })}
        />
      ))}
      {biens.length === 0 ? <Text style={styles.empty}>Aucun bien ajoute.</Text> : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: colors.textMuted, textAlign: "center", paddingVertical: 20 }
});
