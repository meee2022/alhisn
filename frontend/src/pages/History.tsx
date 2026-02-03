import {
  History as HistoryIcon,
  Trash2,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { formatDate } from "@/lib/scanner";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
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

export default function History() {
  const { language, scanHistory, clearHistory } = useApp();
  const t = translations[language];
  const isRTL = language === "ar";

  const handleClearHistory = () => {
    clearHistory();
    toast.success(isRTL ? "تم مسح السجل بنجاح" : "History cleared successfully");
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return <CheckCircle2 className="w-5 h-5 text-[#00ff64]" />;
      case "suspicious":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "dangerous":
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Shield className="w-5 h-5 text-[#00ff64]" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "text-[#00ff64]";
      case "suspicious":
        return "text-yellow-400";
      case "dangerous":
        return "text-red-400";
      default:
        return "text-[#00ff64]";
    }
  };

  const getRiskBg = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return "bg-[#00ff64]/10 border-[#00ff64]/30";
      case "suspicious":
        return "bg-yellow-400/10 border-yellow-400/30";
      case "dangerous":
        return "bg-red-400/10 border-red-400/30";
      default:
        return "bg-[#00ff64]/10 border-[#00ff64]/30";
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 pb-6">
        {/* Header */}
        <div className="text-center pt-4 mb-6">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-[#00ff64]/20 blur-xl" />
            <div className="absolute inset-0 rounded-full bg-[#00ff64]/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-[#00ff64]" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,100,0.6))' }} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#00ff64] mb-2">
            {isRTL ? "سجل الفحوصات" : "Scan History"}
          </h1>
          <p className="text-[#00ff64]/60 text-sm">
            {scanHistory.length} {isRTL ? "عنصر مفحوص" : "items scanned"}
          </p>
        </div>

        {/* Clear Button */}
        {scanHistory.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="w-full glass-panel p-3 mb-4 flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 transition-colors">
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">{isRTL ? "مسح السجل" : "Clear History"}</span>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="glass-panel border-[#00ff64]/20 max-w-[90vw] sm:max-w-md mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-[#00ff64]">
                  {isRTL ? "تأكيد المسح" : "Confirm Clear"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-[#00ff64]/60">
                  {isRTL 
                    ? "لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع سجلات الفحص نهائياً."
                    : "This action cannot be undone. All scan records will be permanently deleted."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                <AlertDialogCancel className="glass-panel border-[#00ff64]/30 text-[#00ff64] hover:bg-[#00ff64]/10">
                  {isRTL ? "إلغاء" : "Cancel"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleClearHistory}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  {isRTL ? "تأكيد" : "Confirm"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Empty State */}
        {scanHistory.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 rounded-full bg-[#00ff64]/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-12 h-12 text-[#00ff64]/30" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {isRTL ? "لا يوجد سجل فحوصات" : "No Scan History"}
            </h3>
            <p className="text-[#00ff64]/50 text-sm">
              {isRTL ? "ابدأ بفحص رابطك الأول!" : "Start by scanning your first link!"}
            </p>
          </div>
        ) : (
          /* History List */
          <div className="space-y-3">
            {scanHistory.map((scan, index) => (
              <div
                key={scan.id}
                className={cn(
                  "glass-panel p-4 border",
                  getRiskBg(scan.riskLevel)
                )}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(scan.riskLevel)}
                    <span className={cn(
                      "text-xs font-bold uppercase px-2 py-1 rounded-full",
                      getRiskBg(scan.riskLevel),
                      getRiskColor(scan.riskLevel)
                    )}>
                      {scan.riskLevel === "safe" && (isRTL ? "آمن" : "Safe")}
                      {scan.riskLevel === "suspicious" && (isRTL ? "مشبوه" : "Suspicious")}
                      {scan.riskLevel === "dangerous" && (isRTL ? "خطير" : "Dangerous")}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenLink(scan.url)}
                    disabled={scan.riskLevel === "dangerous"}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                      scan.riskLevel === "dangerous" 
                        ? "bg-[#00ff64]/5 text-[#00ff64]/30 cursor-not-allowed"
                        : "bg-[#00ff64]/10 text-[#00ff64] hover:bg-[#00ff64]/20"
                    )}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                {/* URL */}
                <p className="text-sm text-white break-all mb-2 line-clamp-2" dir="ltr">
                  {scan.url}
                </p>

                {/* Time */}
                <div className="flex items-center gap-1 text-[#00ff64]/50 text-xs mb-3">
                  <HistoryIcon className="w-3 h-3" />
                  <span>{formatDate(scan.timestamp, language)}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2">
                  <div className={cn(
                    "rounded-lg p-2 text-center border",
                    scan.details.phishing 
                      ? "bg-red-500/10 border-red-500/30" 
                      : "bg-[#00ff64]/10 border-[#00ff64]/30"
                  )}>
                    <div className="text-[10px] text-[#00ff64]/60 mb-1">
                      {isRTL ? "تصيد" : "Phishing"}
                    </div>
                    <div className={cn(
                      "text-xs font-bold",
                      scan.details.phishing ? "text-red-400" : "text-[#00ff64]"
                    )}>
                      {scan.details.phishing ? (isRTL ? "نعم" : "Yes") : (isRTL ? "لا" : "No")}
                    </div>
                  </div>

                  <div className={cn(
                    "rounded-lg p-2 text-center border",
                    scan.details.malware 
                      ? "bg-red-500/10 border-red-500/30" 
                      : "bg-[#00ff64]/10 border-[#00ff64]/30"
                  )}>
                    <div className="text-[10px] text-[#00ff64]/60 mb-1">
                      {isRTL ? "ضار" : "Malware"}
                    </div>
                    <div className={cn(
                      "text-xs font-bold",
                      scan.details.malware ? "text-red-400" : "text-[#00ff64]"
                    )}>
                      {scan.details.malware ? (isRTL ? "نعم" : "Yes") : (isRTL ? "لا" : "No")}
                    </div>
                  </div>

                  <div className={cn(
                    "rounded-lg p-2 text-center border",
                    scan.details.ssl 
                      ? "bg-[#00ff64]/10 border-[#00ff64]/30" 
                      : "bg-red-500/10 border-red-500/30"
                  )}>
                    <div className="text-[10px] text-[#00ff64]/60 mb-1">SSL</div>
                    <div className={cn(
                      "text-xs font-bold",
                      scan.details.ssl ? "text-[#00ff64]" : "text-red-400"
                    )}>
                      {scan.details.ssl ? (isRTL ? "نعم" : "Yes") : (isRTL ? "لا" : "No")}
                    </div>
                  </div>

                  <div className="rounded-lg p-2 text-center border bg-[#00ff64]/10 border-[#00ff64]/30">
                    <div className="text-[10px] text-[#00ff64]/60 mb-1">
                      {isRTL ? "النتيجة" : "Score"}
                    </div>
                    <div className={cn("text-xs font-bold", getRiskColor(scan.riskLevel))}>
                      {scan.details.reputation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
