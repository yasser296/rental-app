import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { useAuthStore } from "@/stores/auth.store";
import { Role } from "@/types/models";

const roles: Role[] = ["client", "loueur"];

export default function RegisterScreen() {
  const { registerAs, loading } = useAuthStore();
  const [role, setRole] = useState<Role>("client");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  async function submit() {
    await registerAs({ nom: nom || "Nouveau compte", email: email || "nouveau@lokali.app", role });
    router.replace("/");
  }

  return (
    <Screen title="Inscription" subtitle="Choisissez votre role pour commencer.">
      <Card style={styles.card}>
        <View style={styles.roleRow}>
          {roles.map((item) => (
            <Button
              key={item}
              title={item === "client" ? "Client" : "Loueur"}
              variant={role === item ? "primary" : "secondary"}
              onPress={() => setRole(item)}
            />
          ))}
        </View>
        <Input label="Nom complet" value={nom} onChangeText={setNom} />
        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Button title={loading ? "Creation..." : "Creer le compte"} disabled={loading} onPress={submit} />
        <Button title="Retour" variant="ghost" onPress={() => router.back()} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 14 },
  roleRow: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
