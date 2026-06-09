import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { demoUsers } from "@/api/mock";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { User } from "@/types/models";

export default function UtilisateursAdminScreen() {
  const [users, setUsers] = useState<User[]>(demoUsers);

  function toggle(id: string) {
    setUsers((items) => items.map((item) => (item.id === id ? { ...item, actif: !item.actif } : item)));
  }

  return (
    <Screen title="Utilisateurs" subtitle="Gestion des comptes clients, loueurs et admins.">
      {users.map((user) => (
        <Card key={user.id} style={styles.card}>
          <View style={styles.row}>
            <Avatar name={user.nom} />
            <View style={styles.info}>
              <Text style={styles.name}>{user.nom}</Text>
              <Text style={styles.email}>{user.email}</Text>
            </View>
            <Badge label={user.role} tone={user.role === "admin" ? "info" : "neutral"} />
          </View>
          <Button
            title={user.actif ? "Desactiver" : "Activer"}
            variant={user.actif ? "danger" : "secondary"}
            onPress={() => toggle(user.id)}
          />
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 12 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  info: { flex: 1 },
  name: { color: colors.text, fontWeight: "800" },
  email: { color: colors.textMuted, fontSize: 13 }
});
