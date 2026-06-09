import { Redirect } from "expo-router";
import { useAuthStore } from "@/stores/auth.store";

export default function Index() {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Redirect href="/(auth)/login" />;
  if (user.role === "loueur") return <Redirect href="/(loueur)/dashboard" />;
  if (user.role === "admin") return <Redirect href="/(admin)/stats" />;
  return <Redirect href="/(client)" />;
}
