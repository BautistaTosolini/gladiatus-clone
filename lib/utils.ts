import { type ClassValue, clsx } from 'clsx'
import { JwtPayload, verify } from 'jsonwebtoken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractUserId(token: RequestCookie) {
  const { value } = token;

  const secret = process.env.JWT_SECRET || '';

  const { userId } = verify(value, secret) as JwtPayload;

  if (!userId) throw new Error('Unauthorized')

  return userId;
}