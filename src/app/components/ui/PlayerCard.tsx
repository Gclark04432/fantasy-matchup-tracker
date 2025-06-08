import { motion } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Player } from "@/app/types/Player";

export function PlayerCard({ player, darkMode }: { player: Player; darkMode: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      layout
      transition={{ duration: 0.3 }}
      className="transform transition hover:scale-105 hover:shadow-xl rounded-2xl"
    >
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold">{player.name}</h2>
          <p className="text-sm">Team: {player.team}</p>
          <motion.p
            className="text-lg font-bold"
            initial={{ backgroundColor: "#facc15" }}
            animate={{ backgroundColor: darkMode ? "#111827" : "#ffffff" }}
            transition={{ duration: 1 }}
          >
            Points: {player.points}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
