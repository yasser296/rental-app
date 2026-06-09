import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { useAuthStore } from "@/stores/auth.store";
import { useBiensStore } from "@/stores/biens.store";
import { CategorieBien } from "@/types/models";

const categories: CategorieBien[] = ["voiture", "appartement", "maison", "materiel"];

export default function AjouterBienScreen() {
  const user = useAuthStore((state) => state.user);
  const addBien = useBiensStore((state) => state.addBien);
  const [categorie, setCategorie] = useState<CategorieBien>("voiture");
  const [titre, setTitre] = useState("");
  const [prix, setPrix] = useState("300");
  const [localisation, setLocalisation] = useState("Casablanca");
  const [description, setDescription] = useState("");

  function submit() {
    if (!user) return;
    addBien({
      loueurId: user.id,
      titre: titre || "Nouveau bien",
      description: description || "Description courte du bien.",
      categorie,
      prix: Number(prix) || 0,
      disponible: true,
      localisation,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80"
    });
    router.replace("/(loueur)/biens");
  }

  return (
    <Screen title="Ajouter un bien" subtitle="Completez les informations du bien.">
      <Card style={styles.form}>
        <View style={styles.row}>
          {categories.map((item) => (
            <Button
              key={item}
              title={item}
              variant={categorie === item ? "primary" : "secondary"}
              onPress={() => setCategorie(item)}
            />
          ))}
        </View>
        <Input label="Titre" value={titre} onChangeText={setTitre} />
        <Input label="Prix / jour" value={prix} onChangeText={setPrix} keyboardType="numeric" />
        <Input label="Localisation" value={localisation} onChangeText={setLocalisation} />
        <Input label="Description" value={description} onChangeText={setDescription} multiline />
        <Button title="Publier le bien" onPress={submit} />
        <Button title="Annuler" variant="ghost" onPress={() => router.back()} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: { gap: 12 },
  row: { flexDirection: "row", gap: 8, flexWrap: "wrap" }
});
