'use client';

import posthog from 'posthog-js';

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_yxWknb5sdCgMd7BgYAc8k8u39WaUGcYffqRmNxA5GMrq';
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export function initPostHog() {
  if (typeof window !== 'undefined' && !isInitialized) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    });
    isInitialized = true;
  }
}

export function captureEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && isInitialized) {
    posthog.capture(eventName, properties);
  }
}
