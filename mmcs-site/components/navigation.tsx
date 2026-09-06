'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu } from 'lucide-react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
const links = [
  ['Home', '/'],
  ['About', '/#about'],
  ['Our Organisations', '/projects'],
  ['Our work', '/our-work'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
];
export function Navigation() {
  const path = usePathname();
  const currentPath = path === '/' ? '/' : path.replace(/\/+$/, '');
  const isCurrent = (href: string) =>
    !href.includes('#') &&
    currentPath === (href === '/' ? '/' : href.replace(/\/+$/, ''));
  const organisationsActive =
    currentPath.startsWith('/projects') ||
    currentPath.startsWith('/organisations');
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="identity" href="/" aria-label="MMCS home">
          <Image
            src="/images/mmcs.webp"
            alt="MMCS official logo"
            width={43}
            height={53}
            priority
          />
          <span>
            <strong>
              Muktidata Multipurpose
              <br />
              Cooperative Society
            </strong>
            <small>People · Livelihoods · Stronger Communities</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) =>
            href === '/projects' ? (
              <DropdownMenu key={href}>
                <DropdownMenuTrigger
                  className={`nav-trigger ${organisationsActive ? 'active' : ''}`}
                  aria-current={organisationsActive ? 'page' : undefined}
                >
                  Our Organisations <ChevronDown size={13} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="nav-dropdown" sideOffset={18}>
                  {[
                    ['All projects', '/projects'],
                    ['Nokma', '/organisations/nokma'],
                    ['MeghFarm', '/organisations/megh-farm'],
                    ['Our organisations', '/organisations'],
                  ].map(([text, url]) => (
                    <DropdownMenuItem key={url} render={<Link href={url} />}>
                      {text}
                      <ArrowUpRight size={14} />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            ),
          )}
        </nav>
        <div className="mobile-toggle">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="icon-button" aria-label="Open navigation">
              <Menu size={24} />
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetTitle className="mobile-title">Explore MMCS</SheetTitle>
              <SheetDescription>
                People, livelihoods and stronger communities.
              </SheetDescription>
              <nav aria-label="Mobile navigation">
                {[
                  ...links,
                  ['Nokma', '/organisations/nokma'],
                  ['MeghFarm', '/organisations/megh-farm'],
                  ['Our journey', '/journey'],
                  ['Achievements', '/achievements'],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(href) ? 'page' : undefined}
                  >
                    {label}
                    <ArrowUpRight size={17} />
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
