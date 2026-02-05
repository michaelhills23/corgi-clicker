import Link from "next/link";

export default function StatsPage() {
  return (
    <main className="min-h-screen bg-bg-primary p-4 pb-24">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-brand-primary font-body font-semibold hover:underline"
        >
          ← Back
        </Link>
        <h1 className="font-display text-2xl text-text-primary">Stats</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Stats cards */}
      <div className="space-y-4">
        <section className="bg-bg-secondary rounded-2xl p-4 shadow-md">
          <h2 className="font-display text-lg text-text-primary mb-3">
            All Time
          </h2>
          <div className="space-y-2">
            <StatRow label="Total Clicks" value="0" />
            <StatRow label="Total Earned" value="$0" />
            <StatRow label="Time Played" value="0h 0m" />
            <StatRow label="Highest Click" value="$1" />
          </div>
        </section>

        <section className="bg-bg-secondary rounded-2xl p-4 shadow-md">
          <h2 className="font-display text-lg text-text-primary mb-3">
            Prestige
          </h2>
          <div className="space-y-2">
            <StatRow label="Prestige Level" value="0" />
            <StatRow label="Permanent Bonus" value="+0%" />
          </div>
        </section>

        <section className="bg-bg-secondary rounded-2xl p-4 shadow-md">
          <h2 className="font-display text-lg text-text-primary mb-3">
            Fun Stats
          </h2>
          <div className="space-y-2">
            <StatRow label="Gas Released" value="0.0000000 L" highlight />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="font-body text-text-secondary">{label}</span>
      <span
        className={`font-accent text-lg ${
          highlight ? "text-fart-cloud" : "text-text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
