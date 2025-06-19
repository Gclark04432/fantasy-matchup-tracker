import { createClient } from './supabase/client';

export interface WatchedPlayersRecord {
  email: string;
  watched_players: number[];
}

export class WatchedPlayersService {
  private static async getClient() {
    return await createClient();
  }

  // Get watched players for a user
  static async getWatchedPlayers(email: string): Promise<number[]> {
    try {
      const supabase = await this.getClient();

      const { data, error } = await supabase
        .from('watched_players')
        .select('watched_players')
        .eq('email', email)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "not found"
        console.error('Error fetching watched players:', error);
        return [];
      }

      // Parse the JSON string from database
      let playerIds: number[] = [];
      if (data?.watched_players) {
        try {
          playerIds =
            typeof data.watched_players === 'string'
              ? JSON.parse(data.watched_players)
              : data.watched_players;
        } catch (parseError) {
          console.error('Error parsing watched_players JSON:', parseError);
          playerIds = [];
        }
      }
      return playerIds;
    } catch (error) {
      console.error('Error in getWatchedPlayers:', error);
      return [];
    }
  }

  // Save watched players for a user
  static async saveWatchedPlayers(
    email: string,
    playerIds: number[],
  ): Promise<boolean> {
    try {
      const supabase = await this.getClient();

      // Use upsert to either insert or update
      const { error } = await supabase.from('watched_players').upsert(
        {
          email,
          watched_players: JSON.stringify(playerIds),
        },
        {
          onConflict: 'email',
        },
      );

      if (error) {
        console.error('Error saving watched players:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in saveWatchedPlayers:', error);
      return false;
    }
  }

  // Add a single player to watched list
  static async addWatchedPlayer(
    email: string,
    playerId: number,
  ): Promise<boolean> {
    try {
      const currentPlayers = await this.getWatchedPlayers(email);

      if (!currentPlayers.includes(playerId)) {
        const updatedPlayers = [...currentPlayers, playerId];
        return await this.saveWatchedPlayers(email, updatedPlayers);
      }

      return true; // Player already exists
    } catch (error) {
      console.error('Error in addWatchedPlayer:', error);
      return false;
    }
  }

  // Remove a single player from watched list
  static async removeWatchedPlayer(
    email: string,
    playerId: number,
  ): Promise<boolean> {
    try {
      const currentPlayers = await this.getWatchedPlayers(email);
      const updatedPlayers = currentPlayers.filter((id) => id !== playerId);
      return await this.saveWatchedPlayers(email, updatedPlayers);
    } catch (error) {
      console.error('Error in removeWatchedPlayer:', error);
      return false;
    }
  }

  // Clear all watched players for a user
  static async clearWatchedPlayers(email: string): Promise<boolean> {
    try {
      const supabase = await this.getClient();

      const { error } = await supabase
        .from('watched_players')
        .delete()
        .eq('email', email);

      if (error) {
        console.error('Error clearing watched players:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in clearWatchedPlayers:', error);
      return false;
    }
  }
}
