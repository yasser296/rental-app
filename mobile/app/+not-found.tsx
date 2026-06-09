import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function NotFound() {
  return (
    <Screen title="Page introuvable" subtitle="Cette route n'existe pas encore.">
      <Link href="/" style={styles.link}>Retour a l'accueil</Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  link: { color: colors.primary, fontWeight: "800" }
});
