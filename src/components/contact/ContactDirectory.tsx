import { useEffect, useState } from 'react';
import {
  CONTACT_DIRECTORY_KEY,
  CONTACT_DIRECTORY_ROUTE,
  defaultContactDirectory,
  parseContactDirectory,
  type ContactDirectorySettings,
} from '../../data/contact-directory';
import { safeWebUrl } from '../../data/site-notifications';
import { watchPublishedSettings } from '../../lib/published-settings';

function MailIcon() {
  return <svg className="w-6 h-6 text-porters-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>;
}

export default function ContactDirectory({ preview }: { preview?: ContactDirectorySettings }) {
  const [published, setPublished] = useState(defaultContactDirectory);
  const settings = preview ?? published;

  useEffect(() => {
    if (preview) return;
    return watchPublishedSettings(CONTACT_DIRECTORY_KEY, parseContactDirectory, setPublished);
  }, [preview]);

  return <div
    className="lg:col-span-2 space-y-12 reveal"
    data-cms-key={CONTACT_DIRECTORY_KEY}
    data-cms-route={CONTACT_DIRECTORY_ROUTE}
    data-cms-element-type="paragraph"
    data-cms-structured-editor="/admin/contact-directory"
    data-cms-structured-label="Modifier les coordonnées et agences →"
  >
    {(settings.generalHeading || settings.generalEmail) && <div>
      {settings.generalHeading && <h3 className="text-xl font-heading font-semibold text-porters-navy mb-6">{settings.generalHeading}</h3>}
      {settings.generalEmail && <div className="space-y-4 text-porters-black/70">
        <div className="flex items-start gap-4">
          <MailIcon />
          <div>
            <p className="font-medium text-porters-navy">Email</p>
            <a href={`mailto:${settings.generalEmail}`} className="hover:text-porters-gold transition-colors">{settings.generalEmail}</a>
          </div>
        </div>
      </div>}
    </div>}

    {(settings.agenciesHeading || settings.agencies.length > 0 || (settings.directoryLinkLabel && settings.directoryLinkHref)) && <div>
      {settings.agenciesHeading && <h3 className="text-xl font-heading font-semibold text-porters-navy mb-6">{settings.agenciesHeading}</h3>}
      {settings.agencies.length > 0 && <div className="space-y-6">
        {settings.agencies.map((agency) => <div className="border-l-2 border-porters-gold/30 pl-4" key={agency.id}>
          {agency.href
            ? <a href={safeWebUrl(agency.href) || undefined} className="font-heading font-semibold text-porters-navy hover:text-porters-gold transition-colors block mb-1">{agency.name}</a>
            : <p className="font-heading font-semibold text-porters-navy block mb-1">{agency.name}</p>}
          {agency.address && <p className="text-sm text-porters-black/60 mb-2">{agency.address}</p>}
          {(agency.phone || agency.email) && <div className="flex flex-wrap items-center gap-4 text-sm">
            {agency.phone && <a href={`tel:${agency.phone.replace(/\s+/g, '')}`} className="text-porters-navy hover:text-porters-gold transition-colors">{agency.phone}</a>}
            {agency.phone && agency.email && <span className="text-porters-black/20">|</span>}
            {agency.email && <a href={`mailto:${agency.email}`} className="text-porters-navy hover:text-porters-gold transition-colors">{agency.email}</a>}
          </div>}
        </div>)}
      </div>}
      {settings.directoryLinkLabel && settings.directoryLinkHref && <div className="mt-6">
        <a href={safeWebUrl(settings.directoryLinkHref) || undefined} className="text-sm font-medium text-porters-navy hover:text-porters-gold transition-colors inline-flex items-center gap-1">
          {settings.directoryLinkLabel}
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>}
    </div>}
  </div>;
}
