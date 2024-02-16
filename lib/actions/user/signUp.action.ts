'use server'

import { connectToDB } from '@/lib/mongoose';
import User from '@/lib/models/user.model';
import { genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MAX_TOKEN_AGE, COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';

interface SignUpUserParams {
  name: string,
  email: string,
  password: string,
  repeatedPassword: string,
}

export async function signUpUser({ name, email, password, repeatedPassword }: SignUpUserParams) {
  // For some reason NextJS 14 doesn't have an built-in way to show error messages in client components in a production build, they hide the error message for security purposes.
  // At the moment all I could resolve is to return an object with an "error" property that has a "message" property so i could handle it in the client.
  // It's a little bit sketchy but it works, this way is only used in certain actions such as Sign Up, Sign In, Train Stat and others until a more cleaner way appears.
  if (!name || !email || !password || !repeatedPassword) return { error: { message: 'All fields must be completed' } };

  if (password.length < 8) return { error: { message: 'Password should be at least 8 characters' } };

  if (password !== repeatedPassword) return { error: { message: `Passwords doesn't match` } };

  try {
    connectToDB();

    const isNameTaken = await User.findOne({ username: name.toLowerCase().trim() });

    if (isNameTaken) return { error: { message: 'Name is already taken' } };

    const isEmailTaken = await User.findOne({ email });

    if (isEmailTaken) return { error: { message: 'E-Mail is already taken' } };

    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = await User.create({
      name,
      username: name.toLowerCase(),
      email,
      password: hashedPassword,
    });

    const secret = process.env.JWT_SECRET || '';

    const token = sign({ userId: user._id }, secret, { expiresIn: MAX_TOKEN_AGE });

    cookies().set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      maxAge: MAX_TOKEN_AGE,
      path: '/',
    });

    return { message: 'User signed in' };

  } catch (error: any) {
    console.log(`${new Date} - Failed to sign up user - ${error}`);
  }
}