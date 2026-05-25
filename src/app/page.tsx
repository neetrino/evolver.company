import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { Button } from '@/shared/components/ui/button';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <span className="text-lg font-semibold tracking-tight">{siteConfig.name}</span>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </nav>
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Frontend ready
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Build {siteConfig.name} here
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">
            Next.js App Router, Tailwind CSS 4, and shadcn/ui are configured. API routes and Prisma
            are ready for backend work.
          </p>
          <Button asChild>
            <Link href="/api/health">Check API health</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
