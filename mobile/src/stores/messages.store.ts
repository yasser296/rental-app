import { create } from "zustand";
import { messagesSeed } from "@/api/mock";
import { Message } from "@/types/models";

type MessagesState = {
  messages: Message[];
  send: (texte: string, auteurId: string) => void;
};

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: messagesSeed,
  send: (texte, auteurId) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `m-${Date.now()}`,
          conversationId: "c1",
          auteurId,
          texte,
          createdAt: new Date().toISOString(),
          lu: false
        }
      ]
    }))
}));
