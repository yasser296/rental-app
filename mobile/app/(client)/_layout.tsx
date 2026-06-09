import { Tabs } from "expo-router";
import { CalendarDays, Home, MessageCircle } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function ClientLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Recherche", tabBarIcon: ({ color }) => <Home color={color} /> }} />
      <Tabs.Screen name="historique" options={{ title: "Historique", tabBarIcon: ({ color }) => <CalendarDays color={color} /> }} />
      <Tabs.Screen name="messages" options={{ title: "Messages", tabBarIcon: ({ color }) => <MessageCircle color={color} /> }} />
      <Tabs.Screen name="bien/[id]" options={{ href: null }} />
      <Tabs.Screen name="reservation" options={{ href: null }} />
      <Tabs.Screen name="paiement" options={{ href: null }} />
    </Tabs>
  );
}
