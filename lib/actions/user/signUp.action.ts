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

export async function SignUpUser({ name, email, password, repeatedPassword }: SignUpUserParams) {
  if (!name || !email || !password || !repeatedPassword) throw new Error('Please complete all the fields');

  if (password.length < 8) throw new Error('Password should be at least 8 characters');

  if (password !== repeatedPassword) throw new Error(`Passwords doesn't match`);

  try {
    connectToDB();

    const isNameTaken = await User.findOne({ username: name.toLowerCase().trim() });

    if (isNameTaken) throw new Error('Name is already taken');

    const isEmailTaken = await User.findOne({ email });

    if (isEmailTaken) throw new Error('E-Mail is already taken');

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

    return 'User created successfully';

  } catch (error: any) {
    console.log(`${new Date} - Failed to sign up user - ${error}`);
    throw error;
  }
}