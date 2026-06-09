import { Tabs } from "expo-router";
import { Car, LayoutDashboard, MessageCircle, ClipboardList } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function LoueurLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted
      }}
    >
      <Tabs.Screen name="dashboard" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <LayoutDashboard color={color} /> }} />
      <Tabs.Screen name="biens/index" options={{ title: "Biens", tabBarIcon: ({ color }) => <Car color={color} /> }} />
      <Tabs.Screen name="reservations/index" options={{ title: "Demandes", tabBarIcon: ({ color }) => <ClipboardList color={color} /> }} />
      <Tabs.Screen name="messages" options={{ title: "Messages", tabBarIcon: ({ color }) => <MessageCircle color={color} /> }} />
      <Tabs.Screen name="biens/ajouter" options={{ href: null }} />
      <Tabs.Screen name="biens/[id]/modifier" options={{ href: null }} />
    </Tabs>
  );
}
