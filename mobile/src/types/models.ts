export type Role = "client" | "loueur" | "admin";
export type CategorieBien = "voiture" | "appartement" | "maison" | "materiel";
export type ReservationStatus = "en_attente" | "confirmee" | "payee" | "annulee";
export type PaiementStatus = "initie" | "valide" | "refuse";
export type AnnonceStatus = "brouillon" | "publiee" | "refusee";

export type User = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  role: Role;
  avatar?: string;
  actif?: boolean;
};

export type Bien = {
  id: string;
  loueurId: string;
  titre: string;
  description: string;
  categorie: CategorieBien;
  prix: number;
  disponible: boolean;
  localisation: string;
  image: string;
  photos: string[];
  note: number;
};

export type Annonce = {
  id: string;
  bienId: string;
  datePublication: string;
  statut: AnnonceStatus;
};

export type Reservation = {
  id: string;
  clientId: string;
  bienId: string;
  dateDebut: string;
  dateFin: string;
  statut: ReservationStatus;
  montantTotal: number;
};

export type Paiement = {
  id: string;
  reservationId: string;
  montant: number;
  datePaiement: string;
  modePaiement: "carte" | "wave" | "orange_money";
  statut: PaiementStatus;
};

export type Message = {
  id: string;
  conversationId: string;
  auteurId: string;
  texte: string;
  createdAt: string;
  lu: boolean;
};

export type BienFilters = {
  query: string;
  categorie: CategorieBien | "tous";
  localisation: string;
};
