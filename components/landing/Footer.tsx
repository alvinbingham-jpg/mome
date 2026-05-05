import { Wordmark } from "@/components/brand/Wordmark";

export function Footer() {
  return (
    <footer className="bg-mome-cream-warm">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
          <div>
            <Wordmark size="lg" />
            <p className="mt-3 text-mome-forest/65 max-w-md">
              Your money, in motion. Built on Particle Universal Accounts +
              EIP-7702 + ZeroDev.
            </p>
          </div>
          <div className="text-sm text-mome-forest/50">
            <p>Self-custody. No funds held by Mome.</p>
            <p>Yield comes from third-party protocols. Risk disclosed in app.</p>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-mome-forest/10 text-xs text-mome-forest/45 flex flex-wrap gap-x-4 gap-y-1">
          <span>© {new Date().getFullYear()} Mome.</span>
          <span aria-hidden>·</span>
          <span>Built for UXmaxx by Particle Network.</span>
        </div>
      </div>
    </footer>
  );
}
