export function crmAttribution() {
  const params = new URLSearchParams(window.location.search);
  let sessionId = '';
  try {
    sessionId = window.localStorage.getItem('porters_session_id') || '';
    if (!sessionId) {
      sessionId = window.crypto?.randomUUID?.() || `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem('porters_session_id', sessionId);
    }
  } catch {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  return {
    source_page: window.location.pathname,
    landing_page: window.location.href,
    referrer: document.referrer || null,
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
    utm_content: params.get('utm_content'),
    utm_term: params.get('utm_term'),
    session_id: sessionId,
    user_agent: window.navigator.userAgent,
  };
}
