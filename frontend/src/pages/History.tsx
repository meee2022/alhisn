import {
  History as HistoryIcon,
  Trash2,
  ExternalLink,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { getRiskColor, getRiskBgColor, formatDate } from "@/lib/scanner";
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

  const handleClearHistory = () => {
    clearHistory();
    toast.success("تم مسح السجل بنجاح");
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "safe":
        return (
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        );
      case "suspicious":
        return (
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
        );
      case "dangerous":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />;
      default:
        return <Shield className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        <Card className="glass-panel safe-padding">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <HistoryIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary neon-glow" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  {t.historyTitle}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {scanHistory.length}{" "}
                  {scanHistory.length === 1 ? "عنصر" : t.itemsScanned}
                </p>
              </div>
            </div>

            {scanHistory.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-panel-hover gap-2 w-full sm:w-auto touch-target text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
                  >
                    <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{t.clearAll}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glass-panel border-border max-w-[90vw] sm:max-w-md">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base sm:text-lg">
                      {t.clearHistoryConfirm}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-xs sm:text-sm">
                      لا يمكن التراجع عن هذا الإجراء. سيتم حذف جميع سجلات الفحص
                      نهائياً.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel className="glass-panel-hover w-full sm:w-auto touch-target m-0">
                      {t.cancel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearHistory}
                      className="bg-destructive hover:bg-destructive/90 w-full sm:w-auto touch-target m-0"
                    >
                      {t.confirm}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>

          {scanHistory.length === 0 ? (
            <div className="text-center py-12 sm:py-16 space-y-4">
              <div className="relative inline-block">
                <Shield className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-muted-foreground/30 mx-auto" />
                <div className="absolute inset-0 bg-muted-foreground/10 blur-2xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
                  {t.noHistory}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground px-4">
                  {t.noHistoryDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 scroll-optimized">
              {scanHistory.map((scan, index) => (
                <Card
                  key={scan.id}
                  className={cn(
                    "glass-panel p-3 sm:p-4 border-2 transition-all duration-300 card-shine",
                    getRiskBgColor(scan.riskLevel),
                    "hover:scale-[1.01]",
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: "fadeInUp 0.3s ease-out forwards",
                  }}
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getRiskIcon(scan.riskLevel)}
                          <span
                            className={cn(
                              "text-[10px] sm:text-xs font-bold uppercase px-2 py-0.5 rounded-full",
                              getRiskColor(scan.riskLevel),
                              "bg-current/10 border border-current/20",
                            )}
                          >
                            {t[scan.riskLevel]}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground break-all mb-1.5 line-clamp-2">
                          {scan.url}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground/60 flex items-center gap-1">
                          <HistoryIcon className="w-3 h-3" />
                          {formatDate(scan.timestamp, language)}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenLink(scan.url)}
                        disabled={scan.riskLevel === "dangerous"}
                        className="shrink-0 h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-primary/10"
                        title={
                          scan.riskLevel === "dangerous"
                            ? "رابط خطير - لا يُنصح بفتحه"
                            : "فتح الرابط"
                        }
                      >
                        <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                      <div
                        className={cn(
                          "glass-panel rounded-lg p-1.5 sm:p-2 border transition-colors",
                          scan.details.phishing
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-emerald-500/10 border-emerald-500/30",
                        )}
                      >
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground mb-0.5 font-medium">
                          Phishing
                        </div>
                        <div
                          className={cn(
                            "text-xs sm:text-sm font-bold",
                            scan.details.phishing
                              ? "text-red-400"
                              : "text-emerald-400",
                          )}
                        >
                          {scan.details.phishing ? "نعم" : "لا"}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "glass-panel rounded-lg p-1.5 sm:p-2 border transition-colors",
                          scan.details.malware
                            ? "bg-red-500/10 border-red-500/30"
                            : "bg-emerald-500/10 border-emerald-500/30",
                        )}
                      >
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground mb-0.5 font-medium">
                          Malware
                        </div>
                        <div
                          className={cn(
                            "text-xs sm:text-sm font-bold",
                            scan.details.malware
                              ? "text-red-400"
                              : "text-emerald-400",
                          )}
                        >
                          {scan.details.malware ? "نعم" : "لا"}
                        </div>
                      </div>

                      <div
                        className={cn(
                          "glass-panel rounded-lg p-1.5 sm:p-2 border transition-colors",
                          scan.details.ssl
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-red-500/10 border-red-500/30",
                        )}
                      >
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground mb-0.5 font-medium">
                          SSL
                        </div>
                        <div
                          className={cn(
                            "text-xs sm:text-sm font-bold",
                            scan.details.ssl
                              ? "text-emerald-400"
                              : "text-red-400",
                          )}
                        >
                          {scan.details.ssl ? "نعم" : "لا"}
                        </div>
                      </div>

                      <div className="glass-panel rounded-lg p-1.5 sm:p-2 border border-primary/20 bg-primary/5">
                        <div className="text-[9px] sm:text-[10px] text-muted-foreground mb-0.5 font-medium">
                          النتيجة
                        </div>
                        <div
                          className={cn(
                            "text-xs sm:text-sm font-bold",
                            getRiskColor(scan.riskLevel),
                          )}
                        >
                          {scan.details.reputation}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
