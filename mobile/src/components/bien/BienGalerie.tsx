import { Image, ScrollView, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type BienGalerieProps = {
  photos: string[];
};

export function BienGalerie({ photos }: BienGalerieProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {photos.map((photo) => (
        <Image key={photo} source={{ uri: photo }} style={styles.image} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 10 },
  image: {
    width: 260,
    height: 170,
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted
  }
});
