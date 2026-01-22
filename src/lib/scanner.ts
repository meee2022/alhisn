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

// Simulated URL scanning logic - In production, this would call real security APIs
export const scanUrl = async (url: string): Promise<ScanResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
  
  const normalizedUrl = normalizeUrl(url);
  const urlLower = normalizedUrl.toLowerCase();
  
  // Simple heuristic checks for demo purposes
  const suspiciousKeywords = ['login', 'verify', 'secure', 'account', 'update', 'confirm', 'bank', 'paypal', 'apple', 'amazon', 'suspended'];
  const dangerousPatterns = [
    'bit.ly', 'tinyurl', 'goo.gl', // URL shorteners
    'tk', 'ml', 'ga', 'cf', // Free domains often used in phishing
    'password', 'urgent', 'winner', 'prize'
  ];
  
  let riskScore = 0;
  const details = {
    phishing: false,
    malware: false,
    suspicious: false,
    ssl: normalizedUrl.startsWith('https://'),
    reputation: 100
  };
  
  // Check for suspicious keywords
  const hasSuspiciousKeywords = suspiciousKeywords.some(keyword => urlLower.includes(keyword));
  if (hasSuspiciousKeywords) {
    riskScore += 30;
    details.suspicious = true;
  }
  
  // Check for dangerous patterns
  const hasDangerousPatterns = dangerousPatterns.some(pattern => urlLower.includes(pattern));
  if (hasDangerousPatterns) {
    riskScore += 50;
    details.phishing = true;
    details.malware = Math.random() > 0.5;
  }
  
  // Check SSL
  if (!details.ssl) {
    riskScore += 40;
  }
  
  // Check for IP addresses in URL (often suspicious)
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(urlLower)) {
    riskScore += 35;
    details.suspicious = true;
  }
  
  // Check for excessive subdomains
  const domain = normalizedUrl.split('//')[1]?.split('/')[0] || '';
  const subdomains = domain.split('.');
  if (subdomains.length > 3) {
    riskScore += 25;
    details.suspicious = true;
  }
  
  // Determine risk level
  let riskLevel: RiskLevel;
  if (riskScore >= 60) {
    riskLevel = 'dangerous';
    details.reputation = Math.max(0, 100 - riskScore);
  } else if (riskScore >= 30) {
    riskLevel = 'suspicious';
    details.reputation = Math.max(20, 100 - riskScore);
  } else {
    riskLevel = 'safe';
    details.reputation = Math.max(70, 100 - riskScore);
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
