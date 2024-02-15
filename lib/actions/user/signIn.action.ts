'use server'

import { COOKIE_NAME, MAX_TOKEN_AGE } from '@/constants';
import User from '@/lib/models/user.model';
import { connectToDB } from '@/lib/mongoose';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

interface signInUserParams {
  email: string,
  password: string,
}

export async function signInUser({ email, password }: signInUserParams) {
  if (!email || !password) return { error: { message: 'All fields must be completed' } };

  try {
    connectToDB();

    const user = await User.findOne({ email }).select('password _id');

    if (!user) return { error: { message: 'Invalid E-Mail or password' } };

    if (await compare(password, user.password)) {
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

    }

    return { error: { message: 'Invalid E-Mail or password' } };

  } catch (error) {
    console.log(`${new Date} - Failed to sign in user - ${error}`);
  }
}