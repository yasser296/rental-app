import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { annoncesSeed, demoUsers } from "@/api/mock";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";
import { useReservationsStore } from "@/stores/reservations.store";

export default function StatsAdminScreen() {
  const logout = useAuthStore((state) => state.logout);
  const biens = useBiensStore((state) => state.biens);
  const reservations = useReservationsStore((state) => state.reservations);
  const revenu = reservations.reduce((sum, item) => sum + item.montantTotal, 0);

  return (
    <Screen title="Statistiques" subtitle="Vue globale de la plateforme Lokali.">
      <View style={styles.grid}>
        <KpiCard label="Utilisateurs" value={`${demoUsers.length}`} />
        <KpiCard label="Biens" value={`${biens.length}`} tone="accent" />
        <KpiCard label="Annonces" value={`${annoncesSeed.length}`} tone="warning" />
        <KpiCard label="Volume" value={`${revenu} MAD`} />
      </View>
      <RevenueChart values={[demoUsers.length, biens.length * 2, annoncesSeed.length * 3, reservations.length * 4, revenu / 100 || 6]} />
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
  grid: { flexDirection: "row", gap: 10, flexWrap: "wrap" }
});
