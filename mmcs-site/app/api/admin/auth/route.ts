import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionCookie,
  getAdminConfig,
  isAdminPassword,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  const { configured } = getAdminConfig();

  if (!configured) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Admin login is not configured. Add ADMIN_PASSWORD and ADMIN_SESSION_SECRET environment variables.',
      },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  if (!body?.password || !isAdminPassword(body.password)) {
    return NextResponse.json(
      { ok: false, message: 'Incorrect admin password.' },
      { status: 401 },
    );
  }

  const sessionCookie = createAdminSessionCookie();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.options);

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
