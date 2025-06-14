import { supabase } from '@/app/lib/supabaseClient';
import { Auth } from '@/app/types/Auth';
import { AuthResponse } from '@supabase/supabase-js';

// POST method handles both Sign Up & Log In
export async function POST(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 500,
    });
  }

  const { mode, email, password } = await request.json();

  if (!email || !password) {
    return new Response('Missing or invalid fields', {
      status: 500,
    });
  }

  const { data, error } = await attemptSignUpOrLogIn(mode, email, password);

  if (error) console.error('Authentication error:', error);
  else {
    console.log('Authentication successfully!');
    console.log({ data });
  }

  return Response.json(data);
}

//TODO: make this a standard auth Type
const attemptSignUpOrLogIn = async (
  mode: Auth,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  if (mode === Auth.SIGNUP) {
    return await supabase.auth.signUp({
      email,
      password,
    });
  }
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};
