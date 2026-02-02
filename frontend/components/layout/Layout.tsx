import { ReactNode } from "react";
import { Shield } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import BottomNav from "./BottomNav";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export default function Layout({
  children,
  title,
  showHeader = true,
}: LayoutProps) {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col page-content-safe">
      {showHeader && (
        <header className="glass-panel sticky top-0 z-40 border-b border-border/50 backdrop-blur-2xl pt-safe">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {/* تم حذف صورة الشعار من الهيدر */}
              <div className="text-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary neon-glow tracking-wider">
                  {title || t.appName}
                </h1>
                {!title && (
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">
                    {t.appTagline}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Header bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </header>
      )}

      <main className="flex-1 container mx-auto px-0 sm:px-4 py-4 sm:py-6 scroll-optimized">
        <div className="hw-accelerated">{children}</div>
      </main>

      <BottomNav />
    </div>
  );
}
