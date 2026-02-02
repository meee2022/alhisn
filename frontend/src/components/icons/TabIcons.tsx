interface IconProps {
  className?: string;
  isActive?: boolean;
}

export const ScannerIcon = ({ className = "", isActive = false }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="scanner-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isActive ? "#06b6d4" : "#64748b"} />
        <stop offset="100%" stopColor={isActive ? "#3b82f6" : "#475569"} />
      </linearGradient>
    </defs>
    {/* Shield outline */}
    <path d="M16 3L6 7V13C6 19.5 10 25 16 29C22 25 26 19.5 26 13V7L16 3Z" 
      stroke="url(#scanner-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    {/* Scan lines */}
    <path d="M11 14H21" stroke={isActive ? "#22d3ee" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "1" : "0.5"}/>
    <path d="M11 16.5H21" stroke={isActive ? "#06b6d4" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "0.8" : "0.4"}/>
    <path d="M11 19H21" stroke={isActive ? "#0891b2" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "0.6" : "0.3"}/>
    {/* Center dot */}
    {isActive && (
      <circle cx="16" cy="16" r="2" fill="#22d3ee">
        <animate attributeName="r" values="2;3;2" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
    )}
  </svg>
);

export const HistoryIcon = ({ className = "", isActive = false }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="history-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isActive ? "#a855f7" : "#64748b"} />
        <stop offset="100%" stopColor={isActive ? "#ec4899" : "#475569"} />
      </linearGradient>
    </defs>
    {/* Clock circle */}
    <circle cx="16" cy="17" r="10" stroke="url(#history-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    {/* Clock hands */}
    <path d="M16 17V11" stroke={isActive ? "#d946ef" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? "1" : "0.6"}/>
    <path d="M16 17L20 19" stroke={isActive ? "#d946ef" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? "1" : "0.6"}/>
    {/* Counter-clockwise arrow */}
    <path d="M7 12C8.5 8.5 12 6 16 6C21 6 25 10 25 15" 
      stroke={isActive ? "#c026d3" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "1" : "0.5"}/>
    <path d="M7 12L7 8M7 12L11 12" stroke={isActive ? "#c026d3" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "1" : "0.5"}/>
  </svg>
);

export const VaultIcon = ({ className = "", isActive = false }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="vault-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isActive ? "#84cc16" : "#64748b"} />
        <stop offset="100%" stopColor={isActive ? "#10b981" : "#475569"} />
      </linearGradient>
    </defs>
    {/* Lock body */}
    <rect x="9" y="15" width="14" height="11" rx="2" 
      stroke="url(#vault-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    {/* Lock shackle */}
    <path d="M12 15V11C12 8.79086 13.7909 7 16 7C18.2091 7 20 8.79086 20 11V15" 
      stroke="url(#vault-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    {/* Keyhole */}
    <circle cx="16" cy="19" r="1.5" fill={isActive ? "#84cc16" : "#94a3b8"} opacity={isActive ? "1" : "0.6"}/>
    <path d="M16 20.5V23" stroke={isActive ? "#84cc16" : "#94a3b8"} strokeWidth="1.5" strokeLinecap="round" opacity={isActive ? "1" : "0.6"}/>
    {/* Glow effect when active */}
    {isActive && (
      <>
        <circle cx="16" cy="19" r="3" stroke="#84cc16" strokeWidth="0.5" opacity="0.5">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </>
    )}
  </svg>
);

export const TipsIcon = ({ className = "", isActive = false }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="tips-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isActive ? "#fbbf24" : "#64748b"} />
        <stop offset="100%" stopColor={isActive ? "#f59e0b" : "#475569"} />
      </linearGradient>
    </defs>
    {/* Bulb shape */}
    <path d="M16 4C12.6863 4 10 6.68629 10 10C10 11.8638 10.8043 13.5403 12.0964 14.6738C12.6552 15.1617 13 15.8734 13 16.6277V18C13 19.1046 13.8954 20 15 20H17C18.1046 20 19 19.1046 19 18V16.6277C19 15.8734 19.3448 15.1617 19.9036 14.6738C21.1957 13.5403 22 11.8638 22 10C22 6.68629 19.3137 4 16 4Z" 
      stroke="url(#tips-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    {/* Bulb base */}
    <path d="M14 22H18" stroke={isActive ? "#fbbf24" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? "1" : "0.6"}/>
    <path d="M15 24H17" stroke={isActive ? "#fbbf24" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" opacity={isActive ? "1" : "0.6"}/>
    {/* Light rays */}
    {isActive && (
      <>
        <path d="M16 2V4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M7 10H9" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M23 10H25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M9.75 5.75L11.25 7.25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </path>
        <path d="M22.25 5.75L20.75 7.25" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </path>
      </>
    )}
  </svg>
);

export const SettingsIcon = ({ className = "", isActive = false }: IconProps) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="settings-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={isActive ? "#6366f1" : "#64748b"} />
        <stop offset="100%" stopColor={isActive ? "#8b5cf6" : "#475569"} />
      </linearGradient>
    </defs>
    {/* Gear outer */}
    <path d="M16 6L17.5 9.5L21 10L18.5 13L19 17L16 15L13 17L13.5 13L11 10L14.5 9.5L16 6Z" 
      stroke="url(#settings-grad)" strokeWidth="1.5" fill="none" opacity={isActive ? "1" : "0.7"} strokeLinejoin="round"/>
    <circle cx="16" cy="12" r="3" stroke="url(#settings-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    
    {/* Second gear */}
    <path d="M16 18L17.5 21.5L21 22L18.5 25L19 29L16 27L13 29L13.5 25L11 22L14.5 21.5L16 18Z" 
      stroke="url(#settings-grad)" strokeWidth="1.5" fill="none" opacity={isActive ? "1" : "0.7"} strokeLinejoin="round"/>
    <circle cx="16" cy="24" r="3" stroke="url(#settings-grad)" strokeWidth="2" fill="none" opacity={isActive ? "1" : "0.7"}/>
    
    {/* Center dots */}
    {isActive && (
      <>
        <circle cx="16" cy="12" r="1" fill="#6366f1">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="16" cy="24" r="1" fill="#8b5cf6">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
      </>
    )}
  </svg>
);
