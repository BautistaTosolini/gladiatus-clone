import { type ClassValue, clsx } from 'clsx'
import { JwtPayload, verify } from 'jsonwebtoken';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { twMerge } from 'tailwind-merge'
import { ARENA_COOLDOWN, EXPEDITION_COOLDOWN } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Extracts the user id from the jwt and returns it.
export function extractUserId(token: RequestCookie) {
  const { value } = token;

  const secret = process.env.JWT_SECRET || '';

  const { userId } = verify(value, secret) as JwtPayload;

  if (!userId) throw new Error('Unauthorized')

  return userId;
}

export function calculateNextLevelExperience(level: number) {
  return (10 * (level + 1 ) - 5) - 10;
}

export function calculateProgressPercent(first: number, second: number) {
  return (first / second) * 100;
}

export function canFight({ time, fight }: { time: number, fight: string }) {
  const lastFightTime = new Date(time);
  const currentTime = new Date();

  if (fight === 'expedition') {
    const futureTime = new Date(lastFightTime.getTime() + EXPEDITION_COOLDOWN * 1000);
    return currentTime >= futureTime;
  } else if (fight === 'arena') {
    const futureTime = new Date(lastFightTime.getTime() + ARENA_COOLDOWN * 1000);
    return currentTime >= futureTime;
  } else return false;

}
