import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hasAdminCookie } from '@/lib/admin-auth';
import { getAdminImageRegistry } from '@/lib/admin-image-registry';

function firebaseStatus() {
  const hasBucket = Boolean(process.env.FIREBASE_STORAGE_BUCKET);
  const hasCredentials = Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.GOOGLE_APPLICATION_CREDENTIALS,
  );

  return {
    configured: hasBucket && hasCredentials,
    hasBucket,
    hasCredentials,
  };
}

async function requireAdmin() {
  const cookieStore = await cookies();
  return hasAdminCookie(cookieStore);
}

function notConfiguredResponse() {
  return NextResponse.json(
    {
      ok: false,
      message:
        'Firebase Storage is not connected yet. Add the Firebase environment variables, then the upload/delete handlers can be enabled.',
      firebase: firebaseStatus(),
    },
    { status: 501 },
  );
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 });
  }

  const registry = getAdminImageRegistry();

  return NextResponse.json({
    ok: true,
    firebase: firebaseStatus(),
    images: registry,
    totals: {
      gallery: registry.gallery.length,
      journey: registry.journey.length,
    },
  });
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 });
  }

  await request.formData().catch(() => null);

  return notConfiguredResponse();
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 });
  }

  await request.json().catch(() => null);

  return notConfiguredResponse();
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 });
  }

  await request.json().catch(() => null);

  return notConfiguredResponse();
}
