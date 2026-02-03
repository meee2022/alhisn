import { useState } from "react";
import QrBarcodeScanner, { Result } from "react-qr-barcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QRScannerProps {
  open: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

export default function QRScanner({ open, onClose, onResult }: QRScannerProps) {
  const [hasScanned, setHasScanned] = useState(false);

  const handleClose = () => {
    setHasScanned(false);
    onClose();
  };

  const handleUpdate = (_err: unknown, result?: Result) => {
    if (!result) return;

    const anyResult = result as any;
    const text: string =
      typeof anyResult.getText === "function"
        ? anyResult.getText()
        : anyResult?.text ?? "";

    if (!text) return;

    setHasScanned(true);
    onResult(text);
    toast.success("تم قراءة الرابط من رمز QR");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="glass-panel max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">مسح رمز QR</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden glass-panel">
            {!hasScanned && (
              <QrBarcodeScanner
                // نمرّر constraints عن طريق cast لـ any حتى لا يتحقق TypeScript من الـ prop
                {...({ constraints: { facingMode: "environment" } } as any)}
                onUpdate={handleUpdate}
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>

          <Button variant="outline" className="w-full" onClick={handleClose}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
