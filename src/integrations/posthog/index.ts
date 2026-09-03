'use client';

import type { PostHog } from 'posthog-js';

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_yxWknb5sdCgMd7BgYAc8k8u39WaUGcYffqRmNxA5GMrq';
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let posthogInstance: PostHog | null = null;
let isInitializing = false;
let isInitialized = false;

interface PendingEvent {
  eventName: string;
  properties?: Record<string, unknown>;
}

const pendingEvents: PendingEvent[] = [];

export async function initPostHog(): Promise<void> {
  if (typeof window === 'undefined' || isInitialized || isInitializing) {
    return;
  }

  isInitializing = true;

  try {
    const posthogModule = await import('posthog-js');
    const posthog = posthogModule.default;

    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
    });

    posthogInstance = posthog;
    isInitialized = true;
    isInitializing = false;

    // Flush any pending events that occurred while PostHog was dynamically loading
    while (pendingEvents.length > 0) {
      const event = pendingEvents.shift();
      if (event) {
        posthog.capture(event.eventName, event.properties);
      }
    }
  } catch (error) {
    console.error('[PostHog] Failed to initialize:', error);
    isInitializing = false;
  }
}

export function captureEvent(eventName: string, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (isInitialized && posthogInstance) {
    posthogInstance.capture(eventName, properties);
  } else {
    // Queue event until dynamic import finishes
    pendingEvents.push({ eventName, properties });
  }
}

