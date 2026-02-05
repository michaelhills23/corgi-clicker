import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-bg-primary p-4 pb-24">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-brand-primary font-body font-semibold hover:underline"
        >
          ← Back
        </Link>
        <h1 className="font-display text-2xl text-text-primary">Shop</h1>
        <div className="font-accent text-xl text-currency-gold">$0</div>
      </header>

      {/* Tab navigation */}
      <div className="flex gap-2 mb-6">
        {["Upgrades", "Cosmetics", "Corgis"].map((tab) => (
          <button
            key={tab}
            className="flex-1 py-2 px-4 rounded-full font-body font-semibold text-sm bg-bg-secondary text-text-secondary hover:bg-brand-primary hover:text-text-inverse transition-colors"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Placeholder content */}
      <div className="grid gap-4">
        <div className="bg-bg-secondary rounded-2xl p-4 shadow-md">
          <h3 className="font-display text-lg text-text-primary">
            Better Diet
          </h3>
          <p className="font-body text-sm text-text-secondary mb-2">
            +10% per click
          </p>
          <div className="flex justify-between items-center">
            <span className="font-accent text-currency-gold">$10</span>
            <button className="bg-brand-primary text-text-inverse font-body font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
              Buy
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
