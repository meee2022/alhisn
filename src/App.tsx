import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Toaster } from "sonner";
import { Scanner, History, Vault, Tips, Settings } from "./pages";

function App() {
  return (
    <AppProvider>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Scanner />} />
          <Route path="/history" element={<History />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <Toaster 
          position="top-center"
          toastOptions={{
            className: 'glass-panel',
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            }
          }}
        />
      </Suspense>
    </AppProvider>
  );
}

export default App;
