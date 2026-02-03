import { useState } from "react";
import {
  Lightbulb,
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

export default function Tips() {
  const { language } = useApp();
  const t = translations[language];
  const isRTL = language === "ar";
  
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const tipCategories = [
    {
      id: "phishing",
      icon: Shield,
      title: isRTL ? "نصائح ضد التصيد" : "Anti-Phishing Tips",
      subtitle: isRTL ? "احمِ نفسك من محاولات الاحتيال" : "Protect yourself from scam attempts",
      tips: isRTL
        ? [
            {
              title: "تحقق من عنوان URL بعناية",
              content: 'تحقق دائماً من عنوان الموقع في شريط المتصفح. احذر من الأخطاء الإملائية الدقيقة مثل "g00gle.com" بدلاً من "google.com".',
            },
            {
              title: "ابحث عن شهادة SSL",
              content: 'تأكد من أن الموقع يبدأ بـ "https://" وليس "http://". رمز القفل في شريط العنوان يعني أن الاتصال مشفر.',
            },
            {
              title: "لا تثق في الرسائل العاجلة",
              content: 'رسائل التصيد غالباً تخلق شعوراً بالاستعجال: "حسابك سيُغلق!" أو "اربح جائزة الآن!". خذ وقتك في التحقق.',
            },
            {
              title: "تحقق من المرسل",
              content: "انظر بعناية إلى عنوان البريد الإلكتروني للمرسل. البنوك والشركات الحقيقية لن تطلب معلومات حساسة عبر البريد.",
            },
          ]
        : [
            {
              title: "Check the URL Carefully",
              content: 'Always verify the website address in your browser bar. Watch for subtle misspellings like "g00gle.com" instead of "google.com".',
            },
            {
              title: "Look for SSL Certificate",
              content: 'Make sure the site starts with "https://" not "http://". The padlock icon in the address bar means the connection is encrypted.',
            },
            {
              title: "Don't Trust Urgent Messages",
              content: 'Phishing messages often create urgency: "Your account will be closed!" or "Win a prize now!". Take time to verify.',
            },
            {
              title: "Verify the Sender",
              content: "Look carefully at the email address of the sender. Real banks and companies won't ask for sensitive information via email.",
            },
          ],
    },
    {
      id: "malware",
      icon: AlertTriangle,
      title: isRTL ? "نصائح ضد البرامج الضارة" : "Anti-Malware Tips",
      subtitle: isRTL ? "حافظ على جهازك آمناً" : "Keep your device safe",
      tips: isRTL
        ? [
            {
              title: "لا تنقر على الروابط المشبوهة",
              content: "تجنب النقر على الروابط في رسائل البريد الإلكتروني أو الرسائل النصية غير المتوقعة، حتى لو بدت من مصدر موثوق.",
            },
            {
              title: "احذر من التنزيلات المجانية",
              content: "البرامج المجانية من مصادر غير معروفة غالباً تحتوي على برامج ضارة. حمّل فقط من المواقع الرسمية.",
            },
            {
              title: "حدّث برامجك باستمرار",
              content: "حافظ على تحديث نظام التشغيل والمتصفح وبرامج مكافحة الفيروسات. التحديثات تصلح الثغرات الأمنية.",
            },
            {
              title: "استخدم برامج مكافحة فيروسات",
              content: "ثبّت برنامج مكافحة فيروسات موثوق وحافظ على تفعيله. فحص الملفات المحملة قبل فتحها.",
            },
          ]
        : [
            {
              title: "Don't Click Suspicious Links",
              content: "Avoid clicking links in unexpected emails or text messages, even if they appear to be from a trusted source.",
            },
            {
              title: "Beware of Free Downloads",
              content: "Free software from unknown sources often contains malware. Only download from official websites.",
            },
            {
              title: "Keep Software Updated",
              content: "Keep your operating system, browser, and antivirus software updated. Updates fix security vulnerabilities.",
            },
            {
              title: "Use Antivirus Software",
              content: "Install trusted antivirus software and keep it active. Scan downloaded files before opening them.",
            },
          ],
    },
    {
      id: "privacy",
      icon: Lock,
      title: isRTL ? "نصائح الخصوصية" : "Privacy Tips",
      subtitle: isRTL ? "حافظ على بياناتك الشخصية" : "Keep your personal data safe",
      tips: isRTL
        ? [
            {
              title: "استخدم كلمات مرور قوية",
              content: "أنشئ كلمات مرور فريدة لكل حساب. استخدم مزيجاً من الأحرف الكبيرة والصغيرة والأرقام والرموز.",
            },
            {
              title: "فعّل المصادقة الثنائية",
              content: "استخدم المصادقة الثنائية (2FA) كلما أمكن. هذا يضيف طبقة أمان إضافية لحساباتك.",
            },
            {
              title: "احذر من شبكات Wi-Fi العامة",
              content: "تجنب الوصول إلى معلومات حساسة على شبكات Wi-Fi العامة. استخدم VPN للحماية الإضافية.",
            },
            {
              title: "راجع أذونات التطبيقات",
              content: "راجع بانتظام ما هي البيانات التي تسمح للتطبيقات بالوصول إليها. امنح فقط الأذونات الضرورية.",
            },
          ]
        : [
            {
              title: "Use Strong Passwords",
              content: "Create unique passwords for each account. Use a mix of uppercase, lowercase, numbers, and symbols.",
            },
            {
              title: "Enable Two-Factor Authentication",
              content: "Use two-factor authentication (2FA) whenever possible. This adds an extra layer of security to your accounts.",
            },
            {
              title: "Be Careful on Public Wi-Fi",
              content: "Avoid accessing sensitive information on public Wi-Fi networks. Use a VPN for extra protection.",
            },
            {
              title: "Review App Permissions",
              content: "Regularly review what data apps are allowed to access. Only grant necessary permissions.",
            },
          ],
    },
    {
      id: "general",
      icon: Eye,
      title: isRTL ? "نصائح عامة" : "General Tips",
      subtitle: isRTL ? "ممارسات أمنية يومية" : "Daily security practices",
      tips: isRTL
        ? [
            {
              title: "ثقّف نفسك باستمرار",
              content: "ابقَ على اطلاع بأحدث تهديدات الأمن السيبراني. المعرفة هي أفضل دفاع.",
            },
            {
              title: "اصنع نسخاً احتياطية",
              content: "اصنع نسخاً احتياطية منتظمة لبياناتك المهمة. هذا يحميك من فقدان البيانات.",
            },
            {
              title: "استخدم حدسك",
              content: "إذا بدا شيء ما مشبوهاً، فهو غالباً كذلك. ثق بحدسك وتحقق قبل المتابعة.",
            },
            {
              title: "أبلغ عن الأنشطة المشبوهة",
              content: "إذا واجهت محاولة تصيد أو رابط مشبوه، أبلغ عنه للسلطات المختصة.",
            },
          ]
        : [
            {
              title: "Educate Yourself Continuously",
              content: "Stay informed about the latest cybersecurity threats. Knowledge is your best defense.",
            },
            {
              title: "Backup Your Data",
              content: "Regularly backup your important data. This protects you from data loss.",
            },
            {
              title: "Trust Your Instincts",
              content: "If something seems suspicious, it probably is. Trust your gut and verify before proceeding.",
            },
            {
              title: "Report Suspicious Activity",
              content: "If you encounter a phishing attempt or suspicious link, report it to the appropriate authorities.",
            },
          ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    setExpandedTip(null);
  };

  const toggleTip = (tipId: string) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pb-6">
        {/* Header */}
        <div className="text-center pt-4 mb-6">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-[#00ff64]/20 blur-2xl" />
            <div 
              className="absolute inset-0 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(0,255,100,0.3) 0%, transparent 70%)',
              }}
            >
              <Lightbulb className="w-10 h-10 text-[#00ff64]" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,100,0.8))' }} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#00ff64] mb-2">
            {isRTL ? "نصائح الأمان" : "Security Tips"}
          </h1>
          <p className="text-[#00ff64]/60 text-sm">
            {isRTL ? "تعلّم كيف تحمي نفسك من الروابط الضارة" : "Learn how to protect yourself from harmful links"}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="glass-panel p-4 mb-6 flex items-center justify-around">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00ff64]">16</div>
            <div className="text-xs text-[#00ff64]/60">{isRTL ? "نصيحة" : "Tips"}</div>
          </div>
          <div className="w-px h-10 bg-[#00ff64]/20" />
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00ff64]">4</div>
            <div className="text-xs text-[#00ff64]/60">{isRTL ? "فئات" : "Categories"}</div>
          </div>
          <div className="w-px h-10 bg-[#00ff64]/20" />
          <div className="text-center">
            <div className="flex items-center gap-1">
              <Sparkles className="w-5 h-5 text-[#00ff64]" />
            </div>
            <div className="text-xs text-[#00ff64]/60">{isRTL ? "محدّث" : "Updated"}</div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {tipCategories.map((category, categoryIndex) => {
            const isExpanded = expandedCategory === category.id;
            const IconComponent = category.icon;
            
            return (
              <div key={category.id} className="glass-panel overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 flex items-center gap-3 hover:bg-[#00ff64]/5 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#00ff64]/10 flex items-center justify-center flex-shrink-0 border border-[#00ff64]/20">
                    <IconComponent className="w-6 h-6 text-[#00ff64]" />
                  </div>
                  <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
                    <h3 className="text-white font-semibold">{category.title}</h3>
                    <p className="text-[#00ff64]/50 text-xs">{category.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#00ff64]/60 bg-[#00ff64]/10 px-2 py-1 rounded-full">
                      {category.tips.length}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-[#00ff64]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#00ff64]/60" />
                    )}
                  </div>
                </button>

                {/* Tips List */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-2">
                    {category.tips.map((tip, tipIndex) => {
                      const tipId = `${category.id}-${tipIndex}`;
                      const isTipExpanded = expandedTip === tipId;
                      
                      return (
                        <div 
                          key={tipIndex}
                          className="bg-[#051005] rounded-xl border border-[#00ff64]/10 overflow-hidden"
                        >
                          <button
                            onClick={() => toggleTip(tipId)}
                            className="w-full p-3 flex items-center gap-3 hover:bg-[#00ff64]/5 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#00ff64]/20 flex items-center justify-center flex-shrink-0 text-[#00ff64] font-bold text-sm">
                              {tipIndex + 1}
                            </div>
                            <span className={cn(
                              "flex-1 text-sm text-white",
                              isRTL ? "text-right" : "text-left"
                            )}>
                              {tip.title}
                            </span>
                            {isTipExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#00ff64]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#00ff64]/40" />
                            )}
                          </button>
                          
                          {isTipExpanded && (
                            <div className="px-4 pb-4">
                              <div className={cn(
                                "p-3 bg-[#00ff64]/5 rounded-lg border-r-2 border-[#00ff64]/40",
                                isRTL ? "border-r-2 border-l-0" : "border-l-2 border-r-0"
                              )}>
                                <p className="text-[#00ff64]/70 text-sm leading-relaxed">
                                  {tip.content}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Reminder */}
        <div className="mt-6 glass-panel p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#00ff64]/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#00ff64]" />
            </div>
            <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
              <h4 className="text-[#00ff64] font-semibold text-sm mb-1">
                {isRTL ? "تذكّر دائماً" : "Always Remember"}
              </h4>
              <p className="text-[#00ff64]/50 text-xs leading-relaxed">
                {isRTL
                  ? "الأمن السيبراني مسؤولية مشتركة. ابقَ متيقظاً وشارك هذه النصائح مع الآخرين."
                  : "Cybersecurity is a shared responsibility. Stay vigilant and share these tips with others."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
