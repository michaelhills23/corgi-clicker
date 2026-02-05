import Link from "next/link";

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-bg-primary p-4 pb-24">
      <header className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="text-brand-primary font-body font-semibold hover:underline"
        >
          ← Back
        </Link>
        <h1 className="font-display text-2xl text-text-primary">Achievements</h1>
        <div className="w-16" /> {/* Spacer for centering */}
      </header>

      {/* Achievement grid placeholder */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {[
          { icon: "💨", name: "First Toot", unlocked: true },
          { icon: "💯", name: "Century", unlocked: false },
          { icon: "🔥", name: "Thousand", unlocked: false },
          { icon: "💰", name: "Millionaire", unlocked: false },
          { icon: "👗", name: "Fashion Icon", unlocked: false },
          { icon: "🐕", name: "Collector", unlocked: false },
          { icon: "💥", name: "Big Tooter", unlocked: false },
          { icon: "🌟", name: "Serial", unlocked: false },
        ].map((achievement) => (
          <div
            key={achievement.name}
            className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 ${
              achievement.unlocked
                ? "bg-bg-secondary shadow-gold"
                : "bg-bg-tertiary opacity-50"
            }`}
          >
            <span className="text-3xl mb-1">
              {achievement.unlocked ? achievement.icon : "🔒"}
            </span>
            <span className="font-body text-xs text-center text-text-secondary">
              {achievement.unlocked ? achievement.name : "???"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
