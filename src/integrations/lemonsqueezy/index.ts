'use client';

export const LEMON_SQUEEZY_CHECKOUT_URL =
  process.env.NEXT_PUBLIC_LEMON_SQUEEZY_CHECKOUT_URL || 'https://backbone.lemonsqueezy.com/checkout';

export interface LemonSqueezyCheckoutOptions {
  customerEmail?: string;
  userId?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function openLemonSqueezyCheckout(options?: LemonSqueezyCheckoutOptions) {
  if (typeof window === 'undefined') return;

  // Initialize Lemon.js if createLemonSqueezy is available on window
  const win = window as unknown as {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Setup?: (cfg: { eventHandler?: (event: { event: string; data?: unknown }) => void }) => void;
      Url?: { Open: (u: string) => void };
    };
  };

  if (typeof win.createLemonSqueezy === 'function' && !win.LemonSqueezy) {
    try {
      win.createLemonSqueezy();
    } catch {
      // ignore
    }
  }

  let url: URL;
  try {
    url = new URL(LEMON_SQUEEZY_CHECKOUT_URL);
  } catch {
    url = new URL('https://backbone.lemonsqueezy.com/checkout');
  }

  if (options?.customerEmail) {
    url.searchParams.set('checkout[email]', options.customerEmail);
  }
  if (options?.userId) {
    url.searchParams.set('checkout[custom][user_id]', options.userId);
  }

  const finalUrl = url.toString();

  // If Lemon.js overlay is available
  if (win.LemonSqueezy?.Url?.Open) {
    if (options?.onSuccess || options?.onClose) {
      win.LemonSqueezy.Setup?.({
        eventHandler: (event) => {
          if (event.event === 'Checkout.Success') {
            options.onSuccess?.();
          } else if (event.event === 'Checkout.Close') {
            options.onClose?.();
          }
        },
      });
    }
    win.LemonSqueezy.Url.Open(finalUrl);
  } else {
    // Fallback: direct browser window opening
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  }
}
