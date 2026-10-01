/** A small email heads-up after the inquiry is safely stored in the CRM. */
export type InquiryNotificationType = 'contact' | 'appointment' | 'application' | 'simulation';

const recipient = 'a.lambert@porters.fr';
const endpoint = `https://formsubmit.co/ajax/${recipient}`;
const adminOrigin = 'https://www.porters.fr';
// Match the URL used to request recipient activation. All request forms share
// this identity, including submissions made from the local development site.
const notificationFormUrl = `${adminOrigin}/`;
const labels: Record<InquiryNotificationType, string> = {
  contact: 'message',
  appointment: 'demande de rendez-vous',
  application: 'candidature',
  simulation: 'demande de simulation',
};

export async function notifyInquiryByEmail(type: InquiryNotificationType): Promise<boolean> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6000);
  const inbox = type === 'simulation' ? '/admin/leads' : '/admin/messages';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      keepalive: true,
      signal: controller.signal,
      body: JSON.stringify({
        _subject: `[The Porters] Nouvelle demande : ${labels[type]}`,
        _captcha: 'false',
        _url: notificationFormUrl,
        message: `Une nouvelle demande (${labels[type]}) a été enregistrée sur le site. Consultez ${adminOrigin}${inbox} pour la traiter.`,
      }),
    });
    if (!response.ok) throw new Error(`FormSubmit HTTP ${response.status}`);
    const result: { success?: boolean | string; message?: string } = await response.json();
    if (result.success === true || result.success === 'true') return true;
    if (typeof result.message === 'string' && /needs activation/i.test(result.message)) {
      console.info('[Inquiry notification] Awaiting the recipient’s FormSubmit activation. The inquiry is saved in the CRM.');
      return false;
    }
    throw new Error('FormSubmit did not accept the notification');
  } catch (error) {
    // The CRM save already succeeded. An email outage must not lose the inquiry.
    console.error('[Inquiry notification] Email alert failed:', error);
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
}
