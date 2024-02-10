import { logInUserAction, registerUserAction } from '@/lib/actions/user.actions';

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const repeatedPassword = formData.get('repeatedPassword') as string;

  if (!name || !email || !password || !repeatedPassword) throw new Error('Please complete all the fields');

  if (password.length < 8) throw new Error('Password should be at least 8 characters');

  if (password !== repeatedPassword) throw new Error(`Passwords doesn't match`);

  const payload = {
    name,
    email,
    password,
  };

  try {
    return await registerUserAction(payload);
  } catch (error) {
    throw error;
  }
}

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) throw new Error('Please complete all the fields');

  const payload = {
    email,
    password,
  };

  try {
    return await logInUserAction(payload);
  } catch (error) {
    throw error;
  }
}