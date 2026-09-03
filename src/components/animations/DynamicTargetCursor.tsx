'use client';

import dynamic from 'next/dynamic';
import type { TargetCursorProps } from './TargetCursor';

export const DynamicTargetCursor = dynamic<TargetCursorProps>(
  () => import('./TargetCursor').then((mod) => mod.TargetCursor),
  { ssr: false }
);
