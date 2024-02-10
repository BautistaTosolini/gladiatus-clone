'use server';

import { connectToDB } from '@/lib/mongoose';
import User from '@/lib/models/user.model';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MAX_TOKEN_AGE, COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';

interface RegisterUserParams {
  name: string,
  email: string,
  password: string,
}

export async function registerUserAction({ name, email, password }: RegisterUserParams) {
  try {
    connectToDB();

    const isNameTaken = await User.findOne({ username: name.toLowerCase() });

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
    console.log(`${new Date} - Failed to register user - ${error}`)
    throw error;
  }
}

interface LogInUserParams {
  email: string,
  password: string,
}

export async function logInUserAction({ email, password }: LogInUserParams) {
  try {
    connectToDB();

    const user = await User.findOne({ email }).select('password _id');

    if (!user) throw new Error(`Invalid E-Mail or password`);

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

      return 'User logged in successfully';
    }

    throw new Error(`Invalid E-Mail or password`);

  } catch (error) {
    console.log(`${new Date} - Failed to log in user - ${error}`)
    throw error;
  }
}