export const GITHUB_DOWNLOADS = {
  windows: 'https://github.com/vbulgariangymratt-afk/BH-minimal-webpage/releases/download/latest/Backbone-Setup.exe',
  macOS: 'https://github.com/vbulgariangymratt-afk/BH-minimal-webpage/releases/download/latest/Backbone.zip',
} as const;

export type SupportedOS = 'mac' | 'windows' | 'unknown';

export function detectUserOS(): SupportedOS {
  if (typeof window === 'undefined') return 'unknown';

  // modern userAgentData API
  const nav = navigator as unknown as { userAgentData?: { platform?: string } };
  if (nav.userAgentData?.platform) {
    const platform = nav.userAgentData.platform.toLowerCase();
    if (platform.includes('mac')) return 'mac';
    if (platform.includes('win')) return 'windows';
  }

  // legacy fallback
  const platform = (navigator.platform || '').toLowerCase();
  const userAgent = navigator.userAgent.toLowerCase();

  // Explicitly exclude iOS devices (iPhone, iPad, iPod) whose userAgent or platform contains "like Mac OS X" / "iPhone"
  const isIOS =
    userAgent.includes('iphone') ||
    userAgent.includes('ipad') ||
    userAgent.includes('ipod') ||
    platform.includes('iphone') ||
    platform.includes('ipad') ||
    platform.includes('ipod');

  if (!isIOS && (platform.includes('mac') || userAgent.includes('macintosh') || userAgent.includes('mac os x'))) {
    return 'mac';
  }
  if (platform.includes('win') || userAgent.includes('windows')) {
    return 'windows';
  }

  return 'unknown';
}
