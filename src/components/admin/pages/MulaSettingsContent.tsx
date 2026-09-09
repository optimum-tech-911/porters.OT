import AdminPageHeader from '../AdminPageHeader';
import CmsSettingsPanel from '../CmsSettingsPanel';
import MulaSimulator from '../../forms/MulaSimulator';
import { defaultMulaSettings, MULA_SETTINGS_KEY, parseMulaSettings, simulatorModes, type ControlState } from '../../../data/mula-settings';

export default function MulaSettingsContent() {
  return <div><AdminPageHeader title="Simulateur" subtitle="Parcours, frais, champs et résultats du simulateur public." />
    <CmsSettingsPanel contentKey={MULA_SETTINGS_KEY} route="/simulateur" defaults={defaultMulaSettings} parse={parseMulaSettings}>
      {(value, change) => <>
        <div className="site-settings__card">
          <label className="site-settings__check"><input type="checkbox" checked={value.enabled} onChange={(e) => change({ ...value, enabled: e.target.checked })} />Activer le simulateur</label>
          <div className="site-settings__grid">
            <label>Identifiant public de la source MULA<input value={value.sourceSerial} maxLength={32} onChange={(e) => change({ ...value, sourceSerial: e.target.value.toUpperCase() })} /></label>
            <label>Parcours par défaut<select value={value.defaultMode} onChange={(e) => change({ ...value, defaultMode: e.target.value as typeof value.defaultMode })}>{simulatorModes.map((mode) => <option key={mode.id} value={mode.id}>{mode.label}</option>)}</select></label>
          </div>
          <p>Les calculs utilisent le moteur de votre source MULA. Les frais ci-dessous sont transmis à chaque calcul. Les cotisations sociales, plafonds et paramètres de paie se règlent dans votre compte MULA.</p>
        </div>
        <div className="site-settings__card"><h2>Onglets</h2><div className="site-settings__grid">{simulatorModes.map((mode) => <label key={mode.id}>{mode.label}<select value={value.modes[mode.id]} onChange={(e) => change({ ...value, modes: { ...value.modes, [mode.id]: e.target.value as ControlState } })}><option value="enabled">Actif</option><option value="disabled">Visible, désactivé</option><option value="hidden">Masqué</option></select></label>)}</div></div>
        <div className="site-settings__card"><h2>Valeurs et verrouillage des champs</h2><p>Un champ verrouillé ou masqué utilise toujours la valeur publiée ici.</p>
          {([['managementFee', 'Frais de gestion (%)', 0, 50], ['fixedFee', 'Frais de gestion fixes (€)', 0, 10000], ['expenses', 'Frais non refacturables (€)', 0, 100000], ['days', 'Nombre de jours', 1, 31]] as const).map(([key, label, min, max]) => <div className="site-settings__grid" key={key}><label>{label}<input type="number" step="any" min={min} max={max} value={value[key]} onChange={(e) => change({ ...value, [key]: Number(e.target.value) })} /></label><label>Comportement<select value={value.fields[key]} onChange={(e) => change({ ...value, fields: { ...value.fields, [key]: e.target.value as ControlState } })}><option value="enabled">Modifiable par le visiteur</option><option value="disabled">Visible, verrouillé</option><option value="hidden">Masqué</option></select></label></div>)}
          <div className="site-settings__grid"><label>Contrat par défaut<select value={value.contract} onChange={(e) => change({ ...value, contract: e.target.value as 'CDI' | 'CDD' })}><option>CDI</option><option>CDD</option></select></label><label>Champ contrat<select value={value.fields.contract} onChange={(e) => change({ ...value, fields: { ...value.fields, contract: e.target.value as ControlState } })}><option value="enabled">Modifiable</option><option value="disabled">Verrouillé</option><option value="hidden">Masqué</option></select></label></div>
          {(['allowCDI', 'allowCDD'] as const).map((key) => <label key={key} className="site-settings__check"><input type="checkbox" checked={value[key]} onChange={(e) => change({ ...value, [key]: e.target.checked })} />Autoriser le {key === 'allowCDI' ? 'CDI' : 'CDD'}</label>)}
        </div>
        <div className="site-settings__card"><h2>Boutons et résultats</h2>{([['calculateEnabled', 'Activer le bouton Calculer'], ['showResults', 'Afficher les montants du résultat'], ['showDetails', 'Afficher le détail des montants'], ['pdfEnabled', 'Autoriser le téléchargement PDF'], ['contactEnabled', 'Afficher le lien de contact'], ['leadCaptureEnabled', 'Enregistrer les demandes liées aux simulations']] as const).map(([key, label]) => <label key={key} className="site-settings__check"><input type="checkbox" checked={value[key]} onChange={(e) => change({ ...value, [key]: e.target.checked })} />{label}</label>)}<small>La source MULA peut également restreindre les résultats. Le PDF est proposé uniquement lorsque les montants sont visibles.</small></div>
        <div className="site-settings__card"><h2>Textes</h2>{([['title', 'Titre', 150], ['description', 'Introduction', 500], ['disclaimer', 'Mention sous le calcul', 500], ['contactLabel', 'Texte du lien de contact', 80], ['contactHref', 'Destination du contact', 700], ['leadTitle', 'Titre du formulaire de suivi', 150], ['leadSubmitLabel', 'Texte du bouton de suivi', 80]] as const).map(([key, label, max]) => <label key={key}>{label}<input value={value[key]} maxLength={max} onChange={(e) => change({ ...value, [key]: e.target.value })} /></label>)}</div>
        <div className="site-settings__card"><h2>Aperçu de l’interface</h2><MulaSimulator preview={value} /></div>
      </>}
    </CmsSettingsPanel>
  </div>;
}
