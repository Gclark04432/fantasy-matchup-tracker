'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '../lib/supabase/server';

export async function login(email: string, password: string) {
  const supabase = await createClient();

  const data = {
    email: email,
    password: password,
  };

  await supabase.auth.signInWithPassword(data);

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signup(email: string, password: string) {
  const supabase = await createClient();

  const data = {
    email: email,
    password: password,
  };

  await supabase.auth.signUp(data);
}
