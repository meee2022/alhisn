import { useState } from "react";
import {
  QrCode,
  Clipboard,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
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

// استيراد الشعار (تأكد من أن الملف موجود فعلاً بهذا الاسم في src/assets)
import logoHisn from "@/assets/logo.png";

export default function Scanner() {
  const { language, addScanToHistory } = useApp();
  const t = translations[language];

  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [qrOpen, setQrOpen] = useState(false);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      toast.success(t.pasteFromClipboard);
    } catch (error) {
      toast.error("تعذّر قراءة الحافظة");
    }
  };

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
  };

  const handleOpenLink = () => {
    if (scanResult) {
      window.open(scanResult.url, "_blank");
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        {/* Scanner Input */}
        {!scanResult && (
          <Card className="glass-panel safe-padding space-y-5 sm:space-y-6">
            <div className="text-center space-y-3">
              {/* اللوجو + النص أسفله */}
              <div className="logo-wrapper">
                <img
                  src={logoHisn}
                  alt="شعار الحصن"
                  className="mx-auto w-24 sm:w-28 md:w-32 h-auto logo-image"
                />
                <div className="logo-subtitle mt-1">درعك الرقمي</div>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                {t.scannerTitle}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                {t.scannerSubtitle}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t.enterUrl}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleScan()}
                  className="glass-panel h-12 sm:h-14 text-base sm:text-lg px-4 border-primary/30 focus:border-primary"
                  disabled={isScanning}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  onClick={handlePasteFromClipboard}
                  disabled={isScanning}
                  className="glass-panel-hover touch-target gap-2"
                >
                  <Clipboard className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">
                    {t.pasteFromClipboard}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setQrOpen(true)}
                  disabled={isScanning}
                  className="glass-panel-hover touch-target gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{t.scanQRCode}</span>
                </Button>
              </div>

              <Button
                onClick={handleScan}
                disabled={isScanning || !url.trim()}
                className="w-full touch-target text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
              >
                {isScanning ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    {t.scanning}
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    {t.startScan}
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Scanning Animation */}
        {isScanning && (
          <Card className="glass-panel p-6 sm:p-8 md:p-10">
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="relative inline-block">
                <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto relative">
                  <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                  <div className="absolute inset-0 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin" />
                  <Shield className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 neon-glow" />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  {t.analyzingUrl}
                </h3>
                <div className="glass-panel px-3 py-2 sm:px-4 sm:py-3 rounded-lg inline-block max-w-full">
                  <p className="text-xs sm:text-sm text-muted-foreground break-all">
                    {url}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Scan Results */}
        {scanResult && !isScanning && (
          <div className="space-y-4">
            <Card
              className={cn(
                "glass-panel p-6 sm:p-8 border-2",
                getRiskBgColor(scanResult.riskLevel),
              )}
            >
              <div className="text-center space-y-4 sm:space-y-5">
                <div className="relative inline-block">
                  {scanResult.riskLevel === "safe" && (
                    <CheckCircle2
                      className={cn(
                        "w-16 h-16 sm:w-20 sm:h-20 mx-auto icon-safe",
                        getRiskColor(scanResult.riskLevel),
                      )}
                    />
                  )}
                  {scanResult.riskLevel === "suspicious" && (
                    <AlertTriangle
                      className={cn(
                        "w-16 h-16 sm:w-20 sm:h-20 mx-auto icon-warning",
                        getRiskColor(scanResult.riskLevel),
                      )}
                    />
                  )}
                  {scanResult.riskLevel === "dangerous" && (
                    <XCircle
                      className={cn(
                        "w-16 h-16 sm:w-20 sm:h-20 mx-auto icon-danger",
                        getRiskColor(scanResult.riskLevel),
                      )}
                    />
                  )}
                </div>

                <div>
                  <h3
                    className={cn(
                      "text-2xl sm:text-3xl md:text-4xl font-bold uppercase mb-2",
                      getRiskColor(scanResult.riskLevel),
                    )}
                  >
                    {t[scanResult.riskLevel]}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {t.scanComplete}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="glass-panel safe-padding space-y-4">
              <h4 className="text-base sm:text-lg font-bold text-primary flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                {t.threatDetails}
              </h4>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-3 sm:p-4 glass-panel rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t.urlScanned}
                  </span>
                  <span className="text-xs text-foreground break-all max-w-[50%] text-right">
                    {scanResult.url}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 glass-panel rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t.scannedAt}
                  </span>
                  <span className="text-xs text-foreground">
                    {formatDate(scanResult.timestamp, language)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 glass-panel rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                    {t.reputationScore}
                  </span>
                  <span
                    className={cn(
                      "text-lg sm:text-xl font-bold",
                      getRiskColor(scanResult.riskLevel),
                    )}
                  >
                    {scanResult.details.reputation}/100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
                  <div
                    className={cn(
                      "p-3 sm:p-4 glass-panel rounded-lg text-center border",
                      scanResult.details.phishing
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-emerald-500/10 border-emerald-500/30",
                    )}
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium">
                      {t.phishingDetected}
                    </div>
                    <div
                      className={cn(
                        "text-sm sm:text-base font-bold",
                        scanResult.details.phishing
                          ? "text-red-400"
                          : "text-emerald-400",
                      )}
                    >
                      {scanResult.details.phishing ? "YES" : "NO"}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 sm:p-4 glass-panel rounded-lg text-center border",
                      scanResult.details.malware
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-emerald-500/10 border-emerald-500/30",
                    )}
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium">
                      {t.malwareDetected}
                    </div>
                    <div
                      className={cn(
                        "text-sm sm:text-base font-bold",
                        scanResult.details.malware
                          ? "text-red-400"
                          : "text-emerald-400",
                      )}
                    >
                      {scanResult.details.malware ? "YES" : "NO"}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 sm:p-4 glass-panel rounded-lg text-center border",
                      scanResult.details.suspicious
                        ? "bg-yellow-500/10 border-yellow-500/30"
                        : "bg-emerald-500/10 border-emerald-500/30",
                    )}
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium">
                      {t.suspiciousContent}
                    </div>
                    <div
                      className={cn(
                        "text-sm sm:text-base font-bold",
                        scanResult.details.suspicious
                          ? "text-yellow-400"
                          : "text-emerald-400",
                      )}
                    >
                      {scanResult.details.suspicious ? "YES" : "NO"}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "p-3 sm:p-4 glass-panel rounded-lg text-center border",
                      scanResult.details.ssl
                        ? "bg-emerald-500/10 border-emerald-500/30"
                        : "bg-red-500/10 border-red-500/30",
                    )}
                  >
                    <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 font-medium">
                      {t.sslValid}
                    </div>
                    <div
                      className={cn(
                        "text-sm sm:text-base font-bold",
                        scanResult.details.ssl
                          ? "text-emerald-400"
                          : "text-red-400",
                      )}
                    >
                      {scanResult.details.ssl ? "YES" : "NO"}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleNewScan}
                variant="outline"
                className="glass-panel-hover touch-target"
              >
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm">{t.newScan}</span>
              </Button>
              <Button
                onClick={handleOpenLink}
                disabled={scanResult.riskLevel === "dangerous"}
                className={cn(
                  "touch-target text-sm",
                  scanResult.riskLevel === "dangerous"
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 text-primary-foreground",
                )}
              >
                {t.openLink}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* QR Scanner Modal */}
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
