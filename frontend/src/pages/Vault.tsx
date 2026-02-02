import { useState } from "react";
import { Lock, ExternalLink, Trash2, Plus, LogIn, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/contexts/AppContext";
import { translations } from "@/lib/translations";
import { formatDate } from "@/lib/scanner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

export default function Vault() {
  const { language, isAuthenticated, vaultItems, addToVault, removeFromVault } =
    useApp();
  const t = translations[language];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVaultItem, setNewVaultItem] = useState({
    url: "",
    name: "",
    notes: "",
  });

  const handleAddToVault = () => {
    if (!newVaultItem.url.trim() || !newVaultItem.name.trim()) {
      toast.error("الرجاء ملء جميع الحقول المطلوبة");
      return;
    }

    addToVault({
      url: newVaultItem.url,
      name: newVaultItem.name,
      notes: newVaultItem.notes,
    });

    setNewVaultItem({ url: "", name: "", notes: "" });
    setIsAddDialogOpen(false);
    toast.success(t.savedToVault);
  };

  const handleOpenLink = (url: string) => {
    window.open(url, "_blank");
  };

  const handleRemoveFromVault = (id: string) => {
    removeFromVault(id);
    toast.success(t.removedFromVault);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <Card className="glass-panel safe-padding">
            <div className="text-center space-y-5 sm:space-y-6">
              <div className="relative inline-block">
                <Lock className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-primary/30 mx-auto" />
                <div className="absolute inset-0 bg-primary/10 blur-2xl" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-primary">
                  {t.loginRequired}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {t.loginRequiredDesc}
                </p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 touch-target">
                <LogIn className="w-4 h-4" />
                {t.login}
              </Button>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-0">
        <Card className="glass-panel safe-padding">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-5 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary neon-glow" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  {t.vaultTitle}
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {vaultItems.length}{" "}
                  {vaultItems.length === 1 ? "رابط محفوظ" : "روابط محفوظة"}
                </p>
              </div>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full sm:w-auto touch-target">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm sm:text-base">إضافة رابط</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-panel border-border max-w-[95vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-base sm:text-lg">
                    {t.addToVaultPrompt}
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm">
                    احفظ رابطاً موثوقاً في خزنتك
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block">
                      {t.linkName}
                    </label>
                    <Input
                      placeholder="مثال: موقع البنك الخاص بي"
                      value={newVaultItem.name}
                      onChange={(e) =>
                        setNewVaultItem({
                          ...newVaultItem,
                          name: e.target.value,
                        })
                      }
                      className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block">
                      URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      value={newVaultItem.url}
                      onChange={(e) =>
                        setNewVaultItem({
                          ...newVaultItem,
                          url: e.target.value,
                        })
                      }
                      className="glass-panel h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="text-xs sm:text-sm font-medium mb-2 block">
                      {t.notes}{" "}
                      <span className="text-muted-foreground">
                        ({t.optional})
                      </span>
                    </label>
                    <Textarea
                      placeholder="أضف أي ملاحظات عن هذا الرابط..."
                      value={newVaultItem.notes}
                      onChange={(e) =>
                        setNewVaultItem({
                          ...newVaultItem,
                          notes: e.target.value,
                        })
                      }
                      className="glass-panel resize-none text-sm sm:text-base"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="glass-panel-hover w-full sm:w-auto touch-target"
                  >
                    {t.cancel}
                  </Button>
                  <Button
                    onClick={handleAddToVault}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto touch-target"
                  >
                    {t.save}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {vaultItems.length === 0 ? (
            <div className="text-center py-12 sm:py-16 space-y-4">
              <div className="relative inline-block">
                <Lock className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-muted-foreground/30 mx-auto" />
                <div className="absolute inset-0 bg-muted-foreground/10 blur-2xl" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">
                  {t.noVault}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground px-4">
                  {t.noVaultDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {vaultItems.map((item) => (
                <Card
                  key={item.id}
                  className="glass-panel p-3 sm:p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors card-shine"
                >
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                          <h3 className="font-semibold text-sm sm:text-base text-primary truncate">
                            {item.name}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground break-all line-clamp-2">
                          {item.url}
                        </p>
                        {item.notes && (
                          <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 italic bg-background/30 p-2 rounded">
                            {item.notes}
                          </p>
                        )}
                        <p className="text-[10px] sm:text-xs text-muted-foreground/60 mt-2">
                          تم الإضافة {formatDate(item.addedAt, language)}
                        </p>
                      </div>

                      <div className="flex gap-1 sm:gap-2 shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleOpenLink(item.url)}
                          className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-primary/10"
                        >
                          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="glass-panel border-border max-w-[90vw] sm:max-w-md">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-base sm:text-lg">
                                حذف من الخزنة؟
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-xs sm:text-sm">
                                سيتم حذف "{item.name}" من خزنتك بشكل نهائي.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                              <AlertDialogCancel className="glass-panel-hover w-full sm:w-auto touch-target m-0">
                                {t.cancel}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleRemoveFromVault(item.id)}
                                className="bg-destructive hover:bg-destructive/90 w-full sm:w-auto touch-target m-0"
                              >
                                {t.delete}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
