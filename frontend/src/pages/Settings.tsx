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
  ChevronLeft,
  Check,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
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
  const { language, setLanguage, user, setUser, isAuthenticated, logout } = useApp();
  const t = translations[language];
  const isRTL = language === "ar";

  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      toast.error(isRTL ? "الرجاء ملء جميع الحقول" : "Please fill in all fields");
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
    toast.success(isRTL ? "تم تسجيل الدخول بنجاح!" : "Login successful!");
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      toast.error(isRTL ? "الرجاء ملء جميع الحقول" : "Please fill in all fields");
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
    toast.success(isRTL ? "تم إنشاء الحساب بنجاح!" : "Account created successfully!");
  };

  const handleLogout = () => {
    logout();
    toast.success(isRTL ? "تم تسجيل الخروج بنجاح" : "Logged out successfully");
  };

  const handleDeleteAccount = () => {
    logout();
    toast.success(isRTL ? "تم حذف الحساب" : "Account deleted");
  };

  const handleLanguageChange = (lang: "ar" | "en") => {
    setLanguage(lang);
    toast.success(`${isRTL ? "تم تغيير اللغة إلى" : "Language changed to"} ${lang === "ar" ? "العربية" : "English"}`);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pb-6">
        {/* Header */}
        <div className="text-center pt-4 mb-6">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-[#00ff64]/20 blur-xl" />
            <div className="absolute inset-0 rounded-full bg-[#00ff64]/10 flex items-center justify-center">
              <SettingsIcon className="w-8 h-8 text-[#00ff64]" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,100,0.6))' }} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#00ff64] mb-2">
            {isRTL ? "الإعدادات" : "Settings"}
          </h1>
          <p className="text-[#00ff64]/60 text-sm">
            {isRTL ? "تخصيص تجربتك" : "Customize your experience"}
          </p>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="text-[#00ff64] font-semibold text-sm mb-3 flex items-center gap-2">
            <User className="w-4 h-4" />
            {isRTL ? "الحساب" : "Account"}
          </h3>
          
          {isAuthenticated ? (
            <div className="glass-panel p-4 space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00ff64]/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#00ff64]" />
                </div>
                <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
                  <div className="text-white font-semibold">{user?.name}</div>
                  <div className="text-[#00ff64]/50 text-sm">{user?.email}</div>
                </div>
              </div>

              {/* Logout Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full p-3 rounded-xl bg-[#051005] border border-[#00ff64]/20 flex items-center justify-between hover:bg-[#00ff64]/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5 text-[#00ff64]" />
                      <span className="text-white text-sm">{isRTL ? "تسجيل الخروج" : "Logout"}</span>
                    </div>
                    <ChevronLeft className={cn("w-4 h-4 text-[#00ff64]/50", !isRTL && "rotate-180")} />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-panel border-[#00ff64]/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#00ff64]">{isRTL ? "تأكيد الخروج" : "Confirm Logout"}</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#00ff64]/60">
                      {isRTL ? "ستحتاج لتسجيل الدخول مرة أخرى" : "You will need to login again"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="glass-panel border-[#00ff64]/30 text-[#00ff64]">{isRTL ? "إلغاء" : "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} className="bg-[#00ff64] text-black">{isRTL ? "خروج" : "Logout"}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Delete Account */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-between hover:bg-red-500/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-5 h-5 text-red-400" />
                      <span className="text-red-400 text-sm">{isRTL ? "حذف الحساب" : "Delete Account"}</span>
                    </div>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-panel border-red-500/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-400">{isRTL ? "حذف الحساب نهائياً" : "Delete Account Permanently"}</AlertDialogTitle>
                    <AlertDialogDescription className="text-[#00ff64]/60">
                      {isRTL ? "لا يمكن التراجع عن هذا الإجراء" : "This action cannot be undone"}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="glass-panel border-[#00ff64]/30 text-[#00ff64]">{isRTL ? "إلغاء" : "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-500 text-white">{isRTL ? "حذف" : "Delete"}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <div className="glass-panel p-4 space-y-3">
              {/* Guest Mode Info */}
              <div className="flex items-center gap-3 p-3 bg-[#051005] rounded-xl border border-[#00ff64]/10">
                <div className="w-10 h-10 rounded-full bg-[#00ff64]/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#00ff64]" />
                </div>
                <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
                  <div className="text-white text-sm font-medium">{isRTL ? "وضع الضيف" : "Guest Mode"}</div>
                  <div className="text-[#00ff64]/50 text-xs">{isRTL ? "سجّل دخولك لحفظ بياناتك" : "Sign in to save your data"}</div>
                </div>
              </div>

              {/* Login Button */}
              <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
                <DialogTrigger asChild>
                  <button className="w-full p-3 rounded-xl bg-[#00ff64] text-black font-semibold flex items-center justify-center gap-2">
                    <LogIn className="w-5 h-5" />
                    {isRTL ? "تسجيل الدخول" : "Login"}
                  </button>
                </DialogTrigger>
                <DialogContent className="glass-panel border-[#00ff64]/20">
                  <DialogHeader>
                    <DialogTitle className="text-[#00ff64]">{isRTL ? "تسجيل الدخول" : "Login"}</DialogTitle>
                    <DialogDescription className="text-[#00ff64]/60">
                      {isRTL ? "سجّل دخولك للوصول إلى خزنتك" : "Sign in to access your vault"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder={isRTL ? "البريد الإلكتروني" : "Email"}
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="glass-panel border-[#00ff64]/30 text-white"
                    />
                    <Input
                      type="password"
                      placeholder={isRTL ? "كلمة المرور" : "Password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="glass-panel border-[#00ff64]/30 text-white"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleLogin} className="w-full bg-[#00ff64] text-black font-semibold">
                      {isRTL ? "دخول" : "Login"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Signup Button */}
              <Dialog open={isSignupDialogOpen} onOpenChange={setIsSignupDialogOpen}>
                <DialogTrigger asChild>
                  <button className="w-full p-3 rounded-xl bg-[#051005] border border-[#00ff64]/30 text-[#00ff64] font-semibold flex items-center justify-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    {isRTL ? "إنشاء حساب" : "Create Account"}
                  </button>
                </DialogTrigger>
                <DialogContent className="glass-panel border-[#00ff64]/20">
                  <DialogHeader>
                    <DialogTitle className="text-[#00ff64]">{isRTL ? "إنشاء حساب" : "Create Account"}</DialogTitle>
                    <DialogDescription className="text-[#00ff64]/60">
                      {isRTL ? "أنشئ حساباً لحفظ بياناتك" : "Create an account to save your data"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder={isRTL ? "الاسم" : "Name"}
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                      className="glass-panel border-[#00ff64]/30 text-white"
                    />
                    <Input
                      type="email"
                      placeholder={isRTL ? "البريد الإلكتروني" : "Email"}
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      className="glass-panel border-[#00ff64]/30 text-white"
                    />
                    <Input
                      type="password"
                      placeholder={isRTL ? "كلمة المرور" : "Password"}
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      className="glass-panel border-[#00ff64]/30 text-white"
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSignup} className="w-full bg-[#00ff64] text-black font-semibold">
                      {isRTL ? "إنشاء" : "Create"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Language Section */}
        <div className="mb-6">
          <h3 className="text-[#00ff64] font-semibold text-sm mb-3 flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {isRTL ? "اللغة" : "Language"}
          </h3>
          
          <div className="glass-panel p-4 space-y-2">
            <button
              onClick={() => handleLanguageChange("ar")}
              className={cn(
                "w-full p-3 rounded-xl flex items-center justify-between transition-colors",
                language === "ar" 
                  ? "bg-[#00ff64]/20 border border-[#00ff64]/50" 
                  : "bg-[#051005] border border-[#00ff64]/10 hover:bg-[#00ff64]/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🇸🇦</span>
                <span className="text-white text-sm">العربية</span>
              </div>
              {language === "ar" && <Check className="w-5 h-5 text-[#00ff64]" />}
            </button>

            <button
              onClick={() => handleLanguageChange("en")}
              className={cn(
                "w-full p-3 rounded-xl flex items-center justify-between transition-colors",
                language === "en" 
                  ? "bg-[#00ff64]/20 border border-[#00ff64]/50" 
                  : "bg-[#051005] border border-[#00ff64]/10 hover:bg-[#00ff64]/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🇺🇸</span>
                <span className="text-white text-sm">English</span>
              </div>
              {language === "en" && <Check className="w-5 h-5 text-[#00ff64]" />}
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h3 className="text-[#00ff64] font-semibold text-sm mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            {isRTL ? "حول التطبيق" : "About"}
          </h3>
          
          <div className="glass-panel p-4 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#051005] rounded-xl border border-[#00ff64]/10">
              <div className="w-10 h-10 rounded-xl bg-[#00ff64]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#00ff64]" />
              </div>
              <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
                <div className="text-white text-sm font-medium">{isRTL ? "الحصن" : "Al-Hisn"}</div>
                <div className="text-[#00ff64]/50 text-xs">{isRTL ? "فاحص الروابط الآمن" : "Secure Link Scanner"}</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#051005] rounded-xl border border-[#00ff64]/10">
              <span className="text-[#00ff64]/60 text-sm">{isRTL ? "الإصدار" : "Version"}</span>
              <span className="text-[#00ff64] text-sm font-mono">1.0.0</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#051005] rounded-xl border border-[#00ff64]/10">
              <span className="text-[#00ff64]/60 text-sm">{isRTL ? "المطور" : "Developer"}</span>
              <span className="text-white text-sm">Al-Hisn Team</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="text-[#00ff64]/40 text-xs">
            {isRTL ? "© 2026 الحصن. جميع الحقوق محفوظة." : "© 2026 Al-Hisn. All rights reserved."}
          </p>
          <p className="text-[#00ff64]/30 text-xs mt-1">
            {isRTL ? "صُنع بـ ❤️ من أجل أمنك" : "Made with ❤️ for your security"}
          </p>
        </div>
      </div>
    </Layout>
  );
}
