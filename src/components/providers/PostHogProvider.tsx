'use client';

import { useEffect } from 'react';
import { initPostHog } from '@/integrations/posthog';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Schedule PostHog initialization when the main thread is idle after hydration
    if ('requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(() => {
          initPostHog();
        }, { timeout: 2000 });

      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(() => {
        initPostHog();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  return <>{children}</>;
}
