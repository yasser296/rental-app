import { useState } from "react";

export function useLocation() {
  const [city, setCity] = useState("Casablanca");
  return { city, setCity };
}
