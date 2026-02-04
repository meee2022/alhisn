import { RiskLevel, ScanResult } from '@/contexts/AppContext';

export const validateUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

// امتدادات عالية الخطورة (تقدر تعدّل)
const highRiskTlds = [
  'tk','ml','ga','cf','gq','party','xyz','top','click','fit','rest','work'
];

// دومينات محجوبة صراحة (أضف عليها اللي تريده)
const blockedDomains = ['rqyx.party'];

// كلمات وعبارات مشبوهة
const suspiciousKeywords = [
  'login','signin','sign-in','auth','verify','secure','account','update','confirm',
  'bank','paypal','apple','amazon','suspended','wallet','crypto','airdrop',
  'giveaway','support','helpdesk'
];

const dangerousPatterns = [
  'bit.ly','tinyurl','goo.gl','t.co','ow.ly','cutt.ly','rb.gy',
  'password','urgent','winner','prize','free-gift','gift-card',
  'verify-your-account','update-billing','free-iphone'
];

// (اختياري) فحص Google Safe Browsing
async function checkWithGoogleSafeBrowsing(url: string): Promise<boolean> {
  const apiKey = import.meta.env.VITE_GSB_API_KEY; // أو process.env في backend
  if (!apiKey) return false;

  const body = {
    client: { clientId: "safelink-guard", clientVersion: "1.0" },
    threatInfo: {
      threatTypes: [
        "MALWARE",
        "SOCIAL_ENGINEERING",
        "UNWANTED_SOFTWARE",
        "POTENTIALLY_HARMFUL_APPLICATION"
      ],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  const res = await fetch(
    `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  if (!res.ok) return false;
  const data = await res.json();
  return !!data?.matches?.length;
}

// Simulated URL scanning logic - In production, this would call real security APIs
export const scanUrl = async (url: string): Promise<ScanResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

  const normalizedUrl = normalizeUrl(url);
  const urlLower = normalizedUrl.toLowerCase();

  let riskScore = 0;
  const details = {
    phishing: false,
    malware: false,
    suspicious: false,
    ssl: normalizedUrl.startsWith('https://'),
    reputation: 100
  };

  const hostname = new URL(normalizedUrl).hostname.toLowerCase();
  const hostParts = hostname.split('.');
  const tld = hostParts[hostParts.length - 1] || '';

  // 1) دومينات محجوبة صراحة
  if (blockedDomains.some(d => hostname === d || hostname.endsWith(`.${d}`))) {
    riskScore += 90;
    details.phishing = true;
    details.suspicious = true;
  }

  // 2) امتداد عالي الخطورة
  if (highRiskTlds.includes(tld)) {
    riskScore += 35;
    details.suspicious = true;
  }

  // 3) كلمات مشبوهة في الرابط
  const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => urlLower.includes(keyword));
  if (hasSuspiciousKeywords) {
    riskScore += 40;
    details.suspicious = true;
  }

  // 4) patterns خطيرة
  const hasDangerousPatterns = dangerousPatterns.some(pattern => urlLower.includes(pattern));
  if (hasDangerousPatterns) {
    riskScore += 60;
    details.phishing = true;
    details.malware = Math.random() > 0.3;
  }

  // 5) عدم وجود SSL
  if (!details.ssl) {
    riskScore += 50;
  }

  // 6) IP address في الرابط
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlLower)) {
    riskScore += 40;
    details.suspicious = true;
  }

  // 7) وجود @ في الـ path (تمويه المستخدم)
  const hasAtSymbolInPath = /https?:\/\/[^\/@]+@/.test(urlLower);
  if (hasAtSymbolInPath) {
    riskScore += 30;
    details.suspicious = true;
  }

  // 8) طول الرابط مبالغ فيه
  if (normalizedUrl.length > 150) {
    riskScore += 20;
    details.suspicious = true;
  }

  // 9) subdomains كثيرة
  if (hostParts.length > 3) {
    riskScore += 30;
    details.suspicious = true;
  }

  // 10) (اختياري) فحص Google Safe Browsing
  try {
    const flaggedByGoogle = await checkWithGoogleSafeBrowsing(normalizedUrl);
    if (flaggedByGoogle) {
      riskScore = Math.max(riskScore, 80);
      details.phishing = true;
      details.suspicious = true;
    }
  } catch {
    // لو فشل الـ API نكمل على الهيوريستكس فقط
  }

  // سقف للـ score
  riskScore = Math.min(riskScore, 100);

  // Determine risk level
  let riskLevel: RiskLevel;
  if (riskScore >= 60) {
    riskLevel = 'dangerous';
    details.reputation = Math.max(0, 100 - riskScore); // 0–40
  } else if (riskScore >= 25) {
    riskLevel = 'suspicious';
    details.reputation = Math.max(10, 100 - riskScore); // 10–75
  } else {
    riskLevel = 'safe';
    details.reputation = Math.max(80, 100 - riskScore); // ≥80
  }

  return {
    id: Date.now().toString(),
    url: normalizedUrl,
    riskLevel,
    timestamp: new Date(),
    details
  };
};

export const getRiskColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'safe':
      return 'text-emerald-400';
    case 'suspicious':
      return 'text-yellow-400';
    case 'dangerous':
      return 'text-red-400';
  }
};

export const getRiskBgColor = (riskLevel: RiskLevel): string => {
  switch (riskLevel) {
    case 'safe':
      return 'bg-emerald-500/20 border-emerald-500/50';
    case 'suspicious':
      return 'bg-yellow-500/20 border-yellow-500/50';
    case 'dangerous':
      return 'bg-red-500/20 border-red-500/50';
  }
};

export const formatDate = (date: Date, language: 'ar' | 'en'): string => {
  return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};
