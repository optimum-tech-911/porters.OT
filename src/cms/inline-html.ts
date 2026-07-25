/**
 * Inline markup policy for merged CMS text blocks.
 *
 * A block element that holds nothing but text and inline decoration is stored
 * as one editable unit, so its content is real HTML rather than a plain string.
 * The discovery pass (scripts/generate-cms-registry.mjs), the public runtime
 * (CmsRuntime.astro) and the admin editor all have to agree on which tags and
 * attributes survive a round-trip, so the policy lives here and nowhere else.
 *
 * This module is imported by Node with type stripping, so it must stay free of
 * non-erasable TypeScript syntax and must not touch the DOM at module scope.
 */

/** Tags that may appear inside a merged block and are kept verbatim. */
export const INLINE_TAGS = new Set([
  'a', 'abbr', 'b', 'br', 'code', 'em', 'i', 'mark', 's',
  'small', 'span', 'strong', 'sub', 'sup', 'time', 'u',
]);

/** Tags removed with their contents; unwrapping these would leak code as copy. */
export const DROP_TAGS = new Set([
  'script', 'style', 'iframe', 'object', 'embed', 'noscript',
  'template', 'svg', 'math', 'link', 'meta', 'base', 'title',
]);

const GLOBAL_ATTRIBUTES = new Set([
  'class', 'dir', 'lang', 'title', 'role', 'aria-hidden', 'aria-label',
]);

const ANCHOR_ATTRIBUTES = new Set(['href', 'target', 'rel', 'download']);

/**
 * `style` and every `on*` handler are absent by design. Astro's scoped-style
 * attribute is preserved or merged blocks would lose their component styling.
 */
export function isAllowedAttribute(tag: string, name: string): boolean {
  if (name.startsWith('data-astro-cid-')) return true;
  if (GLOBAL_ATTRIBUTES.has(name)) return true;
  return tag === 'a' && ANCHOR_ATTRIBUTES.has(name);
}

/**
 * Returns a safe href, or null when the value has to be dropped. Control
 * characters are stripped first because browsers ignore them when resolving a
 * scheme, which is how `java\nscript:` slips past a naive prefix test.
 */
export function safeHref(value: string): string | null {
  const normalized = value.replace(/[\u0000-\u0020\u007f-\u009f]/g, '').trim();
  if (!normalized) return null;
  const scheme = normalized.match(/^([a-z][a-z0-9+.-]*):/i);
  if (scheme && !/^(?:https?|mailto|tel)$/i.test(scheme[1])) return null;
  return normalized;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const VOID_INLINE_TAGS = new Set(['br']);

const TEXT_NODE = 3;
const ELEMENT_NODE = 1;

export function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

/**
 * A parsed tree, reduced to what the policy cares about. Both callers build one
 * of these — the browser from the DOM, the build-time pass from parse5 — so a
 * single emitter produces both, and the two serializations cannot drift.
 */
export type InlineNode = {
  /** null for a text node. */
  tag: string | null;
  text: string;
  attributes: Array<[string, string]>;
  children: InlineNode[];
};

export function serializeInlineNodes(nodes: InlineNode[]): string {
  let output = '';

  for (const node of nodes) {
    if (node.tag === null) {
      output += escapeHtml(node.text);
      continue;
    }
    // Dropped outright, since unwrapping these would surface code as body copy.
    if (DROP_TAGS.has(node.tag)) continue;
    // Anything else that is not inline decoration keeps its text but loses the
    // element, so a stray block tag cannot restructure the page.
    if (!INLINE_TAGS.has(node.tag)) {
      output += serializeInlineNodes(node.children);
      continue;
    }

    let attributes = '';
    for (const [rawName, value] of node.attributes) {
      const name = rawName.toLowerCase();
      if (node.tag === 'a' && name === 'href') {
        const href = safeHref(value);
        if (href) attributes += ` href="${escapeAttribute(href)}"`;
        continue;
      }
      if (isAllowedAttribute(node.tag, name)) attributes += ` ${name}="${escapeAttribute(value)}"`;
    }

    output += `<${node.tag}${attributes}>`;
    if (!VOID_INLINE_TAGS.has(node.tag)) output += `${serializeInlineNodes(node.children)}</${node.tag}>`;
  }

  return output;
}

export function plainTextFromInlineNodes(nodes: InlineNode[]): string {
  return nodes.map((node) => {
    if (node.tag === null) return node.text;
    if (node.tag === 'br') return '\n';
    return plainTextFromInlineNodes(node.children);
  }).join('');
}

function readDomNodes(parent: Node): InlineNode[] {
  const nodes: InlineNode[] = [];

  for (const child of Array.from(parent.childNodes)) {
    if (child.nodeType === TEXT_NODE) {
      nodes.push({ tag: null, text: child.textContent || '', attributes: [], children: [] });
      continue;
    }
    if (child.nodeType !== ELEMENT_NODE) continue;

    const element = child as Element;
    nodes.push({
      tag: element.tagName.toLowerCase(),
      text: '',
      attributes: Array.from(element.attributes).map((attribute) => [attribute.name, attribute.value] as [string, string]),
      children: readDomNodes(element),
    });
  }

  return nodes;
}

/**
 * Parses into a template, whose contents belong to an inert document: no script
 * runs and no resource is fetched while untrusted markup is inspected. Only the
 * parsed tree is read, never re-inserted.
 */
function parseInert(html: string): InlineNode[] {
  const template = document.createElement('template');
  template.innerHTML = html;
  // Browsers park the parsed children on template.content. Server-side DOM
  // implementations used by the verification scripts keep them on the element
  // itself, so take whichever one actually holds them.
  return readDomNodes(template.childNodes.length ? template : template.content);
}

/** Browser-only. The build-time pass feeds the same emitter from parse5. */
export function sanitizeInlineHtml(html: string): string {
  return serializeInlineNodes(parseInert(html));
}

/** Reading text out of inline HTML, for character counts and accessible labels. */
export function inlineHtmlToPlainText(html: string): string {
  return plainTextFromInlineNodes(parseInert(html));
}
