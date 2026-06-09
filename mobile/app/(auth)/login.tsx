import { Link, router } from "expo-router";
import { ShieldCheck } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/models";

const roles: { label: string; value: Role }[] = [
  { label: "Client", value: "client" },
  { label: "Loueur", value: "loueur" },
  { label: "Admin", value: "admin" }
];

export default function LoginScreen() {
  const { selectedRole, setSelectedRole, loginAs, loading } = useAuthStore();
  const [email, setEmail] = useState("client@lokali.app");
  const [password, setPassword] = useState("demo1234");

  async function submit() {
    await loginAs(selectedRole);
    router.replace("/");
  }

  return (
    <Screen title="Lokali" subtitle="Location de voitures, logements et materiel entre utilisateurs.">
      <Card style={styles.card}>
        <View style={styles.roleRow}>
          {roles.map((role) => (
            <Button
              key={role.value}
              title={role.label}
              variant={selectedRole === role.value ? "primary" : "secondary"}
              onPress={() => {
                setSelectedRole(role.value);
                setEmail(`${role.value}@lokali.app`);
              }}
            />
          ))}
        </View>

        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Input label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />

        <Button
          title={loading ? "Connexion..." : "Se connecter"}
          disabled={loading}
          leftIcon={<ShieldCheck color={colors.surface} size={18} />}
          onPress={submit}
        />

        <View style={styles.links}>
          <Link href="/(auth)/register" style={styles.link}>Creer un compte</Link>
          <Text style={styles.dot}>·</Text>
          <Link href="/(auth)/forgot-password" style={styles.link}>Mot de passe oublie</Link>
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 14 },
  roleRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  links: { flexDirection: "row", justifyContent: "center", gap: 8, flexWrap: "wrap" },
  link: { color: colors.primary, fontWeight: "800" },
  dot: { color: colors.textMuted }
});
