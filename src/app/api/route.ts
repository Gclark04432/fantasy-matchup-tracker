// POST player only
import { supabase } from '../lib/supabaseClient';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return Response.json({ message: 'Method not allowed' });
  }

  const { id, name, team } = await request.json();

  if (!id || !name || !team) {
    return Response.json({ message: 'Missing or invalid fields' });
  }

  const { error } = await supabase.from('players').insert([{ id, name, team }]);

  if (error) {
    console.error('Supabase error:', error);
    return Response.json({ message: 'Database insert failed', error });
  }

  return Response.json({ message: 'Player saved successfully' });
}
