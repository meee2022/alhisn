import { useState } from "react";
import QrBarcodeScanner from "react-qr-barcode-scanner";
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
                constraints={{ facingMode: "environment" }}
                onUpdate={(_err, result) => {
                  if (result && result.text) {
                    const text = result.text;
                    setHasScanned(true);
                    onResult(text);
                    toast.success("تم قراءة الرابط من رمز QR");
                    handleClose();
                  }
                }}
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
