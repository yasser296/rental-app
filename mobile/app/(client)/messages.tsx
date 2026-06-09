import { Send } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";
import { useAuthStore } from "@/stores/auth.store";
import { useMessagesStore } from "@/stores/messages.store";

export default function ClientMessagesScreen() {
  const user = useAuthStore((state) => state.user);
  const { messages, send } = useMessagesStore();
  const [texte, setTexte] = useState("");

  function submit() {
    if (!texte.trim() || !user) return;
    send(texte.trim(), user.id);
    setTexte("");
  }

  return (
    <Screen title="Messages" subtitle="Vos conversations avec les loueurs.">
      {messages.map((message) => (
        <Card key={message.id} style={message.auteurId === user?.id ? styles.mine : styles.card}>
          <Text style={styles.message}>{message.texte}</Text>
        </Card>
      ))}
      <View style={styles.form}>
        <Input value={texte} onChangeText={setTexte} placeholder="Votre message" />
        <Button title="Envoyer" leftIcon={<Send color={colors.surface} size={18} />} onPress={submit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 4 },
  mine: { gap: 4, backgroundColor: colors.primarySoft, borderColor: colors.primary },
  message: { color: colors.text, lineHeight: 20 },
  form: { gap: 10 }
});
