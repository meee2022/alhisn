import {
  Lightbulb,
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export default function Tips() {
  const { language } = useApp();
  const t = translations[language];

  const tipCategories = [
    {
      id: "phishing",
      icon: Shield,
      title: t.phishingTips,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
      glowColor: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
      tips:
        language === "ar"
          ? [
              {
                title: "تحقق من عنوان URL بعناية",
                content:
                  'تحقق دائماً من عنوان الموقع في شريط المتصفح. احذر من الأخطاء الإملائية الدقيقة مثل "g00gle.com" بدلاً من "google.com".',
              },
              {
                title: "ابحث عن شهادة SSL",
                content:
                  'تأكد من أن الموقع يبدأ بـ "https://" وليس "http://". رمز القفل في شريط العنوان يعني أن الاتصال مشفر.',
              },
              {
                title: "لا تثق في الرسائل العاجلة",
                content:
                  'رسائل التصيد غالباً تخلق شعوراً بالاستعجال: "حسابك سيُغلق!" أو "اربح جائزة الآن!". خذ وقتك في التحقق.',
              },
              {
                title: "تحقق من المرسل",
                content:
                  "انظر بعناية إلى عنوان البريد الإلكتروني للمرسل. البنوك والشركات الحقيقية لن تطلب معلومات حساسة عبر البريد.",
              },
            ]
          : [
              {
                title: "Check the URL Carefully",
                content:
                  'Always verify the website address in your browser bar. Watch for subtle misspellings like "g00gle.com" instead of "google.com".',
              },
              {
                title: "Look for SSL Certificate",
                content:
                  'Make sure the site starts with "https://" not "http://". The padlock icon in the address bar means the connection is encrypted.',
              },
              {
                title: "Don't Trust Urgent Messages",
                content:
                  'Phishing messages often create urgency: "Your account will be closed!" or "Win a prize now!". Take time to verify.',
              },
              {
                title: "Verify the Sender",
                content:
                  "Look carefully at the email address of the sender. Real banks and companies won't ask for sensitive information via email.",
              },
            ],
    },
    {
      id: "malware",
      icon: AlertTriangle,
      title: t.malwareTips,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      tips:
        language === "ar"
          ? [
              {
                title: "لا تنقر على الروابط المشبوهة",
                content:
                  "تجنب النقر على الروابط في رسائل البريد الإلكتروني أو الرسائل النصية غير المتوقعة، حتى لو بدت من مصدر موثوق.",
              },
              {
                title: "احذر من التنزيلات المجانية",
                content:
                  "البرامج المجانية من مصادر غير معروفة غالباً تحتوي على برامج ضارة. حمّل فقط من المواقع الرسمية.",
              },
              {
                title: "حدّث برامجك باستمرار",
                content:
                  "حافظ على تحديث نظام التشغيل والمتصفح وبرامج مكافحة الفيروسات. التحديثات تصلح الثغرات الأمنية.",
              },
              {
                title: "استخدم برامج مكافحة فيروسات",
                content:
                  "ثبّت برنامج مكافحة فيروسات موثوق وحافظ على تفعيله. فحص الملفات المحملة قبل فتحها.",
              },
            ]
          : [
              {
                title: "Don't Click Suspicious Links",
                content:
                  "Avoid clicking links in unexpected emails or text messages, even if they appear to be from a trusted source.",
              },
              {
                title: "Beware of Free Downloads",
                content:
                  "Free software from unknown sources often contains malware. Only download from official websites.",
              },
              {
                title: "Keep Software Updated",
                content:
                  "Keep your operating system, browser, and antivirus software updated. Updates fix security vulnerabilities.",
              },
              {
                title: "Use Antivirus Software",
                content:
                  "Install trusted antivirus software and keep it active. Scan downloaded files before opening them.",
              },
            ],
    },
    {
      id: "privacy",
      icon: Lock,
      title: t.privacyTips,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      glowColor: "shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      tips:
        language === "ar"
          ? [
              {
                title: "استخدم كلمات مرور قوية",
                content:
                  "أنشئ كلمات مرور فريدة لكل حساب. استخدم مزيجاً من الأحرف الكبيرة والصغيرة والأرقام والرموز.",
              },
              {
                title: "فعّل المصادقة الثنائية",
                content:
                  "استخدم المصادقة الثنائية (2FA) كلما أمكن. هذا يضيف طبقة أمان إضافية لحساباتك.",
              },
              {
                title: "احذر من شبكات Wi-Fi العامة",
                content:
                  "تجنب الوصول إلى معلومات حساسة على شبكات Wi-Fi العامة. استخدم VPN للحماية الإضافية.",
              },
              {
                title: "راجع أذونات التطبيقات",
                content:
                  "راجع بانتظام ما هي البيانات التي تسمح للتطبيقات بالوصول إليها. امنح فقط الأذونات الضرورية.",
              },
            ]
          : [
              {
                title: "Use Strong Passwords",
                content:
                  "Create unique passwords for each account. Use a mix of uppercase, lowercase, numbers, and symbols.",
              },
              {
                title: "Enable Two-Factor Authentication",
                content:
                  "Use two-factor authentication (2FA) whenever possible. This adds an extra layer of security to your accounts.",
              },
              {
                title: "Be Careful on Public Wi-Fi",
                content:
                  "Avoid accessing sensitive information on public Wi-Fi networks. Use a VPN for extra protection.",
              },
              {
                title: "Review App Permissions",
                content:
                  "Regularly review what data apps are allowed to access. Only grant necessary permissions.",
              },
            ],
    },
    {
      id: "general",
      icon: Eye,
      title: t.generalTips,
      color: "text-lime-400",
      bgColor: "bg-lime-500/10",
      borderColor: "border-lime-500/30",
      glowColor: "shadow-[0_0_20px_rgba(163,230,53,0.3)]",
      tips:
        language === "ar"
          ? [
              {
                title: "ثقّف نفسك باستمرار",
                content:
                  "ابقَ على اطلاع بأحدث تهديدات الأمن السيبراني. المعرفة هي أفضل دفاع.",
              },
              {
                title: "اصنع نسخاً احتياطية",
                content:
                  "اصنع نسخاً احتياطية منتظمة لبياناتك المهمة. هذا يحميك من فقدان البيانات.",
              },
              {
                title: "استخدم حدسك",
                content:
                  "إذا بدا شيء ما مشبوهاً، فهو غالباً كذلك. ثق بحدسك وتحقق قبل المتابعة.",
              },
              {
                title: "أبلغ عن الأنشطة المشبوهة",
                content:
                  "إذا واجهت محاولة تصيد أو رابط مشبوه، أبلغ عنه للسلطات المختصة.",
              },
            ]
          : [
              {
                title: "Educate Yourself Continuously",
                content:
                  "Stay informed about the latest cybersecurity threats. Knowledge is your best defense.",
              },
              {
                title: "Backup Your Data",
                content:
                  "Regularly backup your important data. This protects you from data loss.",
              },
              {
                title: "Trust Your Instincts",
                content:
                  "If something seems suspicious, it probably is. Trust your gut and verify before proceeding.",
              },
              {
                title: "Report Suspicious Activity",
                content:
                  "If you encounter a phishing attempt or suspicious link, report it to the appropriate authorities.",
              },
            ],
    },
  ];

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        <Card className="glass-panel safe-padding">
          <div className="text-center mb-6 sm:mb-8 space-y-3">
            <div className="relative inline-block">
              <Lightbulb className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-primary neon-glow mx-auto animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/30 blur-2xl animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary neon-glow mb-2">
                {t.tipsTitle}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {t.tipsSubtitle}
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 scroll-optimized">
            {tipCategories.map((category, categoryIndex) => (
              <Card
                key={category.id}
                className={cn(
                  "glass-panel p-4 sm:p-5 border-2 transition-all duration-300 card-shine hover:scale-[1.01]",
                  category.borderColor,
                  category.bgColor,
                )}
                style={{
                  animationDelay: `${categoryIndex * 100}ms`,
                  animation: "fade-in-up 0.4s ease-out forwards",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <category.icon
                      className={cn("w-6 h-6 sm:w-7 sm:h-7", category.color)}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 blur-lg opacity-50",
                        category.bgColor,
                      )}
                    />
                  </div>
                  <h3
                    className={cn(
                      "text-base sm:text-lg font-bold",
                      category.color,
                    )}
                  >
                    {category.title}
                  </h3>
                  <div
                    className={cn(
                      "ml-auto text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium",
                      category.bgColor,
                      category.color,
                      "border",
                      category.borderColor,
                    )}
                  >
                    {category.tips.length}{" "}
                    {language === "ar" ? "نصيحة" : "tips"}
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.id}-${index}`}
                      className={cn(
                        "glass-panel rounded-lg border-2 px-3 sm:px-4 transition-all duration-300",
                        "hover:border-current",
                        category.borderColor,
                        "data-[state=open]:bg-current/5",
                      )}
                    >
                      <AccordionTrigger
                        className={cn(
                          "text-xs sm:text-sm font-semibold hover:no-underline py-3 sm:py-3.5",
                          "text-foreground hover:text-current transition-colors",
                          category.color,
                        )}
                      >
                        <div className="flex items-center gap-2 text-left">
                          <div
                            className={cn(
                              "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0",
                              category.bgColor,
                              category.color,
                              "border",
                              category.borderColor,
                            )}
                          >
                            {index + 1}
                          </div>
                          <span>{tip.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs sm:text-sm text-muted-foreground pb-3 sm:pb-4 pt-1 leading-relaxed">
                        <div
                          className={cn(
                            "p-3 rounded-lg mt-2",
                            "bg-background/50 border-l-2",
                            category.borderColor,
                          )}
                        >
                          {tip.content}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            ))}
          </div>

          {/* Footer tip */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-5 glass-panel rounded-lg border-2 border-primary/30 bg-primary/5">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm sm:text-base font-bold text-primary mb-1">
                  {language === "ar" ? "تذكّر دائماً" : "Always Remember"}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {language === "ar"
                    ? "الأمن السيبراني مسؤولية مشتركة. ابقَ متيقظاً، وحدّث معلوماتك، وشارك هذه النصائح مع الآخرين لنشر الوعي الأمني."
                    : "Cybersecurity is a shared responsibility. Stay vigilant, keep informed, and share these tips with others to spread security awareness."}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
