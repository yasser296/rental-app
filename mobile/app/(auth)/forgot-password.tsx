import { router } from "expo-router";
import { Mail } from "lucide-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { colors } from "@/constants/colors";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  return (
    <Screen title="Recuperation" subtitle="Un lien de reinitialisation sera envoye par email.">
      <Card style={{ gap: 14 }}>
        <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
        <Button
          title="Envoyer le lien"
          leftIcon={<Mail color={colors.surface} size={18} />}
          onPress={() => Alert.alert("Email envoye", "Si le compte existe, vous recevrez un lien de recuperation.")}
        />
        <Button title="Retour" variant="ghost" onPress={() => router.back()} />
      </Card>
    </Screen>
  );
}
