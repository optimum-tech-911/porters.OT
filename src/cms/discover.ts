/**
 * Editable-text discovery for the public runtime.
 *
 * This is one half of a pair: scripts/generate-cms-registry.mjs walks the built
 * HTML with parse5 and must derive byte-identical keys from the same rules.
 * scripts/verify-cms-discovery.mjs runs this module against the same pages and
 * fails the build when the two drift apart.
 *
 * Everything here works off the document passed in rather than a global, so the
 * verification script can drive it with a server-side DOM.
 */

import { INLINE_TAGS } from './inline-html.ts';

export const CANDIDATE_SELECTOR = 'h1,h2,h3,h4,h5,h6,p,a,button,label,li,summary,blockquote,figcaption,strong,small,span';
export const EXCLUDED_SELECTOR = 'script,style,svg,noscript,template,[aria-hidden="true"],[data-cms-ignore]';

const TEXT_NODE = 3;
const LETTER = /[A-Za-zÀ-ÖØ-öø-ÿ]/;

export function hashString(value: string): string {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

export function routeToken(route: string): string {
  if (route === '/') return 'home';
  return route.slice(1).toLowerCase().replace(/[^a-z0-9/_-]+/g, '-').replaceAll('/', '.');
}

function nthOfType(element: Element): number {
  let position = 1;
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === element.tagName) position += 1;
    sibling = sibling.previousElementSibling;
  }
  return position;
}

function structuralPath(element: Element, root: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current !== root) {
    parts.unshift(`${current.tagName.toLowerCase()}:${nthOfType(current)}`);
    current = current.parentElement;
  }
  return parts.join('/');
}

export function elementType(element: Element): string {
  const tag = element.tagName.toLowerCase();
  if (/^h[1-6]$/.test(tag)) return 'heading';
  if (tag === 'a' || tag === 'button' || tag === 'summary') return 'button';
  if (tag === 'label') return 'label';
  if (tag === 'li') return 'list_item';
  if (tag === 'blockquote') return 'quote';
  return 'paragraph';
}

function ownsText(element: Element): boolean {
  return Array.from(element.childNodes)
    .some((node) => node.nodeType === TEXT_NODE && LETTER.test(node.textContent || ''));
}

/**
 * Walks down to the element that actually owns the text. A wrapper such as
 * `<li><a href="/faq">FAQ</a></li>` must resolve to the anchor: claiming the
 * wrapper would pull the link's markup into the editable copy and would move the
 * block off the key the anchor already owns.
 */
function resolveBlock(element: Element): Element {
  let current = element;
  for (;;) {
    if (ownsText(current) || current.children.length !== 1) return current;
    const only = current.children[0];
    if (!only.matches(CANDIDATE_SELECTOR)) return current;
    current = only;
  }
}

/**
 * A block is claimed whole when it owns text directly and holds nothing but
 * inline decoration. Owning text directly is what separates one flowing sentence
 * from a wrapper around several independent texts, such as a menu entry's title
 * and its blurb — those have to stay separately editable. Anything holding an
 * icon, an image or its own registered block keeps the per-text-node wrappers.
 */
function isMergeable(element: Element): boolean {
  if (!ownsText(element)) return false;
  if (element.querySelector('[data-cms-key],[data-cms-ignore]')) return false;
  return Array.from(element.querySelectorAll('*'))
    .every((node) => INLINE_TAGS.has(node.tagName.toLowerCase()));
}

function firstDirectTextFragment(element: Element): string {
  for (const node of Array.from(element.childNodes)) {
    if (node.nodeType !== TEXT_NODE) continue;
    const text = (node.textContent || '').trim();
    if (LETTER.test(text)) return text;
  }
  return '';
}

/**
 * Returns, for each merged block that carries markup, what a row written before
 * blocks were merged would hold: that block's first text fragment alone. The
 * runtime pairs this with published_version to ignore database rows that predate
 * the merge, which is what lets the frontend ship before or after the seed
 * migration without breaking a page either way.
 */
export function discoverEditableText(doc: Document, pageRoute: string, globalRoute: string): Map<string, string> {
  const body = doc.body;
  const elements = Array.from(body.querySelectorAll(CANDIDATE_SELECTOR));
  const fragments: Array<{ node: Text; key: string; route: string; type: string }> = [];
  const preMergeFragments = new Map<string, string>();

  elements.forEach((element) => {
    if (element.matches(EXCLUDED_SELECTOR) || element.closest(EXCLUDED_SELECTOR)) return;
    // Claimed ancestors carry a key already, which is what keeps the inline parts
    // of a merged sentence from being registered a second time. Elements arrive
    // in document order, so an ancestor is always claimed before its children.
    if (element.closest('[data-cms-key]')) return;
    if (!LETTER.test(element.textContent || '')) return;

    const target = resolveBlock(element);
    if (target !== element && (target.matches(EXCLUDED_SELECTOR) || target.closest(EXCLUDED_SELECTOR))) return;

    const main = target.closest('main');
    const header = main ? null : target.closest('header');
    const footer = main ? null : target.closest('footer');
    const root = header || footer || main || body;
    const scope = header ? 'global.header' : footer ? 'global.footer' : `pages.${routeToken(pageRoute)}`;
    const route = header || footer ? globalRoute : pageRoute;
    const path = structuralPath(target, root);
    const type = elementType(target);

    if (isMergeable(target)) {
      // Deliberately the historic first-fragment key: every block that was
      // already a single text node keeps the exact key it has in the database.
      const key = `${scope}.auto.${type}.${hashString(`${path}|text:1`)}`;
      target.setAttribute('data-cms-key', key);
      target.setAttribute('data-cms-route', route);
      target.setAttribute('data-cms-element-type', type);
      target.setAttribute('data-cms-auto', 'true');
      target.setAttribute('data-cms-rich', 'true');

      // Only blocks holding markup can lose anything to a plain pre-merge value.
      // That includes markup carrying no text of its own, such as a bullet span,
      // so this tests for child elements rather than for differing text.
      const fragment = firstDirectTextFragment(target);
      if (fragment && target.children.length > 0) preMergeFragments.set(key, fragment);
      return;
    }

    let directTextIndex = 0;
    Array.from(target.childNodes).forEach((node) => {
      if (node.nodeType !== TEXT_NODE) return;
      if (!LETTER.test((node.textContent || '').trim())) return;
      directTextIndex += 1;
      fragments.push({
        node: node as Text,
        key: `${scope}.auto.${type}.${hashString(`${path}|text:${directTextIndex}`)}`,
        route,
        type,
      });
    });
  });

  fragments.forEach(({ node, key, route, type }) => {
    if (!node.isConnected) return;
    const original = node.textContent || '';
    const wrapper = doc.createElement('span');
    wrapper.setAttribute('data-cms-key', key);
    wrapper.setAttribute('data-cms-route', route);
    wrapper.setAttribute('data-cms-element-type', type);
    wrapper.setAttribute('data-cms-auto', 'true');
    wrapper.setAttribute('data-cms-leading', original.match(/^\s*/)?.[0] || '');
    wrapper.setAttribute('data-cms-trailing', original.match(/\s*$/)?.[0] || '');
    wrapper.textContent = original;
    node.replaceWith(wrapper);
  });

  return preMergeFragments;
}
