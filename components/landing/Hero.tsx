import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";

export function Hero() {
  return (
    <section className="relative overflow-hidden grain">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-24 sm:pt-10 sm:pb-32">
        <header className="flex items-center justify-between">
          <Wordmark size="md" />
          <nav className="flex items-center gap-3">
            <Link
              href="#how"
              className="hidden sm:inline text-sm text-mome-forest/70 hover:text-mome-forest settle px-4 py-2 rounded-pill"
            >
              How it works
            </Link>
            <Link href="/app">
              <Button variant="primary" size="sm">
                Open App
              </Button>
            </Link>
          </nav>
        </header>

        <div className="mt-20 sm:mt-28 max-w-4xl">
          <p className="text-sm text-mome-forest/60 tracking-wide uppercase mb-6">
            Mome /moʊm/ — rhymes with home
          </p>

          <h1 className="font-display font-semibold text-mome-forest tracking-[-0.035em] text-[64px] leading-[0.95] sm:text-[96px] sm:leading-[0.95] lg:text-[128px] lg:leading-[0.95]">
            Chains
            <br />
            <span>disappear.</span>
            <br />
            <span className="text-mome-forest-soft">Yield appears.</span>
          </h1>

          <p className="mt-10 max-w-xl text-xl sm:text-2xl text-mome-forest/75 leading-snug">
            The savings app where DeFi got out of the way. One balance. One
            mood. Yield, quietly.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
            <Link href="/app">
              <Button variant="aurora" size="lg" fullWidth>
                Start Earning →
              </Button>
            </Link>
            <Link href="#how">
              <Button variant="ghost" size="lg" fullWidth>
                See how
              </Button>
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mome-forest/65">
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-mome-mint-deep" />
              No seed phrase
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-mome-mint-deep" />
              No gas
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-mome-mint-deep" />
              No chain switching
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 rounded-full bg-mome-mint-deep" />
              Self-custody
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
