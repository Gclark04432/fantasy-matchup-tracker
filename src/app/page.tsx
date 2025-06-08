'use client'

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Input } from "@/app/components/ui/Input";
import { Button } from "@/app/components/ui/Button";
import { Switch } from "@/app/components/ui/Switch";
import { PlayerCard } from "@/app/components/ui/PlayerCard";
import { Player } from "@/app/types/Player";
import { mockSearch } from "@/app/lib/mockSearch";
import { Loader2 } from "lucide-react";

export default function FantasyMatchupTracker() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [query, setQuery] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (): Promise<void> => {
    if (!query) return;
    setLoading(true);
    setTimeout(() => {
      const player = mockSearch(query);
      setPlayers((prev) => [...prev, player]);
      setQuery("");
      setLoading(false);
    }, 500); // simulate fetch delay
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 sm:px-8 transition-colors duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
            Fantasy Matchup Tracker
          </h1>
          <div className="flex items-center gap-2">
            <span>Dark Mode</span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter player name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="transition-transform hover:scale-105" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Track Player"}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} darkMode={darkMode} />
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-16 text-center text-sm opacity-70">
        <p>Built with React, TypeScript, TailwindCSS, and 💡</p>
      </footer>
    </div>
  );
}
