# Motion & Interaction System

## 1. Executive Summary
This project utilizes a highly choreographed, lightweight, and native-feeling motion system. It relies on a "CSS-first, JS-orchestrated" philosophy. JavaScript is used exclusively to observe intersections, manage state, and assign sequence delays, while all actual animation curves, durations, and interpolations are strictly handled by the browser's native CSS engine. The result is a smooth, highly performant experience that feels premium without the overhead of heavy animation libraries. The system emphasizes spatial choreography (elements entering sequentially), restrained interactivity (subtle scale and translate adjustments), and deliberate cleanup (removing animation states to allow hover interactions).

## 2. Technology & Motion Stack
- **Architecture**: Vanilla CSS Transitions and Keyframes + Vanilla JavaScript.
- **Scroll Engine**: Native CSS `scroll-behavior: smooth` (No scroll hijacking, Lenis, or Locomotive).
- **Observation**: Native `IntersectionObserver` with custom threshold and rootMargin handling.
- **Performance Syncing**: Strict use of `requestAnimationFrame` for coordinating DOM writes/class additions to prevent layout thrashing.
- **Libraries**: None. 

## 3. Core Motion Principles
- **CSS Ownership**: JavaScript never interpolates values. It only toggles classes (e.g., `is-visible`, `is-open`) and assigns custom properties (`--reveal-delay`). CSS handles all transitions.
- **Deliberate Choreography**: Elements rarely enter the viewport alone or all at once. Parent sections act as triggers, cascading entrances to their children to create a rhythmic, readable flow.
- **State Detachment (Cleanup)**: Entrance animations (e.g., `.reveal`) are explicitly removed via JavaScript `setTimeout` once the animation completes. This prevents lingering `transform` or `animation` declarations from conflicting with hover states or interactive motion.
- **Spatial Awareness**: Tooltips and popovers dynamically calculate their origin point (`--preview-origin-x`, `--preview-origin-y`) before opening, making the animation feel connected to the user's cursor or the trigger element.
- **Performance First**: Motion is restricted primarily to `transform`, `opacity`, `clip-path`, and occasionally `filter: blur`. 

## 4. Motion Tokens
The system relies on a consistent set of underlying CSS variables for timing and easing to maintain a unified feel.

### Duration Families
- **Instant/Micro (Fast)**: `180ms` - Used for hover states, color changes, border-color shifts, and simple opacity toggles.
- **Standard (Medium)**: `240ms` - `320ms` - Used for structural interactions, popover entrances, and header transformations.
- **Cinematic/Reveal (Slow)**: `700ms` - `900ms` - Used for large layout shifts, initial hero entrances, and image scaling.

### Easing Families
- **Ease Soft (Primary)**: `cubic-bezier(0.22, 1, 0.36, 1)` - The default easing for most spatial transformations (translates, scales). Creates a fast initial burst that gently glides into place.
- **Ease Out Premium**: `cubic-bezier(0.16, 1, 0.3, 1)` - Used for larger layout choreography.
- **Overshoot/Spring**: `cubic-bezier(0.2, 1.2, 0.3, 1)` - Specifically used for interactive popovers or buttons to create a subtle "bouncy" overshoot without relying on physics libraries.
- **Linear/Ease**: Standard `ease` is reserved for opacity, color, and background changes where complex bezier curves are imperceptible.

## 5. Global Scroll System
- **Philosophy**: Scrolling is strictly native. The system respects the operating system's momentum and touch behavior. `scroll-behavior: auto` is sometimes forced to override smooth scrolling when immediate jumps are required.
- **Header Tracking**: A throttled (via `requestAnimationFrame`) scroll listener tracks velocity and direction. 
  - The header hides when scrolling down past a specific threshold (e.g., 120px).
  - The header reappears instantly upon scrolling up, providing immediate access to navigation.
- **Containment**: Menus, chatbots, and modal overlays use `overscroll-behavior: contain` to prevent the background body from scrolling when interacting with the overlay.

## 6. Entrance & Reveal System
The entrance system is orchestrated globally via a dedicated script that runs on every page.

- **Trigger Hierarchy**: Sections marked with `[data-motion-section]` own the IntersectionObserver trigger. Individual child elements (`[data-motion-item]`) do not trigger themselves.
- **Staggering**: Once a section intersects, JS assigns a `--motion-order` or `--reveal-delay` CSS variable to each child based on its index (e.g., `Math.min((index % 7) * 70, 420)ms`).
- **Semantic Targeting**: The system automatically applies reveal classes (`.reveal`) to semantic blocks (`article, details, figure, li`) if they don't explicitly opt out, ensuring the whole page feels alive without manual markup.
- **Directional Variance**: 
  - Cards and structural blocks use a "pop" animation (`transform: translateY(18px) scale(0.96)` to `scale(1)`).
  - Alternating items (e.g., list rows, alternating media) use `.motion-slide-left` or `.motion-slide-right` to create horizontal dynamism.

## 7. Scroll-Linked Effects
The project does not use continuous scrubbed scroll animations (like GSAP ScrollTrigger scrubbing). Scroll position is purely a trigger threshold. Once an element crosses the viewport threshold, its animation plays independently of further scroll movement.

## 8. Hover & Pointer Interactions
- **Underlines**: Navigation links rely on a `scaleX` transform on a pseudo-element (`::after`), transforming from `scaleX(0)` to `scaleX(1)` with a `left` transform-origin on hover.
- **Buttons**: Primary buttons use a subtle physical "pop" on hover (`transform: translateY(-2px)`), accompanied by a background and border color transition (`180ms ease`). Arrows inside buttons typically translate horizontally (`transform: translateX(0.2rem)`).
- **Cards/Images**: Media wrappers often employ an internal scale effect on hover (`transform: scale(1.018)` over `900ms`) while the parent container maintains its bounds (`overflow: hidden`).

## 9. Navigation & Menu Motion
- **Popovers/Dropdowns**: Dropdowns do not simply fade in. They utilize a combined spatial transition:
  - Initial: `opacity: 0; visibility: hidden; transform: translate3d(-50%, 10px, 0) scale(0.985);`
  - Active: `opacity: 1; visibility: visible; transform: translate3d(-50%, 0, 0) scale(1);`
  - Timing: `transform 240ms cubic-bezier(0.22, 1, 0.36, 1)`.
- **Mobile Menu**: Menu toggles use standard CSS transforms to rotate hamburger spans into an 'X'. The body is locked (`overflow: hidden`) when the mobile menu is active.

## 10. Text Animation System
Text animations focus on block-level reveals rather than complex character-by-character splitting.
- Titles often arrive via a horizontal or vertical blur-fade (`opacity: 0; transform: translateX(-48px); filter: blur(6px);` to `opacity: 1; filter: none;`).
- Paragraphs follow the title with a strict animation delay to ensure the user reads the heading before the description appears.

## 11. Media Animation System
- Continuous background motion is utilized sparingly but effectively.
- Marquees (e.g., job listings, client logos) use infinite linear CSS keyframe translations (`transform: translateX(-50%)`). Crucially, they pause on hover (`animation-play-state: paused`) to allow user interaction.
- Floating ambient elements use a slow, infinite `ease-in-out` keyframe (`translateY` oscillating by `12px` over `6s`).

## 12. Component Micro-Interactions
- **Complex Tooltips**: Dynamic previews calculate their rendering quadrant (above/below cursor) via JS `getBoundingClientRect()`, assign dynamic CSS variables (`--preview-origin-y`), and animate open using a highly tactile `clip-path: inset(...)` combined with a scale and blur reveal.
- **Counters**: Numeric counters use `requestAnimationFrame` to interpolate values linearly up to a target number during viewport intersection.

## 13. Responsive Motion Behavior
- **Mobile Adjustments**: Hover effects are disabled or ignored on touch devices.
- **Layout Thresholds**: The origin points for popovers and the complexity of grid staggers are simplified on smaller viewports to prevent overwhelming the screen with overlapping animations.

## 14. Reduced Motion & Accessibility
The system has a strict global check for `window.matchMedia('(prefers-reduced-motion: reduce)')`. 
If true:
- IntersectionObservers are bypassed entirely.
- Elements are immediately assigned their final `visible` or `is-motion-visible` classes.
- Timeout cleanup functions are called instantly with a `0` delay to remove animation styling, ensuring the site is fully usable without any spatial movement.

## 15. Performance & Smoothness Techniques
- **DOM Measurement Isolation**: When calculating tooltip positions or scroll offsets, all DOM reads (`getBoundingClientRect`, `offsetWidth`, `scrollY`) are performed before any DOM writes (style assignments, class toggles).
- **RAF Wrapping**: DOM writes are wrapped in `requestAnimationFrame(() => { ... })` to ensure they execute at the start of the next frame, completely avoiding layout thrashing.
- **Throttling**: Scroll event listeners use a `ticking` boolean pattern combined with `requestAnimationFrame` to ensure the scroll callback only fires once per frame.
- **Hardware Acceleration**: `transform` (specifically `translate3d` when necessary) and `opacity` are heavily preferred over animating layout properties (`top`, `margin`, `height`).

## 16. Reusable Motion Recipes

### Viewport Staggered Reveal Recipe
**Trigger**: Section enters viewport (IntersectionObserver threshold 0.08).
**Initial state**: `opacity: 0; transform: translateY(18px) scale(0.96);`
**Final state**: `opacity: 1; transform: translateY(0) scale(1);`
**Duration**: `600ms`
**Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`
**Stagger**: `~70ms` to `95ms` per sibling element, capped at a maximum delay (e.g., `475ms`).
**Implementation mechanism**: Vanilla JS observer adds a class (e.g., `.is-visible`). CSS handles the transition. JS `setTimeout` removes the animation class after the duration finishes.
**Reusability**: Extremely high. This can be applied to any grid of cards, list items, or stacked paragraphs.

### Tactile Popover/Tooltip Recipe
**Trigger**: Hover/Focus on parent element.
**Initial state**: `opacity: 0; transform: translateY(10px) scale(0.985); visibility: hidden;`
**Final state**: `opacity: 1; transform: translateY(0) scale(1); visibility: visible;`
**Duration**: `240ms` for transform, `180ms` for opacity.
**Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`
**Implementation mechanism**: Parent element uses `:hover` or `:focus-within` to trigger the child's CSS. No JS required for basic implementation.
**Reusability**: Ideal for navigation dropdowns, info tooltips, and interactive card expansions.

### Button "Pop" Recipe
**Trigger**: Hover/Focus.
**Initial state**: `transform: none;`
**Final state**: `transform: translateY(-2px);`
**Duration**: `220ms`
**Easing**: `cubic-bezier(0.22, 1, 0.36, 1)`
**Implementation mechanism**: Pure CSS `:hover` pseudo-class.
**Reusability**: Core interactive token for all primary CTAs.

## 17. Anti-Patterns
To preserve the quality and feel of this system in another project, **DO NOT**:
- **Hijack the scrollbar**: Do not implement smooth scrolling libraries that override native wheel events. The system relies on native scroll feel.
- **Animate layout properties**: Avoid animating `width`, `height`, `margin`, or `padding` unless absolutely necessary (e.g., accordion expansion). 
- **Leave entrance classes attached**: Do not leave classes like `.reveal` or `.animate-in` on elements permanently. They must be removed so their `transform` declarations don't override or conflict with `:hover` transforms.
- **Over-animate**: Do not animate every single element independently. Group elements into logical sections and animate the blocks. Restraint is key to the premium feel.

## 18. Source Map
- **Global Entrance Logic**: `src/layouts/BaseLayout.astro` (Contains the core `IntersectionObserver`, sequence staggering, and cleanup logic).
- **Motion Variables & Base Transitions**: `src/styles/global.css` (Contains bezier curves, durations, and keyframe definitions).
- **Navigation Choreography**: `src/components/layout/SiteHeader.astro` (Contains scroll-direction tracking and popover logic).
- **Complex UI Orchestration**: `src/components/home/HomeHero.astro` (Contains `requestAnimationFrame` tooltip positioning and intricate entrance sequences).

## 19. Integration Guidance for Another Project
When applying this motion system to a new project:
1. **Adopt the Timing, Not the Visuals**: Copy the `--ease-*` cubic-beziers and the standard duration values. Apply these to the new project's own colors, buttons, and layouts.
2. **Implement the Cleanup Pattern**: The most crucial technical takeaway is the `IntersectionObserver` pattern that adds a class to animate, and then sets a timeout to *remove* that class. Implement this early in the new project.
3. **Respect Hierarchy**: Look at the new project's design and determine which elements are structural (animate up smoothly) vs. interactive (animate fast and snappy). Do not apply the slow 700ms entrance easing to a hover state.
