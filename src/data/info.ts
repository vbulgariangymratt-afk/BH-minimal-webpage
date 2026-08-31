export interface InfoStatement {
  id: string;
  text: string;
  linkText?: string;
  linkHref?: string;
  textSuffix?: string;
}

export const IMPORTANT_STATEMENTS: InfoStatement[] = [
  {
    id: 'refund-policy',
    text: 'Full refund within 14 days, no questions — hit me up on X',
    linkText: '@vz_warhead',
    linkHref: 'https://x.com/vz_warhead',
  },
  {
    id: 'privacy-statement',
    text: "I dont care about selling ur data, I wouldn't really know what to do w it and i have no interest on learning that",
  },
  {
    id: 'account-unlock-note',
    text: 'Log in with the same email u paid with, otherwise the app wont unlock and you wont become a boner',
  },
];
