# LXD Toolbox — Developer Guide

Everything someone needs to know to maintain, extend, or hand off this project. Read this before touching `sidebar.js`.

---

## Table of Contents

1. [How it works](#how-it-works)
2. [File structure](#file-structure)
3. [Branch & release workflow](#branch--release-workflow)
4. [Local development](#local-development)
5. [Adding a component](#adding-a-component)
   - [Minimal component](#minimal-component)
   - [Component field reference](#component-field-reference)
   - [Choosing a type](#choosing-a-type)
   - [Writing a preview](#writing-a-preview)
   - [Configurable component (settings)](#configurable-component-settings)
   - [Variant picker component](#variant-picker-component)
   - [Adding a new category](#adding-a-new-category)
6. [Adding a snippet](#adding-a-snippet)
7. [Adding a page template](#adding-a-page-template)
8. [Adding a style guide color](#adding-a-style-guide-color)
9. [Editing the sidebar UI](#editing-the-sidebar-ui)
   - [CSS conventions](#css-conventions)
   - [Adding a new tab](#adding-a-new-tab)
10. [Accessibility rules](#accessibility-rules)
11. [Deploying](#deploying)

---

## How it works

The entire sidebar is one self-contained IIFE in `sidebar.js`. When the bookmarklet runs, it:

1. Checks if the sidebar is already open — if yes, removes it and exits (toggle behavior)
2. Injects a `<style>` tag with all sidebar CSS into the host page
3. Builds the sidebar `<div>` and appends it to `document.body`
4. Pushes the page content left to accommodate the sidebar width
5. Attaches all event listeners

The sidebar communicates with Canvas's TinyMCE editor by reaching into the editor's iframe DOM. It never modifies `document` outside the sidebar element — all changes to page content go through TinyMCE's undo manager so they're reversible with `Cmd+Z`.

When the bookmarklet runs a second time, the IIFE's first check finds the existing sidebar and removes it cleanly.

---

## File structure

```
LXD-toolbox/
├── sidebar.js          — The entire sidebar (single file, ~2000 lines)
├── index.html          — Production bookmarklet install page (GitHub Pages / main)
├── preview.html        — Local dev harness (loads sidebar.js directly, Canvas mock)
├── pages.json          — Page template data (fetched at runtime, not bundled)
├── pages-editor.html   — Browser tool for authoring new page templates
├── DEVELOPER.md        — This file
└── README.md           — End-user documentation
```

**`sidebar.js` internal sections** (in order):

| Section | What it contains |
|---|---|
| Toggle check | Removes existing sidebar if present and exits |
| `COMPONENTS` array | All component data — names, HTML, previews, settings |
| `SNIPPETS` array | All snippet data |
| `PAGES` array | Placeholder — page templates are fetched from `pages.json` |
| `STYLE_GUIDE_HTML` | Inline HTML for the Style Guide tab |
| `CSS` template literal | All sidebar styles (scoped under `#__lxd-sidebar`) |
| DOM construction | `buildSidebar()` assembles all tab panels |
| Utility functions | `getEditor()`, `showToast()`, `stripWrapper()`, etc. |
| Insert logic | `insertHTML()`, `insertPage()`, `copyHTML()` |
| TinyMCE helpers | Placeholder lifecycle, section detection, arrange logic |
| Event listeners | All click / drag / input handlers |

---

## Branch & release workflow

```
feature/my-thing  →  develop  →  main
```

| Branch | Purpose | Served by |
|---|---|---|
| `develop` | Active development, testing | jsDelivr CDN (`@develop`) |
| `main` | Stable production | GitHub Pages |
| `feat/*`, `fix/*` | Individual features/fixes | Not served — merge to develop via PR |

### Step-by-step for any change

```bash
# 1. Start from develop
git checkout develop && git pull

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Make changes, commit
git add sidebar.js
git commit -m "feat: describe what you added"

# 4. Push and open a PR → develop
git push origin feat/your-feature-name
# Open PR at: https://github.com/i-taylor/LXD-toolbox/compare/develop...feat/your-feature-name

# 5. After merging, purge the jsDelivr cache so the dev bookmarklet updates:
# Visit: https://purge.jsdelivr.net/gh/i-taylor/LXD-toolbox@develop/sidebar.js

# 6. When ready to ship to production, open a PR: develop → main
```

**Never commit directly to `develop` or `main`.**

---

## Local development

### Dev bookmarklet (tests against live Canvas)

```
javascript:(function(){var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/i-taylor/LXD-toolbox@develop/sidebar.js?v='+Date.now();document.head.appendChild(s);})()
```

Save this as a bookmark. After pushing to `develop` and purging the CDN, clicking it on any Canvas page loads the latest develop build.

**After every push to develop, purge the cache:**
```
https://purge.jsdelivr.net/gh/i-taylor/LXD-toolbox@develop/sidebar.js
```

### Local preview (no Canvas needed)

Open `preview.html` in a browser. It loads `./sidebar.js` from disk — no build step, no server required. It mocks Canvas's chrome and a TinyMCE shim so most sidebar functionality works. Use this for fast iteration without touching Canvas.

---

## Adding a component

All components live in the `COMPONENTS` array near the top of `sidebar.js`. Each entry is a plain JavaScript object.

### Minimal component

```javascript
{
  name: 'My Component',       // Displayed in the tile and search results
  cat: 'Text',                // Category — must match an existing category name
  type: 'standalone',         // Insertion behavior (see Choosing a type below)
  color: '#00274C',           // Accent color used in the category tile header
  desc: 'What this is for.',  // Shown in the preview modal
  preview: '<div>…</div>',    // Thumbnail HTML rendered inside the tile (52px tall)
  html: `<div class="new-canvas">
<section class="text-block">
  <h2>Heading</h2>
  <p>Content goes here.</p>
</section>
</div>`
}
```

**Where to put it:** Inside the `COMPONENTS` array, grouped under the appropriate category comment block. Order within the array determines the display order within a category.

### Component field reference

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | ✅ | string | Display name. Shows in tile, search, and preview modal. |
| `cat` | ✅ | string | Category name. Must match exactly (case-sensitive). |
| `type` | ✅ | `'text'` \| `'standalone'` \| `'video'` | Controls insertion behavior. |
| `color` | ✅ | hex string | Accent color for the category tile. Use a brand color. |
| `desc` | ✅ | string | One-line description shown in the preview modal. |
| `preview` | ✅ | HTML string | Thumbnail rendered at 52px tall in the component tile. Keep it simple — inline styles only, no external assets. |
| `html` | ✅ | HTML string | The actual HTML inserted into Canvas. Must include the `<div class="new-canvas">` wrapper. Use a template literal for readability. |
| `settings` | ➖ | array | Field definitions for configurable components. See [Configurable component](#configurable-component-settings). |
| `build(s)` | ➖ | function | Generates `html` from settings values `s`. Required when `settings` is present. |
| `variants` | ➖ | array | Color chip options. See [Variant picker component](#variant-picker-component). |

### Choosing a type

| `type` | When to use | Insertion behavior |
|---|---|---|
| `'text'` | Content that belongs inside a `section.text-block` (callouts, pull quotes, two-col layouts, images, tables) | If the cursor is in a text block, merges content into it. Otherwise wraps in a new `<section class="text-block">`. |
| `'standalone'` | Sections that must always be their own element (headers, graphical highlights, gamut intros, instructor panels, accordions) | Always creates a new `<section>` regardless of cursor position. |
| `'video'` | Video blocks only | Always standalone — never merged. |

**When in doubt, use `'standalone'`.** The risk of using `'text'` incorrectly is that two structurally different things get merged into one section, which breaks the CSS.

### Writing a preview

The preview is a small HTML thumbnail (≈120px wide × 52px tall) rendered inside the component tile. Rules:

- **Inline styles only** — no classes, no external assets, no images
- Keep it **abstract** — colored rectangles and lines that suggest the component's shape
- Target `height: 52px` explicitly so all tiles are the same height
- Use brand colors (`#00274C`, `#FFCB05`) and grays (`#e5e7eb`, `#d1d5db`) to suggest real content

**Example — simple text block:**
```html
<div style="padding:6px 8px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px">
  <div style="width:70px;height:9px;background:#00274c;border-radius:3px;opacity:.7"></div>
  <div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px"></div>
  <div style="width:85%;height:6px;background:#e5e7eb;border-radius:3px"></div>
</div>
```

**Example — two-column layout:**
```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px">
  <div style="background:#f3f4f6;border-radius:4px"></div>
  <div style="background:#f3f4f6;border-radius:4px"></div>
</div>
```

### Configurable component (settings)

Some components need user input before insertion (e.g., course title, number of accordion items). Add a `settings` array and a `build(s)` function:

```javascript
{
  name: 'Accordion',
  cat: 'Layout',
  type: 'standalone',
  // ... color, desc, preview ...
  settings: [
    { id: 'items', label: 'Number of items', type: 'number', default: 3, min: 1, max: 12 },
  ],
  build(s) {
    const n = Math.max(1, Math.min(12, +s.items || 3));
    const details = Array.from({ length: n }, (_, i) =>
      `<details><summary>Item ${i + 1}</summary><div><p>Content.</p></div></details>`
    ).join('\n');
    return `<div class="new-canvas">\n<section class="accordion">\n${details}\n</section>\n</div>`;
  },
  html: `…` // fallback used by the Copy button and preview modal before settings are filled
}
```

**Setting field types:**

| `type` | Renders as | Extra fields |
|---|---|---|
| `'number'` | Number input | `min`, `max`, `default` |
| `'text'` | Text input | `default`, `placeholder` |
| `'checkbox'` | Checkbox + label | `default` (boolean) |

The settings panel appears in the **preview modal** (click the eye icon on the tile). The user fills in the fields and clicks **Insert with settings →**. The `build(s)` function receives an object `s` where keys are the `id` values from your settings array.

**`html` is still required** even on configurable components — it's used as the fallback for the plain Insert/Copy buttons and for the preview iframe before settings are entered.

### Variant picker component

Use variants when the same component exists in multiple color options that map directly to CSS modifier classes. The Graphical Highlight is the current example.

```javascript
{
  name: 'Graphical Highlight',
  cat: 'Text',
  type: 'standalone',
  // ... color, desc, preview ...
  html: `<div class="new-canvas">
<section class="graphical-highlight">
  <div><p>Content here.</p></div>
  <div></div>
</section>
</div>`,
  variants: [
    { label: 'Default',    cls: '',                                bg: '#FFEA9B' },
    { label: 'UM Blue',    cls: 'graphical-highlight--umblue',     bg: '#00274C' },
    { label: 'Maize',      cls: 'graphical-highlight--maize',      bg: '#FFCB05' },
    { label: 'Cool Blue',  cls: 'graphical-highlight--cool-blue',  bg: '#305CDE' },
  ]
}
```

Each entry in `variants`:

| Field | Description |
|---|---|
| `label` | Tooltip text shown on hover |
| `cls` | The CSS modifier class added to the base element. Empty string = no modifier (default). |
| `bg` | Circle color for the picker chip |

**How variant HTML is generated:** The system replaces `class="graphical-highlight"` in the base `html` with `class="graphical-highlight <cls>"`. This means the base element in `html` must have exactly the base class with no variants already applied.

**Limitation:** Currently the variant replacement is a string replace on the base class name. If you add variants to a component that has a different base class, update the replacement logic in `compTilesHTML()`:

```javascript
const vHtml = v.cls
  ? c.html.replace('class="graphical-highlight"', `class="graphical-highlight ${v.cls}"`)
  : c.html;
```

Change `'graphical-highlight'` to whatever the new component's base class is.

### Adding a new category

1. Add a color entry to the `CAT_COLORS` object (near line 1090):
   ```javascript
   const CAT_COLORS = {
     Text:     '#00274C',
     Callouts: '#3B82F6',
     // ...
     MyNewCat: '#10B981',  // ← add this
   };
   ```
2. Add components with `cat: 'MyNewCat'`. The category tile appears automatically — no other changes needed.

---

## Adding a snippet

Snippets live in the `SNIPPETS` array (below `COMPONENTS` in `sidebar.js`). They follow a simpler format:

```javascript
{
  name: 'My Snippet',      // Display name, searchable
  html: `<hr class="my-class">`,  // Raw HTML — no new-canvas wrapper needed
  desc: 'Optional description'
}
```

Snippets are inserted at the cursor position using `ed.insertContent()` rather than block-level DOM manipulation, so they work at the inline level. Use them for small reusable fragments that go **inside** existing sections (buttons, dividers, logos, spacers) — not for full sections, which should be components instead.

---

## Adding a page template

Page templates are stored in `pages.json` — a separate file fetched at runtime. They are **not** hardcoded in `sidebar.js`. This means you can add new templates without touching the JS at all.

### Using pages-editor.html

Open `pages-editor.html` in a browser (or at `https://i-taylor.github.io/LXD-toolbox/pages-editor.html`):

1. **Paste** your full `<div class="new-canvas">…</div>` HTML into the textarea
2. **Fill in** the template name, description, and accent color
3. Click **＋ Add to JSON** — it appears in the JSON output below
4. Repeat for additional templates
5. Click **Copy JSON**, then replace the contents of `pages.json` in the repo with the copied output
6. Commit and push `pages.json` — the sidebar fetches it live on every Pages tab open

### pages.json format

```json
[
  {
    "name": "Course Home Page (Series)",
    "desc": "Home page for a course that's part of a series.",
    "color": "#00274c",
    "html": "<div class=\"new-canvas\">…full HTML…</div>"
  }
]
```

| Field | Description |
|---|---|
| `name` | Display name shown on the card |
| `desc` | Optional one-line description shown under the name |
| `color` | Hex color for the dot accent on the card |
| `html` | The complete raw HTML including the `<div class="new-canvas">` wrapper |

### How it's used

When the Pages tab is opened, `renderPagesPanel()` fetches `pages.json` from GitHub Pages (or localhost during local dev). Each template gets a card with **Insert** (replaces entire page content with `ed.setContent()`) and **Copy HTML** buttons. Insert prompts for confirmation if the editor already has content.

---

## Adding a style guide color

All style guide content is in the `STYLE_GUIDE_HTML` template literal (around line 366 in `sidebar.js`). It's plain HTML — find the right group and add a new swatch:

```html
<div class="lxd-swatch" style="--c:#YOUR_HEX" data-hex="#YOUR_HEX">
  <div class="lxd-swatch-block"></div>
  <span>color-name</span>
  <code>#YOUR_HEX</code>
</div>
```

- `style="--c:#hex"` sets the swatch block color via CSS custom property
- `data-hex="#hex"` is what gets copied to clipboard when clicked
- For very light colors (near white), add `style="border:1px solid #e4e2dc"` to the `.lxd-swatch-block` so it's visible against the white card

To add a new **group**, add a label and a new `.lxd-colors` grid:

```html
<p class="lxd-sg-label" style="margin-top:14px">My New Group</p>
<div class="lxd-colors">
  <div class="lxd-swatch" style="--c:#hex" data-hex="#hex">…</div>
</div>
```

---

## Editing the sidebar UI

### CSS conventions

All CSS lives in the `CSS` template literal (starting around line 448). Every rule is scoped to `#${ID}` (`#__lxd-sidebar`) to prevent leaking into the Canvas page:

```javascript
const CSS = `
  #${ID} .my-new-class {
    color: #1c1c1e;
    font-size: .8rem;
  }
`;
```

**Class naming:** All sidebar classes use the `lxd-` prefix to avoid collisions with Canvas or TinyMCE styles. Stick to this convention.

**Contrast requirement:** All text colors must meet WCAG AA (4.5:1 for normal text, 3:1 for large text and UI components). The approved secondary text colors in this project are:

| Token | Value | Use |
|---|---|---|
| Primary text | `#1c1c1e` | Main labels, headings |
| Secondary text | `#595959` | Descriptions, secondary labels |
| Muted text | `#767676` | Metadata, helper text, label caps |
| Inactive | `#646464` | Inactive tab labels |

Never use `#aaa`, `#888`, `#ccc`, `#999`, or `#bbb` for text — they all fail contrast.

**Canvas overrides:** Canvas injects its own styles into the bookmarklet context. Notably, it applies a dark background + light text to `<code>` elements. Always set both `background` and `color` explicitly on any `code` element in the sidebar UI.

### Adding a new tab

1. **Add a tab button** in `buildSidebar()` (find the `.lxd-tabs` section):
   ```html
   <button class="lxd-tab" data-tab="mytab">My Tab</button>
   ```

2. **Add a panel** div:
   ```html
   <div class="lxd-panel" id="${ID}-panel-mytab">
     <!-- content -->
   </div>
   ```

3. **Tab switching** is handled by the existing generic click handler that looks for `data-tab` on `.lxd-tab` buttons and toggles `.active` on both the button and its corresponding `#${ID}-panel-{tab}` div. No additional JS needed for basic tab switching.

4. **Lazy initialization:** If the tab needs to fetch data or build complex DOM on first open (like the Pages tab does), hook into the tab click handler:
   ```javascript
   sidebar.addEventListener('click', e => {
     const tab = e.target.closest('.lxd-tab');
     if (!tab) return;
     const name = tab.dataset.tab;
     if (name === 'mytab') initMyTab();
     // …existing tab logic…
   });
   ```

---

## Accessibility rules

This codebase follows WCAG 2.1 AA. Key things to check whenever you add or change UI:

- **Text contrast:** See the approved colors in [CSS conventions](#css-conventions). Run any new colors through [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
- **Interactive elements:** All buttons must have visible focus styles and descriptive labels. Use `title` for icon-only buttons.
- **Canvas `<code>` override:** Always explicitly set both `background` and `color` on `code` elements — Canvas's default dark-on-dark styling will otherwise break readability.

---

## Deploying

### Develop → test

```bash
git push origin feat/my-feature   # push feature branch
# open PR → develop on GitHub, merge
# then purge CDN:
curl "https://purge.jsdelivr.net/gh/i-taylor/LXD-toolbox@develop/sidebar.js"
# test with the dev bookmarklet
```

### Develop → production (main)

When `develop` is stable and ready to ship:

1. Open a PR from `develop` → `main` on GitHub
2. Merge it
3. GitHub Pages rebuilds automatically (usually < 1 min)
4. The production bookmarklet (loaded from `index.html`) picks up the new version on next click — no reinstallation needed by users

**The production bookmarklet URL:**
```
https://i-taylor.github.io/LXD-toolbox/sidebar.js
```

### pages.json deploys separately

`pages.json` is fetched live from GitHub Pages. Pushing changes to `main` is enough — no CDN purge needed since GitHub Pages serves it directly with short cache headers.

---

## Quick reference — most common tasks

| Task | Where to look |
|---|---|
| Add a simple component | `COMPONENTS` array in `sidebar.js` |
| Add a component with user inputs | `COMPONENTS` array — add `settings` + `build()` |
| Add color variants to a component | `COMPONENTS` array — add `variants` |
| Add a new component category | `CAT_COLORS` object + `COMPONENTS` entries |
| Add a snippet | `SNIPPETS` array in `sidebar.js` |
| Add a page template | `pages.json` via `pages-editor.html` |
| Add a brand color to style guide | `STYLE_GUIDE_HTML` in `sidebar.js` |
| Change sidebar UI styles | `CSS` template literal in `sidebar.js` |
| Add a new sidebar tab | `buildSidebar()` HTML + tab click handler |
| Test locally | Open `preview.html` in browser |
| Test on Canvas | Use dev bookmarklet (jsDelivr `@develop`) |
| Ship to production | PR `develop → main` |
