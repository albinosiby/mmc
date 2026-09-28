'use client';

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { CurtainLaunch } from '@/components/curtain-launch/CurtainLaunch';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CurtainLaunch>
      <Navigation />
      {children}
      <Footer />
    </CurtainLaunch>
  );
}
