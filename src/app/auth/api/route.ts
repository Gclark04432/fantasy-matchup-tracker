import { supabase } from '@/app/lib/supabaseClient';

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 500,
    });
  }

  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response('Missing or invalid fields', {
      status: 500,
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) console.error('SignUp error:', error);
  else {
    console.log('Profile stored successfully!');
    console.log({ data });
  }
}
