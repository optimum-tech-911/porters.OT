import { useState, type SubmitEvent } from 'react';
import { crmAttribution } from '../../lib/crm-attribution';
import { supabase } from '../../lib/supabase';

type CmsBinding = Record<string, string>;

type AppointmentTopic = {
  value: string;
  title: string;
  meta?: string;
  description?: string;
  /**
   * This island renders after both CMS discovery passes have run, so its text
   * can never receive an automatic key. The page supplies explicit ones instead,
   * which is what makes these blocks editable in the visual editor.
   */
  titleCms?: CmsBinding;
  metaCms?: CmsBinding;
  descriptionCms?: CmsBinding;
};

type ContactFormProps = {
  appointmentTopics?: AppointmentTopic[];
  requestAvailability?: boolean;
  /**
   * Field labels are rendered by this island, i.e. after both CMS discovery
   * passes. They only become editable if the page hands them explicit keys.
   */
  labelCms?: Record<string, Record<string, string>>;
};

export default function ContactForm({
  appointmentTopics = [],
  labelCms = {},
  requestAvailability = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    appointmentTopic: '',
    availability: '',
    message: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ state: 'idle' | 'success' | 'error'; text: string }>({ state: 'idle', text: '' });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profile = formData.subject === 'consultant'
      ? 'Consultant / Indépendant'
      : formData.subject === 'entreprise'
        ? 'Entreprise'
        : 'Autre';
    const emailSubject = formData.appointmentTopic
      ? `Demande de rendez-vous — ${formData.appointmentTopic}`
      : `Demande de contact — ${profile}`;
    const inquiryType = formData.appointmentTopic
      ? 'appointment'
      : formData.subject === 'consultant' && /cdi|emploi|poste|candidat/i.test(formData.message)
        ? 'application'
        : 'contact';
    setSubmitting(true);
    setStatus({ state: 'idle', text: 'Enregistrement sécurisé de votre demande…' });
    const { error } = await supabase.from('crm_inquiries').insert({
      kind: 'contact',
      inquiry_type: inquiryType,
      source: 'website',
      status: 'new',
      priority: inquiryType === 'appointment' || formData.subject === 'entreprise' ? 'high' : 'medium',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      company: formData.company.trim() || null,
      profile,
      subject: emailSubject,
      message: formData.message.trim(),
      consent: formData.consent,
      metadata: { requestType: inquiryType, appointmentTopic: formData.appointmentTopic || null, availability: formData.availability || null },
      ...crmAttribution(),
    });
    setSubmitting(false);
    if (error) {
      console.error('[Contact] Unable to save inquiry:', error);
      setStatus({ state: 'error', text: 'L’envoi a échoué. Réessayez ou écrivez à contact@porters.fr.' });
      return;
    }
    setFormData({ name: '', email: '', phone: '', company: '', subject: '', appointmentTopic: '', availability: '', message: '', consent: false });
    setStatus({ state: 'success', text: 'Merci. Votre demande a bien été transmise à notre équipe.' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {appointmentTopics.length > 0 && (
        <fieldset>
          <legend className="form-label mb-3">Sujet du rendez-vous *</legend>
          <div className="grid gap-3">
            {appointmentTopics.map((topic) => (
              <label
                key={topic.value}
                className="flex cursor-pointer items-start gap-4 rounded-lg border border-porters-navy/10 bg-porters-navy/[0.02] p-4 transition-colors hover:border-porters-gold/50 has-[:checked]:border-porters-gold has-[:checked]:bg-porters-gold/[0.06]"
              >
                <input
                  type="radio"
                  name="appointmentTopic"
                  value={topic.value}
                  checked={formData.appointmentTopic === topic.value}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span>
                  <span className="block font-heading font-semibold text-porters-navy" {...(topic.titleCms || {})}>{topic.title}</span>
                  {topic.meta && (
                    <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.14em] text-porters-gold">
                      <span {...(topic.metaCms || {})}>{topic.meta}</span>
                    </span>
                  )}
                  {topic.description && (
                    <span className="mt-2 block text-sm leading-relaxed text-porters-black/60" {...(topic.descriptionCms || {})}>
                      {topic.description}
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">
            <span {...(labelCms.name || {})}>Nom complet *</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            minLength={2}
            maxLength={160}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            <span {...(labelCms.email || {})}>Email *</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={320}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="form-label">
            <span {...(labelCms.phone || {})}>Téléphone</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="06 00 00 00 00"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            maxLength={60}
          />
        </div>
        <div>
          <label htmlFor="company" className="form-label">
            <span {...(labelCms.company || {})}>Société (optionnel)</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="form-input"
            placeholder="Nom de votre société"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            maxLength={180}
          />
        </div>
      </div>

      {requestAvailability && (
        <div>
          <label htmlFor="availability" className="form-label">
            <span {...(labelCms.availability || {})}>Vos disponibilités *</span>
          </label>
          <textarea
            id="availability"
            name="availability"
            className="form-input"
            rows={3}
            placeholder="Par exemple : mardi après 14 h, jeudi matin, ou la semaine prochaine à distance."
            value={formData.availability}
            onChange={handleChange}
            required
            maxLength={1000}
            style={{ resize: 'vertical' }}
          />
        </div>
      )}

      <div>
        <label htmlFor="subject" className="form-label">
          <span {...(labelCms.profile || {})}>Vous êtes *</span>
        </label>
        <select
          id="subject"
          name="subject"
          className="form-input"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez votre profil</option>
          <option value="consultant">Consultant / Indépendant</option>
          <option value="entreprise">Entreprise</option>
          <option value="autre">Autre</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          <span {...(labelCms.message || {})}>Message *</span>
        </label>
        <textarea
          id="message"
          name="message"
          className="form-input"
          rows={5}
          placeholder="Décrivez votre projet ou posez-nous vos questions..."
          value={formData.message}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={5000}
          style={{ resize: 'vertical' }}
        />
      </div>

      <label className="flex items-start gap-3 rounded-lg bg-porters-navy/[0.035] p-4 text-xs leading-relaxed text-porters-black/60">
        <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required className="mt-1 accent-porters-gold" />
        <span>J’accepte que The Porters utilise ces informations pour répondre à ma demande. Consultez notre{' '}
        <a href="/confidentialite" className="form-help-link">
          politique de confidentialité
        </a>
        .</span>
      </label>

      {status.text && <p className={`text-sm ${status.state === 'error' ? 'text-red-700' : status.state === 'success' ? 'text-green-700' : 'text-porters-black/60'}`} role="status" aria-live="polite">{status.text}</p>}

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={submitting}
      >
        <span {...(labelCms.submit || {})}>{submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
