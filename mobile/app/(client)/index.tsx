import { router } from "expo-router";
import { LogOut, Search } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { BienCard } from "@/components/bien/BienCard";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { useBiens } from "@/hooks/useBiens";
import { CategorieBien } from "@/types/models";

const categories: (CategorieBien | "tous")[] = ["tous", "voiture", "appartement", "maison", "materiel"];

export default function ClientHomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { filteredBiens, filters, setFilters } = useBiens();

  return (
    <Screen
      title="Rechercher"
      subtitle="Trouvez un bien disponible et lancez une reservation."
      right={user ? <Avatar name={user.nom} /> : null}
    >
      <View style={styles.searchBox}>
        <Input
          label="Mot cle"
          value={filters.query}
          onChangeText={(query) => setFilters({ query })}
          placeholder="Clio, appartement, camera..."
        />
        <Input
          label="Ville"
          value={filters.localisation}
          onChangeText={(localisation) => setFilters({ localisation })}
          placeholder="Casablanca"
        />
      </View>

      <View style={styles.categoryRow}>
        {categories.map((categorie) => (
          <Button
            key={categorie}
            title={categorie === "tous" ? "Tous" : categorie}
            variant={filters.categorie === categorie ? "primary" : "secondary"}
            onPress={() => setFilters({ categorie })}
          />
        ))}
      </View>

      <View style={styles.resultHeader}>
        <Text style={styles.resultText}>{filteredBiens.length} biens trouves</Text>
        <Search color={colors.textMuted} size={18} />
      </View>

      {filteredBiens.map((bien) => (
        <BienCard
          key={bien.id}
          bien={bien}
          onPress={() => router.push({ pathname: "/(client)/bien/[id]", params: { id: bien.id } })}
        />
      ))}

      {filteredBiens.length === 0 ? <Text style={styles.empty}>Aucun bien trouve.</Text> : null}

      <Button
        title="Se deconnecter"
        variant="ghost"
        leftIcon={<LogOut color={colors.text} size={18} />}
        onPress={() => {
          logout();
          router.replace("/");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  searchBox: { gap: 10 },
  categoryRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  resultHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  resultText: { color: colors.text, fontWeight: "800" },
  empty: { color: colors.textMuted, textAlign: "center", paddingVertical: 20 }
});
