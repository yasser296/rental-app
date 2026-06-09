import { demoUsers, wait } from "@/api/mock";
import { Role, User } from "@/types/models";

export async function loginDemo(role: Role): Promise<{ user: User; token: string }> {
  const user = demoUsers.find((item) => item.role === role) ?? demoUsers[0];
  return wait({ user, token: `demo-token-${role}` });
}

export async function registerDemo(role: Role, nom: string, email: string): Promise<{ user: User; token: string }> {
  return wait({
    user: { id: `u-${Date.now()}`, nom, email, telephone: "", role, actif: true },
    token: `demo-token-${role}`
  });
}
