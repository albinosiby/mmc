import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export default function NotFound() {
  return (
    <main id="main" className="section wrap not-found">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>
        Let’s find your
        <br />
        <em>way back.</em>
      </h1>
      <p>
        This page is not part of our current website. Explore our work or return
        to the homepage.
      </p>
      <div className="actions">
        <Link href="/" className="button">
          Back to home <ArrowRight size={18} />
        </Link>
        <Link href="/our-work" className="text-link">
          Explore our work
        </Link>
      </div>
    </main>
  );
}
