import { StyleSheet, View } from "react-native";
import { Input } from "@/components/ui/Input";

type CalendrierPickerProps = {
  dateDebut: string;
  dateFin: string;
  onChange: (field: "dateDebut" | "dateFin", value: string) => void;
};

export function CalendrierPicker({ dateDebut, dateFin, onChange }: CalendrierPickerProps) {
  return (
    <View style={styles.grid}>
      <Input label="Date debut" value={dateDebut} onChangeText={(value) => onChange("dateDebut", value)} />
      <Input label="Date fin" value={dateFin} onChangeText={(value) => onChange("dateFin", value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { gap: 12 }
});
