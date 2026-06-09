import { router } from "expo-router";
import { LogOut, Plus } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";
import { useReservationsStore } from "@/stores/reservations.store";

export default function LoueurDashboardScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const biens = useBiensStore((state) => state.biens.filter((bien) => bien.loueurId === user?.id));
  const reservations = useReservationsStore((state) => state.reservations);
  const revenus = reservations.reduce((sum, reservation) => sum + reservation.montantTotal, 0);

  return (
    <Screen title="Dashboard" subtitle="Suivi rapide de votre activite de location.">
      <View style={styles.grid}>
        <KpiCard label="Biens" value={`${biens.length}`} />
        <KpiCard label="Demandes" value={`${reservations.length}`} tone="accent" />
        <KpiCard label="Revenus" value={`${revenus} MAD`} tone="warning" />
      </View>
      <RevenueChart values={[320, 580, 900, 420, revenus || 740]} />
      <Button
        title="Ajouter un bien"
        leftIcon={<Plus color={colors.surface} size={18} />}
        onPress={() => router.push("/(loueur)/biens/ajouter")}
      />
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
