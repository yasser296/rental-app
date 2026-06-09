import { API_BASE_URL, USE_MOCKS } from "@/constants/api";

type RequestOptions = RequestInit & { token?: string | null };

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (USE_MOCKS) {
    throw new Error("Mock API active: use module-specific API functions.");
  }

  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (options.token) headers.set("Authorization", `Bearer ${options.token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!response.ok) throw new Error("Erreur API");
  return response.json() as Promise<T>;
}
