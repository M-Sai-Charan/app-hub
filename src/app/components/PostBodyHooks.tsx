'use client';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function PostBodyHooks() {
  useEffect(() => {
    // Optional: Logging to confirm client-side mount
    console.log('Client-only component mounted');
  }, []);

  return (
    <>
      <Toaster />
      <SpeedInsights />
    </>
  );
}
