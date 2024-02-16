'use server'

import { COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';

export async function logOutUser() {
  cookies().set({
    name: COOKIE_NAME,
    value: '',
    maxAge: 1,
  });
}