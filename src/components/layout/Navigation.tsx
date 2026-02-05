"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: "/", icon: "🐕", label: "Play" },
  { href: "/shop", icon: "🛒", label: "Shop" },
  { href: "/achievements", icon: "🏆", label: "Awards" },
  { href: "/stats", icon: "📊", label: "Stats" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t-2 border-brand-primary/20 p-3 pb-safe z-30">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-brand-primary scale-110"
                  : "text-text-secondary hover:text-brand-primary hover:scale-105"
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs font-body font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
