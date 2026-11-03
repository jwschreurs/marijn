'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ArticleBody } from '@/components/ArticleBody';
import { isSafeArticleLink, plainTextToRich, richTextToPlain, type RichNode } from '@/lib/rich-text';

type Props = { body: string; richBody?: RichNode; required: boolean; disabled: boolean; onChange: (value: { body: string; richBody: RichNode }) => void };

export function BlogEditor({ body, richBody, required, disabled, onChange }: Props) {
  const id = useId();
  const lastEmitted = useRef('');
  const [linkSelection, setLinkSelection] = useState<{ from: number; to: number } | null>(null);
  const [href, setHref] = useState('');
  const [linkError, setLinkError] = useState('');
  const linkInput = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [StarterKit.configure({
      blockquote: false, code: false, codeBlock: false, horizontalRule: false, strike: false, underline: false,
      heading: { levels: [2, 3] },
      link: { openOnClick: false, autolink: false, linkOnPaste: true, isAllowedUri: isSafeArticleLink, HTMLAttributes: { target: null, rel: null } },
    })],
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    content: richBody ?? plainTextToRich(body),
    editable: !disabled,
    editorProps: { attributes: {
      class: 'blog-prose blog-input', role: 'textbox', 'aria-multiline': 'true',
      'aria-labelledby': `${id}-label`, 'aria-describedby': `${id}-help`, 'aria-required': String(required),
    } },
    onUpdate: ({ editor }) => {
      // Tiptap only emits the configured schema. The server validates it again before storage.
      const document = editor.getJSON() as RichNode;
      lastEmitted.current = JSON.stringify(document);
      onChange({ body: richTextToPlain(document), richBody: document });
    },
  });

  useEffect(() => {
    if (!editor) return;
    const document = richBody ?? plainTextToRich(body);
    const serialized = JSON.stringify(document);
    if (serialized !== lastEmitted.current) {
      editor.commands.setContent(document, { emitUpdate: false });
      lastEmitted.current = serialized;
    }
  }, [editor, body, richBody]);

  useEffect(() => { editor?.setEditable(!disabled); }, [editor, disabled]);
  useEffect(() => { if (linkSelection) linkInput.current?.focus(); }, [linkSelection]);

  function openLink() {
    if (!editor) return;
    const current: unknown = editor.getAttributes('link').href;
    setHref(typeof current === 'string' ? current : '');
    setLinkError('');
    setLinkSelection({ from: editor.state.selection.from, to: editor.state.selection.to });
  }
  function applyLink() {
    if (!editor || !linkSelection) return;
    const value = href.trim();
    if (!isSafeArticleLink(value)) { setLinkError('Vul een volledig webadres in, bijvoorbeeld https://voorbeeld.nl, of een intern pad zoals /contact.'); return; }
    const chain = editor.chain().focus().setTextSelection(linkSelection).extendMarkRange('link');
    if (linkSelection.from === linkSelection.to && !editor.isActive('link')) {
      chain.insertContent({ type: 'text', text: value, marks: [{ type: 'link', attrs: { href: value } }] }).run();
    } else chain.setLink({ href: value }).run();
    setLinkSelection(null);
  }

  return <div className="blog-editor">
    <span id={`${id}-label`} className="blog-editor-label">Artikel</span>
    <p id={`${id}-help`} className="muted">Selecteer tekst en kies opmaak. Enter maakt een nieuwe alinea; Shift+Enter een nieuwe regel. Ondersteunde opmaak uit geplakte tekst blijft behouden.</p>
    <fieldset className="blog-controls" disabled={disabled || !editor}>
      <legend className="sr-only">Artikelopmaak</legend>
      <div className="blog-format-buttons" role="group" aria-label="Tekstopmaak">
        <button type="button" aria-pressed={editor?.isActive('bold') ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBold().run()}><strong>Vet</strong></button>
        <button type="button" aria-pressed={editor?.isActive('italic') ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleItalic().run()}><em>Cursief</em></button>
        <button type="button" aria-pressed={editor?.isActive('heading', { level: 2 }) ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>Tussenkop</button>
        <button type="button" aria-pressed={editor?.isActive('heading', { level: 3 }) ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>Kleine tussenkop</button>
        <button type="button" aria-pressed={editor?.isActive('bulletList') ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBulletList().run()}>Opsomming</button>
        <button type="button" aria-pressed={editor?.isActive('orderedList') ?? false} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>Genummerde lijst</button>
        <button type="button" aria-expanded={!!linkSelection} onMouseDown={e => e.preventDefault()} onClick={openLink}>Link</button>
        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}>Opmaak wissen</button>
        <button type="button" disabled={!editor?.can().undo()} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().undo().run()}>Ongedaan maken</button>
        <button type="button" disabled={!editor?.can().redo()} onMouseDown={e => e.preventDefault()} onClick={() => editor?.chain().focus().redo().run()}>Opnieuw</button>
      </div>
      {linkSelection && <div className="blog-link-panel" role="group" aria-label="Link instellen">
        <label>Linkadres<input ref={linkInput} type="text" value={href} maxLength={2000} onChange={e => setHref(e.target.value)} onKeyDown={e => {
          if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
          if (e.key === 'Escape') { setLinkSelection(null); editor?.commands.focus(); }
        }} /></label>
        <div className="blog-format-buttons">
          <button type="button" onClick={applyLink}>Link toepassen</button>
          <button type="button" onClick={() => { editor?.chain().focus().setTextSelection(linkSelection).extendMarkRange('link').unsetLink().run(); setLinkSelection(null); }}>Link verwijderen</button>
          <button type="button" onClick={() => { setLinkSelection(null); editor?.commands.focus(); }}>Annuleren</button>
        </div>
        {linkError && <p role="alert" className="admin-error">{linkError}</p>}
      </div>}
    </fieldset>
    {!editor && <p>Teksteditor laden…</p>}
    <EditorContent editor={editor} />
    <p className={body.length > 30000 ? 'admin-error' : 'muted'}>{body.length.toLocaleString('nl-NL')} / 30.000 tekens{body.length > 30000 ? ' — kort de tekst in voordat je opslaat.' : ''}</p>
    <details className="blog-preview"><summary>Voorbeeld van het artikel</summary><ArticleBody body={body} richBody={richBody} /></details>
  </div>;
}
