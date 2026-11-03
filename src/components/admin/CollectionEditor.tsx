'use client';

import type { BlogPost, CollectionKind, FaqItem } from '@/lib/articles';
import { BlogEditor } from './BlogEditor';
import { ArticleBody } from '@/components/ArticleBody';

type Props = { kind: CollectionKind; value: string; disabled?: boolean; onChange: (value: string) => void };

export function CollectionEditor({ kind, value, disabled = false, onChange }: Props) {
  // Values originate in validated server data or in this editor; incomplete edits stay local.
  const items: (FaqItem | BlogPost)[] = JSON.parse(value);
  const update = (id: string, changes: Partial<FaqItem & BlogPost>) => onChange(JSON.stringify(items.map(item => item.id === id ? { ...item, ...changes } : item)));
  function add() {
    const id = crypto.randomUUID();
    const item = kind === 'faq' ? { id, question: '', answer: '' } : {
      id, title: '', slug: `bericht-${id}`, summary: '', body: '',
      date: new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Amsterdam' }).format(new Date()), published: false,
    };
    onChange(JSON.stringify([...items, item]));
  }
  return <section className="collection-editor">
    <h3>{kind === 'faq' ? 'Vragen en antwoorden' : 'Blogberichten'}</h3>
    <p>{kind === 'faq' ? 'Voeg vragen toe en pas de antwoorden aan.' : 'Sla berichten op als concept of maak ze zichtbaar op de website. Een lege regel begint een nieuwe alinea. De datum bepaalt de volgorde, niet het moment van publiceren.'} Wijzigingen worden opgeslagen met de knop bovenaan.</p>
    {items.map((item, index) => <fieldset className="admin-field collection-item" key={item.id}>
      <legend>{kind === 'faq' ? `Vraag ${index + 1}` : `Bericht ${index + 1}`}</legend>
      {'question' in item ? <>
        <label>Vraag<input value={item.question} maxLength={300} required onChange={e => update(item.id, { question: e.target.value })} /></label>
        <label>Antwoord<textarea value={item.answer} rows={5} maxLength={5000} required onChange={e => update(item.id, { answer: e.target.value })} /></label>
      </> : <>
        <label>Titel<input value={item.title} maxLength={200} required onChange={e => update(item.id, { title: e.target.value })} /></label>
        <label>Webadres: /blog/<input value={item.slug} maxLength={120} required pattern="[a-z0-9]+(-[a-z0-9]+)*" onChange={e => update(item.id, { slug: e.target.value })} /></label>
        <p className="muted">Gebruik kleine letters, cijfers en streepjes, bijvoorbeeld aandacht-in-het-dagelijks-leven. Wijzig dit adres niet nadat je het hebt gedeeld.</p>
        <label>Datum<input type="date" required value={item.date} onChange={e => update(item.id, { date: e.target.value })} /></label>
        <label>Samenvatting<textarea rows={3} value={item.summary} maxLength={1000} required={item.published} onChange={e => update(item.id, { summary: e.target.value })} /></label>
        <BlogEditor body={item.body} richBody={item.richBody} required={item.published} disabled={disabled} onChange={changes => update(item.id, changes)} />
        <label>Status<select value={item.published ? 'published' : 'draft'} onChange={e => update(item.id, { published: e.target.value === 'published' })}>
          <option value="draft">Concept — alleen zichtbaar in beheer</option>
          <option value="published">Gepubliceerd — zichtbaar na opslaan</option>
        </select></label>
      </>}
      <div className="admin-actions">
        {kind === 'faq' && <button type="button" className="button secondary" disabled={index === 0} onClick={() => {
          const reordered = [...items];
          [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
          onChange(JSON.stringify(reordered));
        }}>Omhoog</button>}
        <button type="button" className="button secondary" onClick={() => {
          if (window.confirm('Dit item verwijderen? De verwijdering wordt pas doorgevoerd wanneer je de wijzigingen opslaat.')) onChange(JSON.stringify(items.filter(other => other.id !== item.id)));
        }}>Verwijderen</button>
      </div>
    </fieldset>)}
    <button className="button secondary" type="button" disabled={items.length >= 100} onClick={add}>{kind === 'faq' ? 'Vraag toevoegen' : 'Blogbericht toevoegen'}</button>
  </section>;
}

export function CollectionPreview({ value }: { value: string }) {
  const items: (FaqItem | BlogPost)[] = JSON.parse(value);
  return <div>{items.length ? items.map(item => <div key={item.id}>
    <h4>{'question' in item ? item.question : item.title}</h4>
    {'question' in item ? <p>{item.answer}</p> : <>
      <p>{item.published ? 'Gepubliceerd' : 'Concept'} · {item.date} · /blog/{item.slug}</p>
      <p>{item.summary}</p><ArticleBody body={item.body} richBody={item.richBody} />
    </>}
  </div>) : <p>Geen items.</p>}</div>;
}
