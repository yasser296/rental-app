import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { useBiensStore } from "@/stores/biens.store";

export default function ModifierBienScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const bien = useBiensStore((state) => state.biens.find((item) => item.id === id));
  const updateBien = useBiensStore((state) => state.updateBien);
  const [titre, setTitre] = useState(bien?.titre ?? "");
  const [prix, setPrix] = useState(String(bien?.prix ?? ""));
  const [localisation, setLocalisation] = useState(bien?.localisation ?? "");
  const [description, setDescription] = useState(bien?.description ?? "");

  if (!bien) {
    return (
      <Screen title="Bien introuvable">
        <Button title="Retour" onPress={() => router.back()} />
      </Screen>
    );
  }

  const currentBien = bien;

  function submit() {
    updateBien(currentBien.id, { titre, prix: Number(prix) || currentBien.prix, localisation, description });
    router.replace("/(loueur)/biens");
  }

  return (
    <Screen title="Modifier le bien" subtitle={currentBien.titre}>
      <Card style={styles.form}>
        <Input label="Titre" value={titre} onChangeText={setTitre} />
        <Input label="Prix / jour" value={prix} onChangeText={setPrix} keyboardType="numeric" />
        <Input label="Localisation" value={localisation} onChangeText={setLocalisation} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Button title="Enregistrer" onPress={submit} />
        <Button title="Retour" variant="ghost" onPress={() => router.back()} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 }
});
