import { supabase } from './supabase';

/** Refresh published settings while a page stays open; drafts are never read. */
export function watchPublishedSettings<T>(key: string, parse: (raw: unknown) => T, update: (value: T) => void, onReady?: () => void) {
  let active = true;
  let pending = false;
  let lastContent: string | null = null;
  let initialized = false;
  async function refresh() {
    if (!active || pending || document.hidden) return;
    pending = true;
    try {
      const { data, error } = await supabase.from('cms_published_content').select('published_content').eq('content_key', key).abortSignal(AbortSignal.timeout(8000)).maybeSingle();
      if (error) throw error;
      if (active && data?.published_content && data.published_content !== lastContent) {
        const parsed = parse(data.published_content);
        lastContent = data.published_content;
        update(parsed);
      }
    } catch (error) {
      console.warn('[Published settings] Keeping last valid configuration:', key, error);
    } finally {
      pending = false;
      if (active && !initialized) { initialized = true; onReady?.(); }
    }
  }
  void refresh();
  const timer = window.setInterval(() => void refresh(), 30000);
  document.addEventListener('visibilitychange', refresh);
  window.addEventListener('focus', refresh);
  return () => { active = false; window.clearInterval(timer); document.removeEventListener('visibilitychange', refresh); window.removeEventListener('focus', refresh); };
}
