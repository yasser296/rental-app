import { Annonce, Bien, Message, Reservation, User } from "@/types/models";

export const demoUsers: User[] = [
  { id: "u1", nom: "Sara Client", email: "client@lokali.app", telephone: "+212600000001", role: "client", actif: true },
  { id: "u2", nom: "Yassine Loueur", email: "loueur@lokali.app", telephone: "+212600000002", role: "loueur", actif: true },
  { id: "u3", nom: "Admin Lokali", email: "admin@lokali.app", telephone: "+212600000003", role: "admin", actif: true }
];

const imageBase = "https://images.unsplash.com/photo";

export const biensSeed: Bien[] = [
  {
    id: "b1",
    loueurId: "u2",
    titre: "Renault Clio automatique",
    description: "Voiture economique, climatisation, ideale pour les trajets urbains.",
    categorie: "voiture",
    prix: 320,
    disponible: true,
    localisation: "Casablanca",
    image: `${imageBase}-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80`,
    photos: [
      `${imageBase}-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80`,
      `${imageBase}-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80`
    ],
    note: 4.7
  },
  {
    id: "b2",
    loueurId: "u2",
    titre: "Appartement centre-ville",
    description: "Appartement meuble avec deux chambres, wifi et parking proche tramway.",
    categorie: "appartement",
    prix: 580,
    disponible: true,
    localisation: "Rabat",
    image: `${imageBase}-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80`,
    photos: [
      `${imageBase}-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80`,
      `${imageBase}-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80`
    ],
    note: 4.9
  },
  {
    id: "b3",
    loueurId: "u2",
    titre: "Villa familiale avec jardin",
    description: "Maison calme pour familles, cuisine equipee et grand jardin.",
    categorie: "maison",
    prix: 900,
    disponible: false,
    localisation: "Marrakech",
    image: `${imageBase}-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80`,
    photos: [
      `${imageBase}-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80`,
      `${imageBase}-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80`
    ],
    note: 4.6
  },
  {
    id: "b4",
    loueurId: "u2",
    titre: "Camera Sony pour tournage",
    description: "Kit camera, objectif et micro pour projets video courts.",
    categorie: "materiel",
    prix: 180,
    disponible: true,
    localisation: "Tanger",
    image: `${imageBase}-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80`,
    photos: [
      `${imageBase}-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80`,
      `${imageBase}-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80`
    ],
    note: 4.5
  }
];

export const annoncesSeed: Annonce[] = [
  { id: "a1", bienId: "b1", datePublication: "2026-06-01", statut: "publiee" },
  { id: "a2", bienId: "b2", datePublication: "2026-06-04", statut: "publiee" },
  { id: "a3", bienId: "b3", datePublication: "2026-06-06", statut: "brouillon" }
];

export const reservationsSeed: Reservation[] = [
  {
    id: "r1",
    clientId: "u1",
    bienId: "b2",
    dateDebut: "2026-06-12",
    dateFin: "2026-06-15",
    statut: "confirmee",
    montantTotal: 1740
  }
];

export const messagesSeed: Message[] = [
  {
    id: "m1",
    conversationId: "c1",
    auteurId: "u2",
    texte: "Bonjour, le bien est disponible pour vos dates.",
    createdAt: "2026-06-09T10:30:00.000Z",
    lu: false
  }
];

export const wait = <T,>(value: T, delay = 180) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), delay));
