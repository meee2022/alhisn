# SafeLink Guard

> A premium cybersecurity companion for Arabic-speaking mobile users to scan, verify, and learn about suspicious links before clicking.

## Features

### 🛡️ Link Scanner
- **Instant URL Analysis**: Scan any link or QR code to check for phishing, malware, and other threats
- **Real-time Risk Assessment**: Get immediate feedback with Safe/Suspicious/Dangerous ratings
- **Detailed Threat Reports**: View comprehensive security details including SSL validation, reputation scores, and threat indicators

### 📜 Scan History
- Automatic tracking of all scanned links
- Quick access to previous scan results
- Easy history management with clear all option

### 🔒 Secure Vault
- Save trusted links for quick access
- Add notes and custom names to saved links
- Requires authentication for cross-device sync

### 💡 Security Tips
- Comprehensive security education in Arabic and English
- Categories: Anti-Phishing, Anti-Malware, Privacy, and General Tips
- Learn best practices to protect yourself online

### ⚙️ Settings & Customization
- **Multi-language Support**: Full Arabic (RTL) and English (LTR) support
- **Guest Mode**: Use the app without creating an account
- **Account Management**: Optional login for data sync and vault access

## Design

SafeLink Guard features a **Glassmorphism / HUD (Cybersecurity Edition)** design:
- Dark mode foundation with deep gradients
- Translucent glass panels with subtle blur
- Glowing neon accents (cyan, lime, purple)
- Smooth animations (spinning shields, radar pulses, scan loaders)
- Premium cybersecurity aesthetic

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom glassmorphism utilities
- **UI Components**: Radix UI (shadcn/ui)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner (toast notifications)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

The app works in **guest mode by default** - no configuration required!

For production deployment with backend integration:
- Connect to Supabase for user authentication and data sync
- Configure environment variables for API endpoints

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Main app layout
│   │   └── BottomNav.tsx       # Bottom tab navigation
│   └── ui/                     # Reusable UI components (shadcn)
├── contexts/
│   └── AppContext.tsx          # Global app state management
├── hooks/
│   ├── useTranslation.ts       # Translation hook
│   └── use-mobile.tsx          # Mobile detection hook
├── lib/
│   ├── scanner.ts              # URL scanning logic
│   ├── translations.ts         # Multi-language support
│   └── utils.ts                # Utility functions
├── pages/
│   ├── Scanner.tsx             # Home/Scanner screen
│   ├── History.tsx             # Scan history screen
│   ├── Vault.tsx               # Trusted links vault
│   ├── Tips.tsx                # Security tips & education
│   └── Settings.tsx            # App settings
└── App.tsx                     # Root component with routing
```

## RTL Support

The app automatically switches between LTR and RTL layouts based on the selected language:
- **Arabic (العربية)**: RTL layout with right-aligned navigation
- **English**: LTR layout with left-aligned navigation

## Security Features

### URL Scanning Heuristics
- SSL certificate validation
- Suspicious keyword detection
- Known malicious domain patterns
- URL shortener identification
- IP address detection in URLs
- Subdomain analysis

### Privacy
- Guest mode with no data collection
- Local storage for scan history (guest mode)
- Optional account for cross-device sync
- No tracking or analytics

## Future Enhancements

- [ ] Real-time threat database integration
- [ ] QR code scanner implementation
- [ ] Push notifications for threat alerts
- [ ] Browser extension companion
- [ ] Sharing scan results
- [ ] Export scan history reports
- [ ] Community threat reporting
- [ ] Machine learning threat detection

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues, questions, or contributions, please open an issue on the project repository.

---

**Stay Safe Online! 🛡️**
