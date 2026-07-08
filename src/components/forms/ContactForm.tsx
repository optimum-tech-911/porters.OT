import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const profile = formData.subject === 'consultant'
      ? 'Consultant / Indépendant'
      : formData.subject === 'entreprise'
        ? 'Entreprise'
        : 'Autre';
    const body = [
      `Nom : ${formData.name}`,
      `Email : ${formData.email}`,
      `Téléphone : ${formData.phone || 'Non renseigné'}`,
      `Société : ${formData.company || 'Non renseignée'}`,
      `Profil : ${profile}`,
      '',
      formData.message,
    ].join('\n');

    window.location.href = `mailto:contact@porters.fr?subject=${encodeURIComponent(`Demande de contact — ${profile}`)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">
            Nom complet *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Votre nom"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="votre@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="form-label">
            Téléphone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            placeholder="06 00 00 00 00"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="company" className="form-label">
            Société (optionnel)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="form-input"
            placeholder="Nom de votre société"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="form-label">
          Vous êtes *
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
          Message *
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
          style={{ resize: 'vertical' }}
        />
      </div>

      <p className="text-xs" style={{ color: 'rgba(11, 16, 32, 0.5)' }}>
        * Champs obligatoires. Le bouton ouvre votre messagerie avec un email prérempli ; vérifiez-le avant l’envoi. Consultez notre{' '}
        <a href="/confidentialite" className="form-help-link">
          politique de confidentialité
        </a>
        .
      </p>

      <button
        type="submit"
        className="btn btn-primary w-full"
      >
        Préparer l’email
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
