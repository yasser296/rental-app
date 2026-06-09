import { messagesSeed, wait } from "@/api/mock";
import { Message } from "@/types/models";

export async function listMessages(conversationId = "c1"): Promise<Message[]> {
  return wait(messagesSeed.filter((message) => message.conversationId === conversationId));
}

export async function sendMessage(texte: string, auteurId: string, conversationId = "c1"): Promise<Message> {
  const message: Message = {
    id: `m-${Date.now()}`,
    conversationId,
    auteurId,
    texte,
    createdAt: new Date().toISOString(),
    lu: false
  };
  messagesSeed.push(message);
  return wait(message);
}
