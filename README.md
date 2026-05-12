# LXD Toolbox — Canvas Page Sidebar

A bookmarklet-powered design sidebar for building Canvas LMS pages with the Michigan Online component library. Drag in pre-built components, reorder sections, copy brand snippets, and reference the style guide — all without leaving the Canvas rich content editor.

---

## Table of Contents

1. [Installation](#installation)
2. [Launching the Sidebar](#launching-the-sidebar)
3. [Interface Overview](#interface-overview)
4. [Components Tab](#components-tab)
   - [Categories](#categories)
   - [Component List](#component-list)
   - [Inserting a Component](#inserting-a-component)
   - [Smart Insertion Behavior](#smart-insertion-behavior)
   - [Insert Placeholder](#insert-placeholder)
5. [Arrange Tab](#arrange-tab)
6. [Snippets Tab](#snippets-tab)
7. [Style Guide Tab](#style-guide-tab)
8. [Show Blocks](#show-blocks)
9. [Resizing the Sidebar](#resizing-the-sidebar)
10. [Workflow Tips](#workflow-tips)
11. [Technical Notes](#technical-notes)

---

## Installation

The sidebar is delivered as a **bookmarklet** — a bookmark that runs JavaScript instead of navigating to a URL.

1. **Copy the bookmarklet code**

   Open [`index.html`](index.html) in a browser, or copy the bookmarklet from the GitHub Pages URL:

   ```
   https://i-taylor.github.io/LXD-toolbox/
   ```

2. **Create a new bookmark** in Chrome/Safari/Firefox

   - Open your Bookmarks Bar (`⌘⇧B` in Chrome)
   - Right-click → **Add Page** (or drag the button from the page directly to the bar)
   - Name it something short — `LXD Sidebar` or `🛠 LXD`
   - Paste the bookmarklet code into the **URL** field

3. **Done.** The bookmark bar entry is now your toggle button for the sidebar.

> **Updating:** The bookmarklet loads `sidebar.js` from GitHub Pages at click time, so you always get the latest version automatically — no re-installation needed.

---

## Launching the Sidebar

1. Open any **Canvas page** in the rich content editor (click Edit on a page)
2. Click the **LXD Sidebar** bookmark in your bookmarks bar
3. The sidebar slides in from the right; the page content shifts left to accommodate it

Clicking the bookmark again (or pressing `✕` in the sidebar header) **closes and removes** the sidebar. No refresh needed.

---

## Interface Overview

```
┌──────────────────────────────┐
│  🛠 LXD Sidebar        Beta ✕ │  ← Header / close button
├──────────────────────────────┤
│  Components │ Arrange │ …    │  ← Tab bar
├──────────────────────────────┤
│  👁 Blocks                   │  ← Editor tools strip
├──────────────────────────────┤
│  🔍 Search…                  │  ← Search bar (Components & Snippets)
├──────────────────────────────┤
│                              │
│   (Active panel content)     │  ← Scrollable panel area
│                              │
└──────────────────────────────┘
```

| Area | Description |
|---|---|
| **Header** | Shows the sidebar title and a close button |
| **Tab bar** | Switches between Components, Arrange, Snippets, and Style Guide |
| **Editor tools** | Toggle block visualization in the editor |
| **Search bar** | Live search across component and snippet names |
| **Panel** | Scrollable content area for the active tab |

---

## Components Tab

The Components tab is the primary workspace. It opens to a **category home screen** showing all component categories as visual tiles.

### Categories

| Category | What's inside |
|---|---|
| **Text** | Text blocks, assignment blocks, graphical highlights, Gamut intro sections |
| **Callouts** | Info, action, and highlight callout boxes; pull quotes; side-by-side callouts |
| **Video** | Standard, guest lecture (highlight), and blue-variant video sections |
| **Layout** | Course display headers, accordions, two-column layouts, instructor panels |
| **Media** | Image with caption (sharp and rounded corners) |
| **Tables** | Standard, alternate-row, and alternate-column data tables |

Click any category tile to open the **browse view** for that category. Use the **← Back** button or the search bar to navigate between views.

### Component List

#### Text

| Component | Description |
|---|---|
| **Text Block** | The base content section. Plain heading + paragraph. Most common building block. |
| **Text Block (Assignment)** | Left-bordered assignment instruction block with Overview and Instructions sections. |
| **Graphical Highlight** | Two-column block — text left, decorative graphic right. |
| **Gamut Intro (Gallery)** | Intro section styled for preceding a Gamut Gallery embed. |
| **Gamut Intro (Workbook)** | Intro section styled for preceding a Gamut Workbook embed. |

#### Callouts

| Component | Description |
|---|---|
| **Callout Box** | Blue info callout — definitions, reminders, key takeaways. |
| **Callout Box (Action)** | Maize action callout — prompts, reflections, learner tasks. |
| **Callout Box (Highlight)** | Dark/maize high-visibility callout — warnings, strong emphasis. |
| **Pull Quote** | Styled blockquote with configurable quote text and author. |
| **Side-by-Side Callout** | Two callout boxes in a grid — comparisons or parallel concepts. |

#### Video

| Component | Description |
|---|---|
| **Video Block** | Standard lecture video section with a "Lecture" tag, title, and description. |
| **Video Block (Guest Lecture)** | Dark highlight variant with a "Guest lecture" tag. |
| **Video Block (Blue)** | Blue-themed variant for alternate video labeling. |

> Each video block is always its own standalone section and is never merged into surrounding text content.

#### Layout

| Component | Description |
|---|---|
| **Course Display Header** | Full hero header for a Course Intro page — collage, UM logo, nav links. Configurable course title. |
| **Course Display Header (Series)** | Same as above, with a "Course X of Y" series tag. Configurable course number, total, and title. |
| **Course Header (Series)** | Sub-title + display header combo for multi-course series. |
| **Accordion** | Expandable FAQ-style `<details>/<summary>` sections. Configurable item count (1–12). |
| **Two-Col (Text / Text)** | Two text columns side by side. |
| **Two-Col (Text / Text Light Blue)** | Two text columns, light blue background. |
| **Two-Col (Text / Image)** | Text left, image right. |
| **Two-Col (Text / Image Dark)** | Text and image on a dark background. |
| **Two-Col (Text / Image Highlight)** | Text and image with maize highlight background. |
| **Instructor Panel (Blue)** | Instructor photo, name, title, and bio — U-M Blue variant. |
| **Instructor Panel (Maize)** | Same instructor layout — Maize variant. |

#### Media

| Component | Description |
|---|---|
| **Image (Sharp Corners)** | Full-width image with alt text and caption. |
| **Image (Rounded Corners)** | Same, with `rounded-corners` class applied. |

#### Tables

| Component | Description |
|---|---|
| **Table** | Standard scrollable data table with dark header row. Configurable rows, columns, and optional header. |
| **Table (Alternate Rows)** | Table with alternating row backgrounds. Same configuration options. |
| **Table (Alternate Columns)** | Table with alternating column backgrounds. Same configuration options. |

---

### Inserting a Component

Each component tile has two buttons:

| Button | What it does |
|---|---|
| **👁 (preview icon)** | Opens a full preview modal showing the rendered component with placeholder images |
| **Insert** | Inserts the component directly into the Canvas editor |
| **Copy** | Copies the raw HTML to your clipboard |

**From the preview modal**, you can also **Insert** or **Copy** after seeing what the component looks like rendered.

---

### Smart Insertion Behavior

The sidebar uses a two-priority insertion system so components always land in a sensible location.

#### Priority 1 — Cursor position

If your cursor is actively placed inside the Canvas editor, the sidebar inserts relative to where you are:

| Your cursor is in… | What happens when you Insert… |
|---|---|
| A plain **text block** (`section.text-block`) | **Text-type** components merge their content into that block at the end. Other types go immediately after it as a new section. |
| A **video block**, header, accordion, or other standalone section | New component appears immediately after that section. |
| The **insert placeholder** (dashed zone at the bottom) | Treated as end-of-page — component inserts before the placeholder, which then stays at the bottom. |

#### Priority 2 — End of page fallback

When no editor cursor is detected (e.g., you clicked the Insert button without first clicking inside the editor):

- **Text-type** components check whether the last real section is a plain text block and merge into it if so; otherwise a new text section is added above the placeholder.
- **Video and standalone** components are always inserted as their own new section before the placeholder.

After every insert, the placeholder is automatically repositioned to the very bottom of the page.

---

### Insert Placeholder

When you first interact with the editor (insert a component, toggle Show Blocks, or open the Arrange tab), a **dashed landing zone** appears at the bottom of the page content:

```
╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌
    ↓  Click here, then insert a component
╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌ ╌
```

This is an **editor-only element** — it is automatically stripped out before Canvas saves the page, so it will never appear in the published page or student view.

**Workflow with the placeholder:**
1. Click inside the Canvas editor on the placeholder zone — your cursor lands there
2. Click **Insert** on any component in the sidebar — it slots in before the placeholder
3. The placeholder repositions itself below your new content
4. Repeat as needed

---

## Arrange Tab

The Arrange tab reads all real sections from the current page and displays them as a **draggable list**, letting you reorder content without cut-and-paste.

### How to use it

1. Click the **Arrange** tab
2. A list of all sections appears — each row shows:
   - **⠿** drag handle
   - **Type badge** — `TEXT`, `VIDEO`, or `BLOCK`
   - **Section label** — heading text if found, otherwise a type name
   - **🗑 Delete button**

3. **Drag** any row up or down to reorder it in the editor
4. **Drop** it — the section moves instantly in the Canvas editor, and the list rebuilds to reflect the new order

> The reorder is applied directly to the editor DOM and is **undoable** with `Cmd+Z` / `Ctrl+Z` in Canvas.

### Delete a section

Click **🗑** on any row to permanently remove that section from the page. A confirmation prompt appears before deletion. This is also undoable via Canvas's undo history.

### Notes

- The placeholder section (dashed zone) is excluded from the Arrange list — only real publishable sections appear
- The list rebuilds automatically after each reorder or delete
- Open the Arrange tab at any time during editing — it always reflects the current state of the page

---

## Snippets Tab

The Snippets tab contains small reusable HTML fragments that go inside existing content — not full sections.

| Snippet | Description |
|---|---|
| **Divider (Subtle)** | Light gray `<hr>` separator |
| **Divider (Maize)** | Short maize accent bar |
| **Button (Navy)** | Navy CTA button link |
| **Button (Maize)** | Maize CTA button link |
| **Tag / Pill** | Inline `.tag` label element |
| **UM Logo** | University of Michigan block M logo |
| **Michigan Online Logo** | Michigan Online horizontal lockup |
| **Spacer (32px)** | 32px vertical breathing room |
| **Spacer (64px)** | 64px vertical breathing room |

Each snippet card has:
- **Insert** — places the snippet at your cursor position in the editor
- **Copy** — copies the raw HTML to your clipboard for manual pasting

Use the **Search** bar at the top to filter snippets by name.

---

## Style Guide Tab

The Style Guide tab is a quick-reference color palette for the Michigan Online brand.

| Group | Colors |
|---|---|
| **Primary** | UM Blue `#00274C`, UM Maize `#FFCB05`, White `#FFFFFF` |
| **Secondary** | Blue CTA, Cool Blue, Warm Blue, Accent Orange, Yellow Light, Yellow X-Light |
| **Shapes & Graphics** | Accent Warm Blue, Warm Blue Light/X-Light, Accent Yellow, Accent Orange |
| **Notifications** | Success green, Warning orange, Error red, Info purple |
| **Grays** | Neutral X-Light through Dark |

**Click any swatch** to copy its hex value to your clipboard. A small toast notification confirms the copy.

---

## Show Blocks

The **👁 Blocks** button in the editor tools strip toggles a visual overlay in the Canvas editor that outlines all block types with colored borders and labels.

| Section type | Outline | Label |
|---|---|---|
| Plain text block | Dashed dark blue border | `TEXT BLOCK` |
| Video block | Dashed maize border | `VIDEO BLOCK` |

These outlines are **editor-only** — they are injected into the editor's internal stylesheet and are never saved or published. Toggling Show Blocks off removes them immediately.

**Typical use:** Turn on Show Blocks to understand the structure of a page you're editing, then turn it off before saving.

---

## Resizing the Sidebar

Drag the **left edge** of the sidebar to resize it anywhere between 260px and 680px wide. The page content area adjusts automatically. The default width is 320px.

---

## Workflow Tips

### Building a page from scratch
1. Open the Canvas page editor
2. Launch the sidebar
3. Insert a **Course Display Header** or **Text Block** first — the placeholder will appear at the bottom
4. Keep inserting components; each new one lands before the placeholder, building the page top to bottom
5. Switch to the **Arrange** tab at any time to drag sections into a different order
6. Save the page — the placeholder is automatically stripped before Canvas stores the content

### Adding content to an existing page
1. Open the editor
2. Click inside the section you want to add content near
3. Insert a component — it lands relative to your cursor:
   - Text inside a text block? It merges in
   - Video or standalone? It appears as a new section right after your cursor position

### Reordering after the fact
1. Insert all your sections in any order
2. Open **Arrange**, drag them into the right sequence
3. No cut-and-paste required

### Getting a component's raw HTML
Click **Copy** on any component tile or use the **Copy** button in the preview modal. You can paste the HTML into any external tool, send it to a colleague, or manually edit it in Canvas's HTML editor (`<>` button).

### Configurable components
Some components (Accordion, Table, Course Display Header, Pull Quote) have **settings fields** that appear in the preview modal — fill them in and the generated HTML updates automatically before insertion.

---

## Technical Notes

> For developers and anyone maintaining or extending `sidebar.js`.

### How it works

The bookmarklet injects a single self-contained IIFE from `sidebar.js` (hosted on GitHub Pages). Running it a second time removes the sidebar — no reload needed.

### TinyMCE integration

Canvas's rich content editor runs TinyMCE inside an `<iframe>`. The sidebar:
- Detects the active TinyMCE instance via `window.tinymce` or by scanning iframes
- Uses `ed.undoManager.transact()` for all DOM mutations so every insert/reorder/delete is undoable via Canvas's own Undo (`Cmd+Z`)
- Uses `insertAdjacentHTML('beforebegin'/'afterend'/'beforeend')` instead of `ed.insertContent()` for block-level operations, bypassing cursor/focus issues
- Uses `ed.selection.getNode()` + DOM walking to detect cursor position for cursor-aware insertion

### Section types

| `type` value | Behavior |
|---|---|
| `text` | Inner content is merged into the nearest `section.text-block` when cursor is in one; otherwise wrapped in a new `<section class="text-block">` |
| `video` | Always inserted as a complete standalone `<section class="text-block video-block">` — never merged |
| `standalone` | Always inserted as a complete standalone section — never merged |

### Placeholder lifecycle

1. `ensurePlaceholder(ed)` is called after every insert and on Arrange tab open / Show Blocks toggle
2. It removes any existing `[data-lxd-ph]` element, then appends a fresh one at the bottom of `.new-canvas`
3. A `GetContent` hook on the TinyMCE editor strips `[data-lxd-ph]` from the serialized HTML before Canvas saves it

### File structure

```
LXD-toolbox/
├── sidebar.js      — Full sidebar implementation (single file)
├── index.html      — Bookmarklet install page (GitHub Pages)
└── README.md       — This file
```

### Hosting & CDN

`sidebar.js` is served via GitHub Pages at:
```
https://i-taylor.github.io/LXD-toolbox/sidebar.js
```

The bookmarklet fetches this URL at click time, so all users always run the latest version automatically.
