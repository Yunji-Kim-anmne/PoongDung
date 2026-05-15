'use client';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

function canTrack() {
  return Boolean(IS_PRODUCTION && GA_ID && typeof window !== 'undefined' && typeof window.gtag === 'function');
}

export function trackPageView(pagePath) {
  if (!canTrack()) return;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName, params = {}) {
  if (!canTrack()) return;
  window.gtag('event', eventName, params);
}

export function trackSubmitSuccess(featureName, params = {}) {
  if (!featureName) return;

  const normalized = String(featureName)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  if (!normalized) return;
  trackEvent(`submit_${normalized}`, params);
}
