'use client';

import { usePathname } from 'next/navigation';
import { CurtainLaunch } from '@/components/curtain-launch/CurtainLaunch';

export function SiteShell({
  children,
  navigation,
  footer,
}: {
  children: React.ReactNode;
  navigation: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CurtainLaunch>
      {navigation}
      {children}
      {footer}
    </CurtainLaunch>
  );
}
