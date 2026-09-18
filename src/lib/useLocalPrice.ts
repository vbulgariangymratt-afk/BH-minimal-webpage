'use client';

import { useEffect, useState } from 'react';

const REGION_CURRENCY: Record<string, string> = {
  US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', NZ: 'NZD', JP: 'JPY', CN: 'CNY',
  IN: 'INR', BR: 'BRL', AR: 'ARS', CL: 'CLP', CO: 'COP', PE: 'PEN', UY: 'UYU',
  CH: 'CHF', SE: 'SEK', NO: 'NOK', DK: 'DKK', PL: 'PLN', CZ: 'CZK', HU: 'HUF',
  TR: 'TRY', ZA: 'ZAR', KR: 'KRW', SG: 'SGD', HK: 'HKD', TW: 'TWD', TH: 'THB',
  ID: 'IDR', PH: 'PHP', MY: 'MYR', AE: 'AED', SA: 'SAR', IL: 'ILS', NG: 'NGN',
  EG: 'EGP', AT: 'EUR', BE: 'EUR', DE: 'EUR', ES: 'EUR', FI: 'EUR', FR: 'EUR',
  GR: 'EUR', IE: 'EUR', IT: 'EUR', NL: 'EUR', PT: 'EUR',
};

/**
 * Returns a display string for a price in `baseCurrency`, converted to the
 * visitor's local currency (guessed from browser locale) when possible.
 * Falls back to the base currency. Stripe does the real conversion at checkout.
 */
export function useLocalPrice(amount: number, baseCurrency: string): string {
  const format = (value: number, currency: string, locale?: string) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: value >= 100 ? 0 : 2,
    }).format(value);

  const [text, setText] = useState(() => `${format(amount, baseCurrency, 'en-US')} ${baseCurrency}`);

  useEffect(() => {
    let cancelled = false;
    const locale = navigator.language || 'en-US';
    const region = locale.split('-')[1]?.toUpperCase() ?? '';
    const target = REGION_CURRENCY[region];

    if (!target || target === baseCurrency) return;

    const cacheKey = `rates_${baseCurrency}`;
    const apply = (rates: Record<string, number>) => {
      const rate = rates[target];
      if (!rate || cancelled) return;
      setText(`≈ ${format(amount * rate, target, locale)} ${target}`);
    };

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        apply(JSON.parse(cached));
        return;
      }
    } catch {}

    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data?.rates) return;
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(data.rates));
        } catch {}
        apply(data.rates);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, baseCurrency]);

  return text;
}
