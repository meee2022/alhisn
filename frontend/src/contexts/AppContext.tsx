import React, { createContext, useContext, useState, useEffect } from "react";

export type RiskLevel = "safe" | "suspicious" | "dangerous";

export interface ScanResult {
  id: string;
  url: string;
  riskLevel: RiskLevel;
  timestamp: Date;
  details: {
    phishing: boolean;
    malware: boolean;
    suspicious: boolean;
    ssl: boolean;
    reputation: number;
  };
}

export interface VaultItem {
  id: string;
  url: string;
  name: string;
  addedAt: Date;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  scanHistory: ScanResult[];
  addScanToHistory: (scan: ScanResult) => void;
  clearHistory: () => void;
  vaultItems: VaultItem[];
  addToVault: (item: Omit<VaultItem, "id" | "addedAt">) => void;
  removeFromVault: (id: string) => void;
  language: "ar" | "en";
  setLanguage: (lang: "ar" | "en") => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  useEffect(() => {
    const savedUser = localStorage.getItem("safelink_user");
    const savedHistory = localStorage.getItem("safelink_history");
    const savedVault = localStorage.getItem("safelink_vault");
    const savedLanguage = localStorage.getItem("safelink_language");

    if (savedUser) setUser(JSON.parse(savedUser));

    if (savedHistory) {
      setScanHistory(
        JSON.parse(savedHistory).map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp),
        })),
      );
    }

    if (savedVault) {
      setVaultItems(
        JSON.parse(savedVault).map((v: any) => ({
          ...v,
          addedAt: new Date(v.addedAt),
        })),
      );
    }

    if (savedLanguage) setLanguage(savedLanguage as "ar" | "en");
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("safelink_user", JSON.stringify(user));
      const savedVault = localStorage.getItem(`safelink_vault_${user.id}`);
      if (savedVault) {
        setVaultItems(
          JSON.parse(savedVault).map((v: any) => ({
            ...v,
            addedAt: new Date(v.addedAt),
          })),
        );
      }
    } else {
      localStorage.removeItem("safelink_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("safelink_history", JSON.stringify(scanHistory));
  }, [scanHistory]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        `safelink_vault_${user.id}`,
        JSON.stringify(vaultItems),
      );
    } else {
      localStorage.setItem("safelink_vault", JSON.stringify(vaultItems));
    }
  }, [vaultItems, user]);

  useEffect(() => {
    localStorage.setItem("safelink_language", language);
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const addScanToHistory = (scan: ScanResult) => {
    setScanHistory((prev) => [scan, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setScanHistory([]);
    localStorage.removeItem("safelink_history");
  };

  const addToVault = (item: Omit<VaultItem, "id" | "addedAt">) => {
    const newItem: VaultItem = {
      ...item,
      id: Date.now().toString(),
      addedAt: new Date(),
    };
    setVaultItems((prev) => [newItem, ...prev]);
  };

  const removeFromVault = (id: string) => {
    setVaultItems((prev) => prev.filter((item) => item.id !== id));
  };

  const logout = () => {
    setUser(null);
    setVaultItems([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        scanHistory,
        addScanToHistory,
        clearHistory,
        vaultItems,
        addToVault,
        removeFromVault,
        language,
        setLanguage,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
