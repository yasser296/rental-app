import { Tabs } from "expo-router";
import { BarChart3, ClipboardCheck, Users } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted
      }}
    >
      <Tabs.Screen name="stats" options={{ title: "Stats", tabBarIcon: ({ color }) => <BarChart3 color={color} /> }} />
      <Tabs.Screen name="annonces" options={{ title: "Annonces", tabBarIcon: ({ color }) => <ClipboardCheck color={color} /> }} />
      <Tabs.Screen name="utilisateurs" options={{ title: "Users", tabBarIcon: ({ color }) => <Users color={color} /> }} />
    </Tabs>
  );
}
