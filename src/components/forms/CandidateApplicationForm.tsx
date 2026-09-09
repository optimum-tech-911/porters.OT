import { useState, type SubmitEvent } from 'react';
import { crmAttribution } from '../../lib/crm-attribution';
import { supabase } from '../../lib/supabase';

const profiles = [
  'Infrastructure',
  'Cloud & DevOps',
  'Data & IA',
  'Cybersécurité',
  'Product & Agile',
  'Autre profil IT',
];

export default function CandidateApplicationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    profile: '',
    availability: '',
    linkedin: '',
    message: '',
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; text: string }>({ type: 'idle', text: '' });

  const update = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    setForm((current) => ({ ...current, [event.target.name]: value }));
  };

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: 'idle', text: 'Transmission sécurisée de votre candidature…' });

    const { error } = await supabase.from('crm_inquiries').insert({
      kind: 'contact',
      inquiry_type: 'application',
      source: 'website',
      status: 'new',
      priority: 'medium',
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      company: null,
      profile: form.profile,
      subject: `Candidature web — ${form.profile}`,
      message: form.message.trim(),
      consent: form.consent,
      metadata: {
        requestType: 'application',
        city: form.city.trim() || null,
        availability: form.availability.trim() || null,
        linkedin: form.linkedin.trim() || null,
      },
      ...crmAttribution(),
    });

    setSubmitting(false);
    if (error) {
      console.error('[Candidate application] Unable to save inquiry:', error);
      setStatus({ type: 'error', text: 'L’envoi a échoué. Réessayez ou écrivez à contact@porters.fr.' });
      return;
    }

    setForm({ name: '', email: '', phone: '', city: '', profile: '', availability: '', linkedin: '', message: '', consent: false });
    setStatus({ type: 'success', text: 'Merci. Votre candidature a bien été transmise à notre équipe.' });
  };

  return <form className="candidate-form" onSubmit={submit}>
    <fieldset className="candidate-form__profiles">
      <legend>Votre domaine principal *</legend>
      <div>
        {profiles.map((profile) => <label key={profile}>
          <input type="radio" name="profile" value={profile} checked={form.profile === profile} onChange={update} required />
          <span>{profile}</span>
        </label>)}
      </div>
    </fieldset>

    <div className="candidate-form__grid">
      <label>Nom complet *
        <input className="form-input" name="name" value={form.name} onChange={update} autoComplete="name" minLength={2} maxLength={160} required />
      </label>
      <label>Email *
        <input className="form-input" type="email" name="email" value={form.email} onChange={update} autoComplete="email" maxLength={320} required />
      </label>
      <label>Téléphone
        <input className="form-input" type="tel" name="phone" value={form.phone} onChange={update} autoComplete="tel" maxLength={60} />
      </label>
      <label>Ville ou zone de recherche
        <input className="form-input" name="city" value={form.city} onChange={update} autoComplete="address-level2" maxLength={120} />
      </label>
      <label>Disponibilité
        <input className="form-input" name="availability" value={form.availability} onChange={update} placeholder="Immédiate, sous 1 mois…" maxLength={160} />
      </label>
      <label>Profil LinkedIn
        <input className="form-input" type="url" name="linkedin" value={form.linkedin} onChange={update} placeholder="https://linkedin.com/in/…" maxLength={700} />
      </label>
    </div>

    <label>Votre recherche *
      <textarea className="form-input" name="message" value={form.message} onChange={update} rows={5} minLength={5} maxLength={5000} placeholder="Métier recherché, environnement technique, mobilité, type de mission…" required />
    </label>

    <p className="candidate-form__cv-note">Vous pourrez transmettre votre CV directement à la personne qui reprend votre candidature.</p>

    <label className="candidate-form__consent">
      <input type="checkbox" name="consent" checked={form.consent} onChange={update} required />
      <span>J’accepte que The Porters utilise ces informations pour traiter ma candidature. <a href="/confidentialite">Politique de confidentialité</a>.</span>
    </label>

    {status.text && <p className={`candidate-form__status candidate-form__status--${status.type}`} role="status" aria-live="polite">{status.text}</p>}

    <button className="btn btn-primary candidate-form__submit" type="submit" disabled={submitting}>
      {submitting ? 'Envoi en cours…' : 'Envoyer ma candidature'} <span aria-hidden="true">→</span>
    </button>
  </form>;
}
