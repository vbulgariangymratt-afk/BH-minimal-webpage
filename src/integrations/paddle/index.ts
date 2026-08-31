'use client';

export const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
export const PADDLE_PRICE_ID = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || '';

export interface CheckoutOptions {
  customerEmail?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function openPaddleCheckout(options?: CheckoutOptions) {
  // When Paddle is configured with environment variables, initialize Checkout
  if (typeof window !== 'undefined' && (window as unknown as { Paddle?: { Checkout: { open: (opts: unknown) => void } } }).Paddle) {
    const paddle = (window as unknown as { Paddle: { Checkout: { open: (opts: unknown) => void } } }).Paddle;
    paddle.Checkout.open({
      items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
      customer: options?.customerEmail ? { email: options.customerEmail } : undefined,
    });
  } else {
    // Graceful notice when Paddle credentials haven't been linked yet
    alert('Paddle checkout configuration is ready for your Paddle credentials in .env.local.');
  }
}
