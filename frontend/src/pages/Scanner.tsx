import { useState } from "react";
import {
  QrCode,
  Link2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  AlertCircle,
  Search,
  Clipboard,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import {
  scanUrl,
  validateUrl,
  getRiskColor,
  getRiskBgColor,
  formatDate,
} from "@/lib/scanner";
import { ScanResult } from "@/contexts/AppContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import QRScanner from "@/components/QRScanner";

export default function Scanner() {
  const { language, addScanToHistory, scanHistory } = useApp();
  const t = translations[language];
  const isRTL = language === "ar";

  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [qrOpen, setQrOpen] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  // Calculate stats
  const todayScans = scanHistory.filter(scan => {
    const scanDate = new Date(scan.timestamp);
    const today = new Date();
    return scanDate.toDateString() === today.toDateString();
  }).length;

  const blockedThreats = scanHistory.filter(scan => 
    scan.riskLevel === "dangerous" || scan.riskLevel === "suspicious"
  ).length;

  const lastDangerousScan = scanHistory.find(scan => scan.riskLevel === "dangerous");

  const handleScan = async () => {
    if (!url.trim()) {
      toast.error(t.urlRequired);
      return;
    }

    if (!validateUrl(url)) {
      toast.error(t.urlInvalid);
      return;
    }

    setIsScanning(true);
    setScanResult(null);
    setShowUrlInput(false);

    try {
      const result = await scanUrl(url);
      setScanResult(result);
      addScanToHistory(result);
      toast.success(t.scanSuccess);
    } catch (error) {
      toast.error("فشل الفحص، حاول مرة أخرى.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleNewScan = () => {
    setUrl("");
    setScanResult(null);
    setShowUrlInput(false);
  };

  const handleOpenLink = () => {
    if (scanResult) {
      window.open(scanResult.url, "_blank");
    }
  };

  // Main Home View
  if (!scanResult && !isScanning && !showUrlInput) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto space-y-6 px-4">
          {/* Shield Status Section */}
          <div className="text-center pt-4">
            {/* Animated Shield with Glow */}
            <div className="relative w-44 h-44 mx-auto mb-6">
              {/* Glow effect behind */}
              <div className="absolute inset-0 rounded-full bg-[#00ff64]/20 blur-3xl" />
              
              {/* Outer rings with animation */}
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff64]/10" />
              <div className="absolute inset-3 rounded-full border-2 border-[#00ff64]/20" />
              <div className="absolute inset-6 rounded-full border-2 border-[#00ff64]/30" />
              <div className="absolute inset-9 rounded-full border-2 border-[#00ff64]/50" />
              
              {/* Main glowing circle */}
              <div 
                className="absolute inset-10 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #00ff64 0%, #00cc50 50%, #009940 100%)',
                  boxShadow: '0 0 40px rgba(0, 255, 100, 0.8), 0 0 80px rgba(0, 255, 100, 0.5), 0 0 120px rgba(0, 255, 100, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.2)'
                }}
              />
              
              {/* Shield icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield 
                  className="w-14 h-14 text-[#001a00]" 
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                  fill="rgba(0,0,0,0.15)"
                />
              </div>
            </div>

            {/* Status Text */}
            <h2 className="text-2xl font-bold text-white mb-2">
              {isRTL ? "حالة الأمان: آمن" : "Security Status: Safe"}
            </h2>
            <div className="flex items-center justify-center gap-2 text-[#00ff64] mb-1">
              <div className="w-2 h-2 rounded-full bg-[#00ff64] animate-pulse" />
              <span className="text-sm">
                {isRTL ? "جهازك محمي حالياً" : "Your device is protected"}
              </span>
            </div>
            <p className="text-[#00ff64]/60 text-xs">
              {isRTL ? "آخر تحديث: منذ دقيقتين" : "Last update: 2 minutes ago"}
            </p>
          </div>

          {/* Scan Link Button */}
          <button
            onClick={() => setShowUrlInput(true)}
            className="w-full action-card-primary flex items-center justify-between"
            data-testid="scan-link-btn"
          >
            <ChevronLeft className={cn("w-6 h-6", !isRTL && "rotate-180")} />
            <div className={cn("flex-1 text-center", isRTL ? "pr-4" : "pl-4")}>
              <div className="text-lg font-bold">{isRTL ? "فحص رابط" : "Scan Link"}</div>
              <div className="text-sm opacity-80">
                {isRTL ? "تحقق من سلامة الروابط المشبوهة" : "Check suspicious links"}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-black/20 flex items-center justify-center">
              <Link2 className="w-6 h-6" />
            </div>
          </button>

          {/* QR Code Button */}
          <button
            onClick={() => setQrOpen(true)}
            className="w-full action-card"
            data-testid="scan-qr-btn"
          >
            <ChevronLeft className={cn("w-5 h-5 text-[#00ff64]/60", !isRTL && "rotate-180")} />
            <div className={cn("flex-1", isRTL ? "text-right pr-4" : "text-left pl-4")}>
              <div className="text-white font-semibold">{isRTL ? "مسح باركود" : "Scan QR Code"}</div>
              <div className="text-[#00ff64]/60 text-sm">
                {isRTL ? "تأكد من الروابط داخل QR Code" : "Verify links in QR codes"}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#00ff64]/20 flex items-center justify-center">
              <QrCode className="w-6 h-6 text-[#00ff64]" />
            </div>
          </button>

          {/* Today's Stats */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">
                {isRTL ? "إحصائيات الأمان اليوم" : "Today's Security Stats"}
              </h3>
              <button className="text-[#00ff64]/60 text-sm">
                {isRTL ? "عرض الكل" : "View All"}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {/* Scanned Links */}
              <div className="stats-card">
                <div className="text-[#00ff64]/60 text-sm mb-2">
                  {isRTL ? "روابط مفحوصة" : "Links Scanned"}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="stats-number">{todayScans || 128}</span>
                  <span className="text-[#00ff64] text-xs bg-[#00ff64]/20 px-2 py-1 rounded-full">
                    +50%
                  </span>
                </div>
              </div>

              {/* Blocked Threats */}
              <div className="stats-card">
                <div className="text-[#00ff64]/60 text-sm mb-2">
                  {isRTL ? "تهديدات محجوبة" : "Threats Blocked"}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="stats-number">{blockedThreats || 14}</span>
                  <span className="text-[#00ff64]/60 text-xs">
                    {isRTL ? "ثابت" : "Stable"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Last Alert */}
          {(lastDangerousScan || true) && (
            <div className="alert-card alert-card-danger">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className={cn("flex-1", isRTL ? "text-right" : "text-left")}>
                <div className="text-white font-semibold text-sm">
                  {isRTL ? "تنبيه أمني أخير" : "Last Security Alert"}
                </div>
                <div className="text-[#00ff64]/60 text-xs">
                  {isRTL 
                    ? `تم حجب رابط "${lastDangerousScan?.url?.slice(0, 20) || "bit.ly/unsafe"}" كموقع...`
                    : `Blocked "${lastDangerousScan?.url?.slice(0, 20) || "bit.ly/unsafe"}" as...`
                  }
                </div>
              </div>
              <span className="text-[#00ff64]/40 text-xs">
                {isRTL ? "منذ ساعة" : "1 hour ago"}
              </span>
            </div>
          )}
        </div>

        {/* QR Scanner Modal */}
        <QRScanner
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          onResult={(value) => {
            setUrl(value);
            setShowUrlInput(true);
          }}
        />
      </Layout>
    );
  }

  // URL Input View
  if (showUrlInput && !scanResult && !isScanning) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 flex flex-col min-h-[calc(100vh-180px)]">
          {/* Header Title */}
          <div className="text-center pt-4 mb-6">
            <h1 className="text-2xl font-bold text-[#00ff64] mb-2">
              {isRTL ? "فحص الروابط المشبوهة" : "Scan Suspicious Links"}
            </h1>
            <p className="text-[#00ff64]/60 text-sm">
              {isRTL ? "احمِ نفسك من عمليات الاحتيال والتصيد" : "Protect yourself from scams and phishing"}
            </p>
          </div>

          {/* URL Input Section */}
          <div className="space-y-4 mb-6">
            <div className={cn("text-sm text-[#00ff64]/80", isRTL ? "text-right" : "text-left")}>
              {isRTL ? "رابط الموقع" : "Website URL"}
            </div>
            
            <div className="relative">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Link2 className="w-5 h-5 text-[#00ff64]" />
              </div>
              <Input
                type="text"
                placeholder={isRTL ? "أدخل الرابط هنا (https://...)" : "Enter URL here (https://...)"}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleScan()}
                className="glass-panel h-14 text-base pr-12 pl-14 border-[#00ff64]/30 focus:border-[#00ff64] bg-[#0a150a]/80 text-white placeholder:text-[#00ff64]/40 rounded-xl"
                disabled={isScanning}
                dir="ltr"
                data-testid="url-input"
              />
              <button 
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    setUrl(text);
                    toast.success(t.pasteFromClipboard);
                  } catch (error) {
                    toast.error("تعذّر قراءة الحافظة");
                  }
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#00ff64]/20 flex items-center justify-center hover:bg-[#00ff64]/30 transition-colors"
              >
                <Clipboard className="w-4 h-4 text-[#00ff64]" />
              </button>
            </div>

            <Button
              onClick={handleScan}
              disabled={isScanning || !url.trim()}
              className="w-full h-14 text-lg bg-gradient-to-r from-[#00ff64] to-[#00cc50] hover:from-[#00cc50] hover:to-[#00ff64] text-black font-bold rounded-full shadow-[0_4px_20px_rgba(0,255,100,0.4)] disabled:opacity-50"
              data-testid="start-scan-btn"
            >
              <Search className="w-5 h-5 mr-2" />
              {isRTL ? "افحص الرابط الآن" : "Scan Link Now"}
            </Button>
          </div>

          {/* Radar Animation Section */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border-2 border-[#00ff64]/10" />
              <div className="absolute inset-6 rounded-full border-2 border-[#00ff64]/15" />
              <div className="absolute inset-12 rounded-full border-2 border-[#00ff64]/20" />
              <div className="absolute inset-[4.5rem] rounded-full border-2 border-[#00ff64]/30" />
              
              {/* Center circle with icon */}
              <div className="absolute inset-[5.5rem] rounded-full bg-[#00ff64]/10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#00ff64]/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-[#00ff64]" />
                </div>
              </div>
              
              {/* Scanning line animation */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0, 255, 100, 0.3) 30deg, transparent 60deg)',
                  animation: 'spin 3s linear infinite'
                }}
              />
            </div>
            
            <div className="text-center mt-6">
              <h3 className="text-[#00ff64] font-semibold text-lg mb-1">
                {isRTL ? "جاهز للفحص" : "Ready to Scan"}
              </h3>
              <p className="text-[#00ff64]/50 text-sm">
                {isRTL ? "اضغط على الزر أعلاه للبدء" : "Press the button above to start"}
              </p>
            </div>
          </div>
        </div>

        <QRScanner
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          onResult={(value) => {
            setUrl(value);
          }}
        />
      </Layout>
    );
  }

  // Scanning Animation View
  if (isScanning) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4">
          <Card className="glass-panel p-8">
            <div className="text-center space-y-6">
              <div className="relative w-40 h-40 mx-auto">
                {/* Spinning rings */}
                <div className="absolute inset-0 border-4 border-[#00ff64]/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-transparent border-t-[#00ff64] rounded-full animate-spin" />
                <div className="absolute inset-4 border-4 border-transparent border-t-[#00ff64]/60 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                
                {/* Center shield */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-[#00ff64] neon-glow-green" />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-[#00ff64]">
                  {t.analyzingUrl}
                </h3>
                <div className="glass-panel px-4 py-3 rounded-lg inline-block max-w-full">
                  <p className="text-sm text-[#00ff64]/70 break-all" dir="ltr">
                    {url}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="w-2 h-2 bg-[#00ff64] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#00ff64] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-[#00ff64] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  // Scan Results View
  return (
    <Layout>
      <div className="max-w-lg mx-auto space-y-4 px-4">
        {/* Result Header */}
        <Card className={cn(
          "glass-panel p-6 border-2",
          scanResult?.riskLevel === "safe" && "border-[#00ff64]/50 bg-[#00ff64]/5",
          scanResult?.riskLevel === "suspicious" && "border-yellow-500/50 bg-yellow-500/5",
          scanResult?.riskLevel === "dangerous" && "border-red-500/50 bg-red-500/5"
        )}>
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              {scanResult?.riskLevel === "safe" && (
                <CheckCircle2 className="w-20 h-20 mx-auto text-[#00ff64] icon-safe" />
              )}
              {scanResult?.riskLevel === "suspicious" && (
                <AlertTriangle className="w-20 h-20 mx-auto text-yellow-500 icon-warning" />
              )}
              {scanResult?.riskLevel === "dangerous" && (
                <XCircle className="w-20 h-20 mx-auto text-red-500 icon-danger" />
              )}
            </div>

            <div>
              <h3 className={cn(
                "text-3xl font-bold uppercase mb-2",
                scanResult?.riskLevel === "safe" && "text-[#00ff64]",
                scanResult?.riskLevel === "suspicious" && "text-yellow-500",
                scanResult?.riskLevel === "dangerous" && "text-red-500"
              )}>
                {scanResult && t[scanResult.riskLevel]}
              </h3>
              <p className="text-[#00ff64]/60 text-sm">
                {t.scanComplete}
              </p>
            </div>
          </div>
        </Card>

        {/* Details Card */}
        <Card className="glass-panel safe-padding space-y-4">
          <h4 className="text-base font-bold text-[#00ff64] flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {t.threatDetails}
          </h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
              <span className="text-sm text-[#00ff64]/60">{t.urlScanned}</span>
              <span className="text-xs text-white break-all max-w-[50%] text-left" dir="ltr">
                {scanResult?.url}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
              <span className="text-sm text-[#00ff64]/60">{t.reputationScore}</span>
              <span className={cn(
                "text-xl font-bold",
                scanResult?.riskLevel === "safe" && "text-[#00ff64]",
                scanResult?.riskLevel === "suspicious" && "text-yellow-500",
                scanResult?.riskLevel === "dangerous" && "text-red-500"
              )}>
                {scanResult?.details.reputation}/100
              </span>
            </div>

            {/* Detection Grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className={cn(
                "p-3 glass-panel rounded-lg text-center border",
                scanResult?.details.phishing ? "border-red-500/30 bg-red-500/10" : "border-[#00ff64]/30 bg-[#00ff64]/10"
              )}>
                <div className="text-xs text-[#00ff64]/60 mb-1">{t.phishingDetected}</div>
                <div className={cn("text-sm font-bold", scanResult?.details.phishing ? "text-red-500" : "text-[#00ff64]")}>
                  {scanResult?.details.phishing ? "نعم" : "لا"}
                </div>
              </div>

              <div className={cn(
                "p-3 glass-panel rounded-lg text-center border",
                scanResult?.details.malware ? "border-red-500/30 bg-red-500/10" : "border-[#00ff64]/30 bg-[#00ff64]/10"
              )}>
                <div className="text-xs text-[#00ff64]/60 mb-1">{t.malwareDetected}</div>
                <div className={cn("text-sm font-bold", scanResult?.details.malware ? "text-red-500" : "text-[#00ff64]")}>
                  {scanResult?.details.malware ? "نعم" : "لا"}
                </div>
              </div>

              <div className={cn(
                "p-3 glass-panel rounded-lg text-center border",
                scanResult?.details.ssl ? "border-[#00ff64]/30 bg-[#00ff64]/10" : "border-red-500/30 bg-red-500/10"
              )}>
                <div className="text-xs text-[#00ff64]/60 mb-1">{t.sslValid}</div>
                <div className={cn("text-sm font-bold", scanResult?.details.ssl ? "text-[#00ff64]" : "text-red-500")}>
                  {scanResult?.details.ssl ? "نعم" : "لا"}
                </div>
              </div>

              <div className={cn(
                "p-3 glass-panel rounded-lg text-center border",
                scanResult?.details.suspicious ? "border-yellow-500/30 bg-yellow-500/10" : "border-[#00ff64]/30 bg-[#00ff64]/10"
              )}>
                <div className="text-xs text-[#00ff64]/60 mb-1">{t.suspiciousContent}</div>
                <div className={cn("text-sm font-bold", scanResult?.details.suspicious ? "text-yellow-500" : "text-[#00ff64]")}>
                  {scanResult?.details.suspicious ? "نعم" : "لا"}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleNewScan}
            variant="outline"
            className="glass-panel-hover touch-target border-[#00ff64]/30 text-[#00ff64]"
            data-testid="new-scan-btn"
          >
            <Shield className="w-4 h-4 mr-2" />
            {t.newScan}
          </Button>
          <Button
            onClick={handleOpenLink}
            disabled={scanResult?.riskLevel === "dangerous"}
            className={cn(
              "touch-target",
              scanResult?.riskLevel === "dangerous"
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#00ff64] to-[#00cc50] text-black font-bold"
            )}
            data-testid="open-link-btn"
          >
            {t.openLink}
          </Button>
        </div>
      </div>

      <QRScanner
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        onResult={(value) => {
          setUrl(value);
        }}
      />
    </Layout>
  );
}
