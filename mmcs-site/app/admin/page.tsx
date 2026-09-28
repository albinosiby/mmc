import type { Metadata } from 'next';
import { isAdminSession } from '@/lib/admin-auth';
import { getAdminConfig } from '@/lib/admin-auth';
import { AdminPanel } from './admin-panel';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Image Admin | MMCS',
  description: 'Private image management panel for MMCS Journey and Gallery images.',
};

export default async function AdminPage() {
  const initialAuthed = await isAdminSession();
  const adminConfig = getAdminConfig();

  return (
    <main id="main">
      <AdminPanel
        initialAuthed={initialAuthed}
        adminConfigured={adminConfig.configured}
      />
    </main>
  );
}
