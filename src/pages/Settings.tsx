import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Globe,
  Info,
  LogOut,
  UserPlus,
  LogIn,
  Trash2,
  Shield,
  Mail,
  Lock as LockIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { language, setLanguage, user, setUser, isAuthenticated, logout } =
    useApp();
  const t = translations[language];

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast.error(
        language === "ar"
          ? "الرجاء ملء جميع الحقول"
          : "Please fill in all fields",
      );
      return;
    }

    const mockUser = {
      id: Date.now().toString(),
      email: loginForm.email,
      name: loginForm.email.split("@")[0],
    };

    setUser(mockUser);
    setIsLoginDialogOpen(false);
    setLoginForm({ email: "", password: "" });
    toast.success(
      language === "ar" ? "تم تسجيل الدخول بنجاح!" : "Login successful!",
    );
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast.error(
        language === "ar"
          ? "الرجاء ملء جميع الحقول"
          : "Please fill in all fields",
      );
      return;
    }

    const mockUser = {
      id: Date.now().toString(),
      email: signupForm.email,
      name: signupForm.name,
    };

    setUser(mockUser);
    setIsSignupDialogOpen(false);
    setSignupForm({ name: "", email: "", password: "" });
    toast.success(
      language === "ar"
        ? "تم إنشاء الحساب بنجاح!"
        : "Account created successfully!",
    );
  };

  const handleLogout = () => {
    logout();
    toast.success(
      language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully",
    );
  };

  const handleDeleteAccount = () => {
    logout();
    toast.success(language === "ar" ? "تم حذف الحساب" : "Account deleted");
  };

  const handleLanguageChange = (lang: "ar" | "en") => {
    setLanguage(lang);
    toast.success(
      `${language === "ar" ? "تم تغيير اللغة إلى" : "Language changed to"} ${lang === "ar" ? "العربية" : "English"}`,
    );
  };

  const settingsGroups = [
    {
      title: t.accountSettings,
      icon: User,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      items: isAuthenticated
        ? [
            {
              icon: Shield,
              label: user?.name || user?.email || "User",
              sublabel: user?.email,
              action: null,
              type: "info",
            },
            {
              icon: LogOut,
              label: t.logout,
              sublabel:
                language === "ar"
                  ? "تسجيل الخروج من حسابك"
                  : "Sign out of your account",
              action: (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-panel-hover gap-2 touch-target text-xs sm:text-sm"
                    >
                      <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{t.logout}</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-panel border-border max-w-[90vw] sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base sm:text-lg">
                        {t.logoutConfirm}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-xs sm:text-sm">
                        {language === "ar"
                          ? "ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى خزنتك"
                          : "You will need to login again to access your vault"}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="glass-panel-hover w-full sm:w-auto touch-target m-0">
                        {t.cancel}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-primary hover:bg-primary/90 w-full sm:w-auto touch-target m-0"
                      >
                        {t.confirm}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ),
              type: "action",
            },
            {
              icon: Trash2,
              label: t.deleteAccount,
              sublabel:
                language === "ar"
                  ? "حذف حسابك نهائياً"
                  : "Permanently delete your account",
              action: (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-panel-hover text-destructive border-destructive/30 gap-2 touch-target text-xs sm:text-sm"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{t.delete}</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="glass-panel border-border max-w-[90vw] sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base sm:text-lg text-destructive">
                        {t.deleteAccountConfirm}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-xs sm:text-sm">
                        {language === "ar"
                          ? "لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع بياناتك نهائياً"
                          : "This action cannot be undone. All your data will be permanently deleted"}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="glass-panel-hover w-full sm:w-auto touch-target m-0">
                        {t.cancel}
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive hover:bg-destructive/90 w-full sm:w-auto touch-target m-0"
                      >
                        {t.confirm}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ),
              type: "danger",
            },
          ]
        : [
            {
              icon: User,
              label: t.guestMode,
              sublabel:
                language === "ar"
                  ? "أنت تستخدم التطبيق كضيف"
                  : "You are using the app as a guest",
              action: null,
              type: "info",
            },
            {
              icon: LogIn,
              label: t.login,
              sublabel:
                language === "ar"
                  ? "سجّل دخولك لحفظ بياناتك"
                  : "Sign in to save your data",
              action: (
                <Dialog
                  open={isLoginDialogOpen}
                  onOpenChange={setIsLoginDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 touch-target text-xs sm:text-sm">
                      <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{t.login}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-panel border-border max-w-[95vw] sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">
                        {t.login}
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm">
                        {language === "ar"
                          ? "سجّل دخولك للوصول إلى خزنتك والمزامنة عبر الأجهزة"
                          : "Sign in to access your vault and sync across devices"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          {t.email}
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              email: e.target.value,
                            })
                          }
                          className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
                          <LockIcon className="w-4 h-4 text-primary" />
                          {t.password}
                        </label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({
                              ...loginForm,
                              password: e.target.value,
                            })
                          }
                          className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsLoginDialogOpen(false)}
                        className="glass-panel-hover w-full sm:w-auto touch-target"
                      >
                        {t.cancel}
                      </Button>
                      <Button
                        onClick={handleLogin}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto touch-target"
                      >
                        {t.login}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ),
              type: "action",
            },
            {
              icon: UserPlus,
              label: t.signup,
              sublabel:
                language === "ar"
                  ? "أنشئ حساباً جديداً"
                  : "Create a new account",
              action: (
                <Dialog
                  open={isSignupDialogOpen}
                  onOpenChange={setIsSignupDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="glass-panel-hover gap-2 touch-target text-xs sm:text-sm"
                    >
                      <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{t.signup}</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-panel border-border max-w-[95vw] sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-base sm:text-lg">
                        {t.signup}
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm">
                        {language === "ar"
                          ? "أنشئ حساباً لحفظ بياناتك والمزامنة عبر الأجهزة"
                          : "Create an account to save your data and sync across devices"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          {t.name}
                        </label>
                        <Input
                          type="text"
                          placeholder={language === "ar" ? "اسمك" : "Your Name"}
                          value={signupForm.name}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              name: e.target.value,
                            })
                          }
                          className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          {t.email}
                        </label>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          value={signupForm.email}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              email: e.target.value,
                            })
                          }
                          className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium mb-2 block flex items-center gap-2">
                          <LockIcon className="w-4 h-4 text-primary" />
                          {t.password}
                        </label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          value={signupForm.password}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              password: e.target.value,
                            })
                          }
                          className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsSignupDialogOpen(false)}
                        className="glass-panel-hover w-full sm:w-auto touch-target"
                      >
                        {t.cancel}
                      </Button>
                      <Button
                        onClick={handleSignup}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto touch-target"
                      >
                        {t.signup}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ),
              type: "action",
            },
          ],
    },
    {
      title: t.languageSettings,
      icon: Globe,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      items: [
        {
          icon: Globe,
          label: "العربية",
          sublabel:
            language === "ar"
              ? "استخدام اللغة العربية والتخطيط من اليمين لليسار"
              : "Use Arabic language and RTL layout",
          action: (
            <Button
              variant={language === "ar" ? "default" : "outline"}
              size="sm"
              onClick={() => handleLanguageChange("ar")}
              className={cn(
                "touch-target text-xs sm:text-sm",
                language === "ar"
                  ? "bg-primary text-primary-foreground shadow-glow-primary"
                  : "glass-panel-hover",
              )}
            >
              {language === "ar" ? "✓ نشط" : "اختر"}
            </Button>
          ),
          type: "action",
        },
        {
          icon: Globe,
          label: "English",
          sublabel:
            language === "ar"
              ? "استخدام اللغة الإنجليزية والتخطيط من اليسار لليمين"
              : "Use English language and LTR layout",
          action: (
            <Button
              variant={language === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "touch-target text-xs sm:text-sm",
                language === "en"
                  ? "bg-primary text-primary-foreground shadow-glow-primary"
                  : "glass-panel-hover",
              )}
            >
              {language === "en" ? "✓ Active" : "Select"}
            </Button>
          ),
          type: "action",
        },
      ],
    },
    {
      title: t.aboutApp,
      icon: Info,
      color: "text-lime-400",
      bgColor: "bg-lime-500/10",
      borderColor: "border-lime-500/30",
      items: [
        {
          icon: Shield,
          label: t.appName,
          sublabel: t.description,
          action: null,
          type: "info",
        },
        {
          icon: Info,
          label: t.version,
          sublabel: "1.0.0",
          action: (
            <div className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-mono">
              v1.0.0
            </div>
          ),
          type: "info",
        },
        {
          icon: User,
          label: t.developer,
          sublabel: "SafeLink Security Team",
          action: null,
          type: "info",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        <Card className="glass-panel safe-padding">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="relative">
              <SettingsIcon className="w-7 h-7 sm:w-8 sm:h-8 text-primary neon-glow animate-spin-slow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary neon-glow">
              {t.settingsTitle}
            </h2>
          </div>

          <div className="space-y-5 sm:space-y-6 scroll-optimized">
            {settingsGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="space-y-3"
                style={{
                  animationDelay: `${groupIndex * 100}ms`,
                  animation: "fade-in-up 0.4s ease-out forwards",
                }}
              >
                <div
                  className={cn(
                    "flex items-center gap-2 pb-2 border-b-2",
                    group.borderColor,
                  )}
                >
                  <group.icon
                    className={cn("w-5 h-5 sm:w-6 sm:h-6", group.color)}
                  />
                  <h3
                    className={cn(
                      "text-base sm:text-lg font-semibold",
                      group.color,
                    )}
                  >
                    {group.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {group.items.map((item, itemIndex) => (
                    <Card
                      key={itemIndex}
                      className={cn(
                        "glass-panel p-3 sm:p-4 border-2 transition-all duration-300 card-shine hover:scale-[1.01]",
                        group.borderColor,
                        group.bgColor,
                      )}
                    >
                      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <item.icon
                            className={cn(
                              "w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 shrink-0",
                              group.color,
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm sm:text-base text-foreground truncate">
                              {item.label}
                            </div>
                            <div className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                              {item.sublabel}
                            </div>
                          </div>
                        </div>
                        {item.action && (
                          <div className="shrink-0">{item.action}</div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* App footer */}
          <div className="mt-6 sm:mt-8 pt-6 border-t border-border/50">
            <div className="text-center space-y-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {language === "ar"
                  ? "© 2026 SafeLink. جميع الحقوق محفوظة."
                  : "© 2026 SafeLink. All rights reserved."}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground/60">
                {language === "ar"
                  ? "صُنع بـ ❤️ من أجل أمنك"
                  : "Made with ❤️ for your security"}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
