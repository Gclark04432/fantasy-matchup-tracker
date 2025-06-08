import { Player } from "@/app/types/Player";

export const mockSearch = (name: string): Player => ({
  id: Date.now(),
  name,
  team: "Mock Team",
  points: Math.floor(Math.random() * 50),
});
