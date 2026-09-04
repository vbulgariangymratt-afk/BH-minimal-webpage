export interface PricingPlan {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  ctaLabel: string;
  securityNote: string;
  purchaseNote: string;
}

export const PRICING_PLAN: PricingPlan = {
  id: '30_days_access',
  name: 'Backbone Access',
  subtitle: '30-day full access',
  price: 30,
  period: '/ 30 days',
  description: 'Complete & unlimited access to Backbone for 30 days, including any and all future updates I release to help our brains (cuz I use it as well).',
  features: [
    'No automatic renewal cuz I also get hunted by those',
    'Unlimited devices',
    'Unlimited everything basically',
  ],
  ctaLabel: 'Become a boner',
  securityNote: 'Processed securely via Lemon Squeezy Merchant of Record',
  purchaseNote: 'Log in with the same email u bought this with, otherwise it wont unlock',
};
