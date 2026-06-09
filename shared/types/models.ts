export type Role = "client" | "loueur" | "admin";

export type User = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  role: Role;
};

export type Bien = {
  id: string;
  titre: string;
  description: string;
  categorie: "voiture" | "appartement" | "maison" | "materiel";
  prix: number;
  disponible: boolean;
  localisation: string;
};
