import { useCallback, useEffect, useRef } from 'react';
import { inlineHtmlToPlainText, safeHref, sanitizeInlineHtml } from '../../cms/inline-html';

const ACCENT_CLASS = 'gold-underline';

type Props = {
  value: string;
  /** Bumped by the parent whenever the value changes from outside the field. */
  syncToken: number;
  onChange: (value: string) => void;
};

/**
 * Editing surface for merged text blocks.
 *
 * These blocks store inline HTML so a sentence keeps its accents, line breaks
 * and links through an edit. Showing that markup as raw tags would put the
 * burden of not breaking the design on the editor, so the field is a small
 * WYSIWYG instead: what it shows is what the page renders.
 */
export default function CmsRichTextField({ value, syncToken, onChange }: Props) {
  const fieldRef = useRef<HTMLDivElement>(null);

  // Only re-render the field when the value arrives from outside. Writing
  // innerHTML on every keystroke would collapse the caret to the start.
  useEffect(() => {
    const field = fieldRef.current;
    if (field) field.innerHTML = sanitizeInlineHtml(value);
  }, [syncToken]);

  const emit = useCallback(() => {
    const field = fieldRef.current;
    // Sanitized on the way out but never written back, so the caret stays put.
    if (field) onChange(sanitizeInlineHtml(field.innerHTML));
  }, [onChange]);

  const rangeInField = useCallback(() => {
    const field = fieldRef.current;
    const selection = window.getSelection();
    if (!field || !selection || selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    return field.contains(range.commonAncestorContainer) ? range : null;
  }, []);

  const closestInField = useCallback((node: Node | null, match: (element: Element) => boolean) => {
    const field = fieldRef.current;
    let current: Node | null = node;
    while (current && current !== field) {
      if (current.nodeType === Node.ELEMENT_NODE && match(current as Element)) return current as Element;
      current = current.parentNode;
    }
    return null;
  }, []);

  function unwrap(element: Element) {
    element.replaceWith(...Array.from(element.childNodes));
  }

  function selectRange(range: Range) {
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function toggleInline(tagName: 'strong' | 'em') {
    const range = rangeInField();
    if (!range) return;
    const existing = closestInField(range.commonAncestorContainer, (element) => element.tagName === tagName.toUpperCase());
    if (existing) {
      unwrap(existing);
    } else if (!range.collapsed) {
      const wrapper = document.createElement(tagName);
      wrapper.appendChild(range.extractContents());
      range.insertNode(wrapper);
      range.selectNodeContents(wrapper);
      selectRange(range);
    }
    emit();
  }

  function insertLineBreak() {
    const range = rangeInField();
    if (!range) return;
    range.deleteContents();
    const br = document.createElement('br');
    range.insertNode(br);
    range.setStartAfter(br);
    range.collapse(true);
    selectRange(range);
    emit();
  }

  function insertPlainText(text: string) {
    const range = rangeInField();
    if (!range) return;
    range.deleteContents();
    const fragment = document.createDocumentFragment();
    text.split('\n').forEach((line, index) => {
      if (index > 0) fragment.appendChild(document.createElement('br'));
      fragment.appendChild(document.createTextNode(line));
    });
    const lastNode = fragment.lastChild;
    range.insertNode(fragment);
    if (lastNode) range.setStartAfter(lastNode);
    range.collapse(true);
    selectRange(range);
    emit();
  }

  function toggleAccent() {
    const range = rangeInField();
    if (!range) return;
    const existing = closestInField(range.commonAncestorContainer, (element) => element.classList.contains(ACCENT_CLASS));

    if (existing) {
      unwrap(existing);
    } else if (!range.collapsed) {
      const accent = document.createElement('span');
      accent.className = ACCENT_CLASS;
      accent.appendChild(range.extractContents());
      range.insertNode(accent);
    }
    emit();
  }

  function applyLink() {
    const range = rangeInField();
    if (!range) return;
    const existing = closestInField(range.commonAncestorContainer, (element) => element.tagName === 'A') as HTMLAnchorElement | null;
    const requested = window.prompt('Adresse du lien', existing?.getAttribute('href') || 'https://');
    if (requested === null) return;

    if (!requested.trim()) {
      if (existing) unwrap(existing);
      emit();
      return;
    }

    const href = safeHref(requested);
    if (!href) {
      window.alert('Cette adresse n’est pas acceptée. Utilisez https://, mailto:, tel: ou un chemin interne comme /contact.');
      return;
    }

    if (existing) {
      existing.setAttribute('href', href);
    } else if (!range.collapsed) {
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.appendChild(range.extractContents());
      range.insertNode(link);
    }
    emit();
  }

  function clearFormatting() {
    const field = fieldRef.current;
    if (!field) return;
    field.textContent = inlineHtmlToPlainText(field.innerHTML);
    emit();
  }

  return (
    <div className="cms-rich-field">
      <div className="cms-rich-toolbar" role="toolbar" aria-label="Mise en forme du texte" onMouseDown={(event) => event.preventDefault()}>
        <button type="button" onClick={() => toggleInline('strong')} title="Gras"><b>B</b></button>
        <button type="button" onClick={() => toggleInline('em')} title="Italique"><i>I</i></button>
        <button type="button" className="cms-rich-accent" onClick={toggleAccent} title="Souligné doré">
          <span>A</span>
        </button>
        <button type="button" onClick={applyLink} title="Lien">🔗</button>
        <button type="button" onClick={insertLineBreak} title="Retour à la ligne">↵</button>
        <button type="button" onClick={clearFormatting} title="Supprimer la mise en forme">✕</button>
      </div>

      <div
        ref={fieldRef}
        className="cms-rich-input"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="Contenu du texte"
        onInput={emit}
        onBlur={emit}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;
          // Browsers would otherwise split the block into divs or paragraphs,
          // which this field has no way to represent.
          event.preventDefault();
          insertLineBreak();
        }}
        onPaste={(event) => {
          // Pasted markup from another site would be stripped anyway; taking the
          // plain text keeps what lands in the field and what gets saved identical.
          event.preventDefault();
          insertPlainText(event.clipboardData.getData('text/plain'));
        }}
      />
    </div>
  );
}
