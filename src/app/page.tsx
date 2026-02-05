export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-4">
      <h1 className="font-display text-4xl sm:text-5xl text-brand-primary mb-4 text-center">
        Corgi Clicker
      </h1>
      <p className="font-body text-text-secondary text-lg mb-8 text-center">
        Click the corgi. You know you want to.
      </p>

      {/* Placeholder corgi area */}
      <div className="w-48 h-48 sm:w-64 sm:h-64 bg-bg-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-orange transition-shadow cursor-pointer animate-breathe">
        <span className="text-6xl">🐕</span>
      </div>

      {/* Currency display placeholder */}
      <div className="mt-8 bg-bg-secondary rounded-2xl px-6 py-3 shadow-md">
        <span className="font-accent text-3xl text-currency-gold">$0</span>
      </div>

      {/* Navigation placeholder */}
      <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t-2 border-brand-primary/20 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button className="flex flex-col items-center text-text-secondary hover:text-brand-primary transition-colors">
            <span className="text-2xl">🛒</span>
            <span className="text-xs font-body">Shop</span>
          </button>
          <button className="flex flex-col items-center text-text-secondary hover:text-brand-primary transition-colors">
            <span className="text-2xl">🏆</span>
            <span className="text-xs font-body">Achievements</span>
          </button>
          <button className="flex flex-col items-center text-text-secondary hover:text-brand-primary transition-colors">
            <span className="text-2xl">📊</span>
            <span className="text-xs font-body">Stats</span>
          </button>
          <button className="flex flex-col items-center text-text-secondary hover:text-brand-primary transition-colors">
            <span className="text-2xl">⚙️</span>
            <span className="text-xs font-body">Settings</span>
          </button>
        </div>
      </nav>
    </main>
  );
}
