const STEPS = [
  {
    n: "01",
    title: "Sign in with your face",
    body: "No seed phrase, no extension. Particle's embedded wallet handles keys behind a biometric. Self-custody, zero friction.",
  },
  {
    n: "02",
    title: "Pick a mood",
    body: "Chill, Balanced, or Boost. Each mood routes to a curated set of audited protocols — disclosed in Show Details, never hidden.",
  },
  {
    n: "03",
    title: "Tap Start Earning",
    body: "One signature. Universal Accounts move your stablecoins across chains via EIP-7702. ZeroDev pays the gas. You see one number that goes up.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-mome-forest text-mome-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-mome-mint text-sm uppercase tracking-wide mb-6">
          The whole product, in three taps
        </p>
        <h2 className="font-display font-semibold tracking-[-0.03em] text-5xl sm:text-6xl lg:text-7xl max-w-3xl">
          We did all the DeFi homework, so you don&apos;t have to.
        </h2>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="rounded-card bg-mome-forest-soft p-7 settle hover:bg-mome-forest-soft/80"
            >
              <div className="font-display text-mome-mint text-xl tracking-tight tabular">
                {step.n}
              </div>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-mome-cream/75 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-card border border-mome-mint/20 bg-mome-forest-soft/50 p-8 sm:p-10">
          <p className="font-display text-2xl sm:text-3xl tracking-tight max-w-3xl">
            <span className="text-mome-mint">&ldquo;</span>
            We don&apos;t lie about the chains. We just don&apos;t make you do
            their homework.
            <span className="text-mome-mint">&rdquo;</span>
          </p>
          <p className="mt-4 text-sm text-mome-cream/60 uppercase tracking-wide">
            — The Mome principle
          </p>
        </div>
      </div>
    </section>
  );
}
