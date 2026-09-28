import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const ADMIN_COOKIE_NAME = 'mmcs_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export function getAdminConfig() {
  return {
    password: process.env.ADMIN_PASSWORD,
    sessionSecret: process.env.ADMIN_SESSION_SECRET,
    configured: Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET),
  };
}

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) return false;

  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function createAdminSessionCookie() {
  const { sessionSecret } = getAdminConfig();

  if (!sessionSecret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured.');
  }

  const issuedAt = String(Date.now());
  const nonce = randomBytes(16).toString('hex');
  const payload = `${issuedAt}.${nonce}`;
  const signature = sign(payload, sessionSecret);

  return {
    name: ADMIN_COOKIE_NAME,
    value: `${payload}.${signature}`,
    options: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    },
  };
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return hasAdminCookie(cookieStore);
}

export function hasAdminCookie(cookieStore: Pick<ReadonlyRequestCookies, 'get'>) {
  const { sessionSecret } = getAdminConfig();
  const rawCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionSecret || !rawCookie) return false;

  const parts = rawCookie.split('.');
  if (parts.length !== 3) return false;

  const [issuedAt, nonce, signature] = parts;
  const issuedTime = Number(issuedAt);
  const isExpired = !Number.isFinite(issuedTime) || Date.now() - issuedTime > SESSION_MAX_AGE_SECONDS * 1000;

  if (isExpired) return false;

  return safeCompare(signature, sign(`${issuedAt}.${nonce}`, sessionSecret));
}

export function isAdminPassword(value: string) {
  const { password } = getAdminConfig();
  return Boolean(password && safeCompare(value, password));
}
