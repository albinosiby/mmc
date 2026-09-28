import type { Metadata } from 'next';
import { getAdminImageRegistry } from '@/lib/admin-image-registry';
import { AdminPanel } from './admin-panel';

export const metadata: Metadata = {
  title: 'Image Admin | MMCS',
  description: 'Private image management panel for MMCS Journey and Gallery images.',
};

export default function AdminPage() {
  return (
    <main id="main">
      <AdminPanel
        images={getAdminImageRegistry()}
        previewPasswordConfigured={Boolean(process.env.NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD)}
      />
    </main>
  );
}
