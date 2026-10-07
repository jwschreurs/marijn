'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { publishContent } from '@/app/beheer/actions';
import type { ContentField, ContentOverrides } from '@/lib/content-schema';

type Props = { fields: ContentField[]; revision: number; updatedAt: string | null };
export function ContentEditor({ fields, revision: initialRevision, updatedAt: initialUpdatedAt }: Props) {
  const initialValues = Object.fromEntries(fields.map(field => [field.id, field.value]));
  const [values, setValues] = useState<ContentOverrides>(initialValues);
  const [saved, setSaved] = useState<ContentOverrides>(initialValues);
  const [revision, setRevision] = useState(initialRevision);
  const [updatedAt, setUpdatedAt] = useState(initialUpdatedAt);
  const [group, setGroup] = useState('Homepage');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();
  const groups = [...new Set(fields.map(field => field.group))];
  const changed = fields.filter(field => values[field.id] !== saved[field.id]);
  const dirty = changed.length > 0;
  const visible = useMemo(() => fields.filter(field => {
    const matches = (field.label + ' ' + values[field.id] + ' ' + field.group).toLocaleLowerCase('nl').includes(query.toLocaleLowerCase('nl'));
    return query ? matches : field.group === group;
  }), [fields, values, query, group]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ''; };
    const leave = (event: Event) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest('a');
      const isNavigation = anchor && anchor.target !== '_blank' && !anchor.getAttribute('href')?.startsWith('#');
      const isLogout = event.type === 'submit' && target?.closest('[data-admin-logout]');
      if ((isNavigation || isLogout) && !window.confirm('Je hebt ongepubliceerde wijzigingen. Wil je deze pagina toch verlaten?')) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener('beforeunload', warn);
    document.addEventListener('click', leave, true);
    document.addEventListener('submit', leave, true);
    return () => {
      window.removeEventListener('beforeunload', warn);
      document.removeEventListener('click', leave, true);
      document.removeEventListener('submit', leave, true);
    };
  }, [dirty]);

  function publish() {
    const edits = Object.fromEntries(changed.map(field => [field.id, values[field.id]]));
    const submitted = { ...values };
    setError(''); setMessage('');
    startTransition(async () => {
      try {
        const result = await publishContent(edits, revision);
        if (!result.ok) { setError(result.error); return; }
        setSaved(submitted);
        setRevision(result.revision);
        setUpdatedAt(result.updatedAt);
        setMessage('Je wijzigingen zijn gepubliceerd. Ze zijn zichtbaar wanneer je de website opnieuw opent of ververst.');
      } catch {
        setError('De verbinding is verbroken. Je wijzigingen staan nog in dit venster. Probeer opnieuw te publiceren.');
      }
    });
  }

  return <div className="admin-editor">
    <div className="admin-toolbar">
      <p aria-live="polite">{dirty ? changed.length + ' gewijzigde tekst' + (changed.length === 1 ? '' : 'en') : 'Alle teksten zijn bijgewerkt.'}</p>
      <button className="button primary" type="button" disabled={!dirty || pending} onClick={publish}>
        {pending ? 'Publiceren…' : 'Wijzigingen publiceren'}
      </button>
    </div>
    <div aria-live="polite">
      {message && <p className="admin-success" role="status">{message}</p>}
      {error && <div className="admin-error" role="alert"><p>{error}</p>
        <a className="text-link" href="/beheer/inloggen" target="_blank" rel="noreferrer">Open de login in een nieuw tabblad</a>
      </div>}
    </div>
    {updatedAt && <p className="muted">Laatst gepubliceerd: {new Date(updatedAt).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}</p>}
    <fieldset disabled={pending} className="admin-fields">
      <legend className="sr-only">Websiteteksten aanpassen</legend>
      <div className="admin-filters">
        <label>Pagina of onderdeel
          <select value={group} onChange={event => { setGroup(event.target.value); setQuery(''); }}>
            {groups.map(name => <option key={name}>{name}</option>)}
          </select>
        </label>
        <label>Zoek in alle teksten
          <input type="search" value={query} placeholder="Bijvoorbeeld: training of tarief" onChange={event => setQuery(event.target.value)} />
        </label>
      </div>
      {dirty && <details className="admin-review"><summary>Bekijk je wijzigingen ({changed.length})</summary>
        {changed.map(field => <div key={field.id} className="admin-change">
          <h3>{field.group} — {field.label}</h3>
          <p><strong>Nu online:</strong> {saved[field.id]}</p>
          <p><strong>Na publiceren:</strong> {values[field.id]}</p>
          <button className="text-link" type="button" onClick={() => setValues(current => ({ ...current, [field.id]: saved[field.id] }))}>Wijziging terugnemen</button>
        </div>)}
      </details>}
      <h2>{query ? 'Zoekresultaten' : group}</h2>
      {!visible.length && <p>Geen teksten gevonden.</p>}
      <div className="admin-field-list">
        {visible.map(field => <label key={field.id} className="admin-field" htmlFor={field.id}>
          <span>{query ? field.group + ' — ' : ''}{field.label}{values[field.id] !== saved[field.id] ? ' · gewijzigd' : ''}</span>
          {field.multiline
            ? <textarea id={field.id} rows={5} value={values[field.id]} maxLength={5000} onChange={event => setValues(current => ({ ...current, [field.id]: event.target.value }))} />
            : <input id={field.id} type={field.id === 'siteConfig.email' ? 'email' : 'text'} value={values[field.id]} maxLength={5000} onChange={event => setValues(current => ({ ...current, [field.id]: event.target.value }))} />}
        </label>)}
      </div>
    </fieldset>
  </div>;
}
