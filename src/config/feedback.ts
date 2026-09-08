// Feedback form URL resolver for Suffra.
// Safely resolves the optional feedback URL from configuration, ensuring
// only approved HTTPS Google Forms URLs are rendered as external links.
// This module strictly avoids exposing or processing any voter secrets,
// candidate selections, wallet addresses, aliases, or form responses.

export function resolveFeedbackFormUrl(
  configuredUrl: string | undefined = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_FEEDBACK_FORM_URL : undefined,
): string | null {
  const raw = configuredUrl?.trim();
  if (!raw) return null;

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:') return null;
  if (parsed.username || parsed.password) return null;
  if (parsed.port && parsed.port !== '443') return null;

  const hostname = parsed.hostname.toLowerCase();
  if (hostname === 'forms.gle') {
    return parsed.toString();
  }

  if (hostname === 'docs.google.com') {
    const pathname = parsed.pathname;
    if (pathname === '/forms' || pathname.startsWith('/forms/')) {
      return parsed.toString();
    }
  }

  return null;
}
