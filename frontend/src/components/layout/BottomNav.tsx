import { NavLink } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";
import {
  ScannerIcon,
  HistoryIcon,
  VaultIcon,
  TipsIcon,
  SettingsIcon,
} from "@/components/icons/TabIcons";

export default function BottomNav() {
  const { language } = useApp();
  const t = translations[language];

  const navItems = [
    { to: "/", icon: ScannerIcon, label: t.scanner },
    { to: "/history", icon: HistoryIcon, label: t.history },
    { to: "/vault", icon: VaultIcon, label: t.vault },
    { to: "/tips", icon: TipsIcon, label: t.tips },
    { to: "/settings", icon: SettingsIcon, label: t.settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-border/50 backdrop-blur-2xl bottom-nav-safe">
      <div className="container mx-auto px-1 sm:px-2">
        <div className="flex items-center justify-around py-1.5 sm:py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl transition-all duration-300 touch-target relative group",
                  "min-w-[56px] sm:min-w-[64px]",
                  isActive
                    ? "scale-105"
                    : "opacity-70 hover:opacity-100 active:scale-95",
                )
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                  )}

                  {/* Icon container with glow effect */}
                  <div
                    className={cn(
                      "relative transition-all duration-300",
                      isActive && "animate-bounce-subtle",
                    )}
                  >
                    <item.icon
                      isActive={isActive}
                      className={cn(
                        "transition-all duration-300",
                        isActive
                          ? "scale-110"
                          : "group-hover:scale-105 group-active:scale-95",
                      )}
                    />
                    {isActive && (
                      <>
                        <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full scale-150 animate-pulse" />
                        <div
                          className="absolute -inset-1 border border-primary/20 rounded-full animate-ping"
                          style={{ animationDuration: "2s" }}
                        />
                      </>
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[9px] sm:text-[10px] font-medium transition-all duration-300 text-center leading-tight",
                      isActive
                        ? "text-primary font-semibold"
                        : "text-muted-foreground group-hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Ripple effect on tap (mobile) */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl transition-opacity duration-300",
                      isActive
                        ? "bg-primary/5"
                        : "bg-transparent group-active:bg-primary/10",
                    )}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
    </nav>
  );
}
