'use client';

import { usePathname } from 'next/navigation';

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
    <>
      {navigation}
      {children}
      {footer}
    </>
  );
}
