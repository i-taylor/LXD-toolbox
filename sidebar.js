(function () {
  'use strict';

  const ID = '__lxd-sidebar';
  const PUSH_W = '320px';

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const existing = document.getElementById(ID);
  if (existing) {
    existing.remove();
    document.getElementById(ID + '-style')?.remove();
    document.body.style.marginRight = '';
    return;
  }

  // ── Components data ────────────────────────────────────────────────────────
  const COMPONENTS = [
    {
      name: 'Display Header',
      tag: 'Layout',
      color: '#F97316',
      desc: 'Full-width hero with collage image and course title.',
      preview: '<div style="background:linear-gradient(90deg,#ffcb05 38%,#e0e0e0 38%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:8px;top:8px;width:90px;height:14px;background:#00274c;border-radius:3px;opacity:.7"></div><div style="position:absolute;left:8px;top:28px;width:60px;height:8px;background:#00274c;border-radius:3px;opacity:.4"></div></div>',
      html: `<div class="new-canvas">\n  <section class="display-header">\n    <div class="heading">\n      <div>\n        <h2>Welcome to <strong>Course Title</strong></h2>\n      </div>\n      <div class="collage">\n        <div>&nbsp;</div>\n        <div><img src="PASTE_IMAGE_URL_HERE" alt="Describe the image" width="100%" height="100%" /></div>\n      </div>\n    </div>\n  </section>\n</div>`
    },
    {
      name: 'Info Callout',
      tag: 'Callout',
      color: '#3B82F6',
      desc: 'Blue highlighted box for notes, tips, or important info.',
      preview: '<div style="border-left:4px solid #3B82F6;background:#eff6ff;border-radius:0 6px 6px 0;padding:8px 10px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:4px"><div style="width:60px;height:8px;background:#3B82F6;border-radius:3px;opacity:.7"></div><div style="width:110px;height:6px;background:#93c5fd;border-radius:3px"></div></div>',
      html: `<div style="background:#eff6ff;border-left:4px solid #3B82F6;padding:16px 20px;border-radius:0 8px 8px 0;margin:16px 0;">\n  <p><strong>&#128204; Note</strong></p>\n  <p>Your note or tip here.</p>\n</div>`
    },
    {
      name: 'Warning Callout',
      tag: 'Callout',
      color: '#F59E0B',
      desc: 'Amber box for warnings, deadlines, or cautions.',
      preview: '<div style="border-left:4px solid #F59E0B;background:#fffbeb;border-radius:0 6px 6px 0;padding:8px 10px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:4px"><div style="width:60px;height:8px;background:#F59E0B;border-radius:3px;opacity:.7"></div><div style="width:110px;height:6px;background:#fcd34d;border-radius:3px"></div></div>',
      html: `<div style="background:#fffbeb;border-left:4px solid #F59E0B;padding:16px 20px;border-radius:0 8px 8px 0;margin:16px 0;">\n  <p><strong>&#9888;&#65039; Heads up</strong></p>\n  <p>Your warning or deadline here.</p>\n</div>`
    },
    {
      name: 'Two-Column Layout',
      tag: 'Layout',
      color: '#8B5CF6',
      desc: 'Side-by-side content columns, stacks on mobile.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#ede9fe;border-radius:4px"></div><div style="background:#ede9fe;border-radius:4px"></div></div>',
      html: `<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin:16px 0;">\n  <div>\n    <p>Left column content here.</p>\n  </div>\n  <div>\n    <p>Right column content here.</p>\n  </div>\n</div>`
    },
    {
      name: 'Video Embed',
      tag: 'Media',
      color: '#EC4899',
      desc: 'Responsive 16:9 video container for YouTube, Kaltura, etc.',
      preview: '<div style="background:#fdf2f8;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center"><div style="width:24px;height:24px;background:#EC4899;border-radius:50%;display:flex;align-items:center;justify-content:center"><div style="border-left:10px solid white;border-top:6px solid transparent;border-bottom:6px solid transparent;margin-left:3px"></div></div></div>',
      html: `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:8px;margin:16px 0;">\n  <iframe src="PASTE_EMBED_URL_HERE"\n    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"\n    allowfullscreen\n    title="Video title here"></iframe>\n</div>`
    },
    {
      name: 'Pull Quote',
      tag: 'Text',
      color: '#FFCB05',
      desc: 'Styled blockquote with maize accent for emphasis.',
      preview: '<div style="border-left:4px solid #FFCB05;background:#fffdf0;padding:8px 12px;border-radius:0 6px 6px 0;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:100px;height:7px;background:#d4a800;border-radius:3px;opacity:.6"></div><div style="width:60px;height:5px;background:#d4a800;border-radius:3px;opacity:.3"></div></div>',
      html: `<blockquote style="border-left:4px solid #FFCB05;margin:24px 0;padding:12px 24px;background:#fffdf0;border-radius:0 8px 8px 0;">\n  <p style="font-size:1.15em;font-style:italic;color:#333;margin:0 0 8px;">"Your quote text here."</p>\n  <cite style="font-size:0.85em;color:#888;">&#8212; Attribution</cite>\n</blockquote>`
    },
    {
      name: 'Numbered Steps',
      tag: 'Layout',
      color: '#00274C',
      desc: 'Styled numbered list for instructions or processes.',
      preview: '<div style="display:flex;flex-direction:column;gap:6px;padding:4px 0"><div style="display:flex;align-items:center;gap:8px"><div style="width:18px;height:18px;background:#00274c;border-radius:50%;flex-shrink:0"></div><div style="height:7px;background:#e5e7eb;border-radius:3px;flex:1"></div></div><div style="display:flex;align-items:center;gap:8px"><div style="width:18px;height:18px;background:#00274c;border-radius:50%;flex-shrink:0"></div><div style="height:7px;background:#e5e7eb;border-radius:3px;flex:1"></div></div><div style="display:flex;align-items:center;gap:8px"><div style="width:18px;height:18px;background:#00274c;border-radius:50%;flex-shrink:0"></div><div style="height:7px;background:#e5e7eb;border-radius:3px;flex:1"></div></div></div>',
      html: `<ol style="list-style:none;padding:0;margin:16px 0;counter-reset:steps;">\n  <li style="display:flex;gap:16px;margin-bottom:16px;align-items:flex-start;">\n    <span style="background:#00274C;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:bold;flex-shrink:0;font-size:.9em;">1</span>\n    <div><p style="margin:6px 0 0;">Step one description here.</p></div>\n  </li>\n  <li style="display:flex;gap:16px;margin-bottom:16px;align-items:flex-start;">\n    <span style="background:#00274C;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:bold;flex-shrink:0;font-size:.9em;">2</span>\n    <div><p style="margin:6px 0 0;">Step two description here.</p></div>\n  </li>\n  <li style="display:flex;gap:16px;margin-bottom:16px;align-items:flex-start;">\n    <span style="background:#00274C;color:white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:bold;flex-shrink:0;font-size:.9em;">3</span>\n    <div><p style="margin:6px 0 0;">Step three description here.</p></div>\n  </li>\n</ol>`
    },
    {
      name: 'Resource Card',
      tag: 'Layout',
      color: '#10B981',
      desc: 'Styled link block for external resources or readings.',
      preview: '<div style="border:1px solid #d1fae5;background:#f0fdf4;border-radius:6px;padding:8px 10px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;background:#10B981;border-radius:50%"></div><div style="width:80px;height:7px;background:#6ee7b7;border-radius:3px"></div></div><div style="width:120px;height:6px;background:#a7f3d0;border-radius:3px;margin-left:14px"></div></div>',
      html: `<div style="border:1px solid #d1fae5;background:#f0fdf4;border-radius:8px;padding:16px 20px;margin:12px 0;display:flex;align-items:flex-start;gap:12px;">\n  <span style="font-size:1.4em;flex-shrink:0;">&#128196;</span>\n  <div>\n    <p style="font-weight:700;margin:0 0 4px;"><a href="PASTE_URL_HERE">Resource Title Here</a></p>\n    <p style="margin:0;font-size:.875em;color:#555;">Brief description of what this resource is and why it's useful.</p>\n  </div>\n</div>`
    }
  ];

  // ── Snippets data ──────────────────────────────────────────────────────────
  const SNIPPETS = [
    {
      name: 'Divider',
      color: '#6B7280',
      desc: 'Subtle horizontal rule to separate sections.',
      html: `<hr style="border:none;border-top:2px solid #e5e7eb;margin:24px 0;" />`
    },
    {
      name: 'Maize Divider',
      color: '#FFCB05',
      desc: 'U-M maize accent rule.',
      html: `<hr style="border:none;border-top:3px solid #FFCB05;margin:24px 0;width:60px;" />`
    },
    {
      name: 'Button Link',
      color: '#00274C',
      desc: 'Navy CTA button.',
      html: `<p><a href="PASTE_URL_HERE" style="display:inline-block;background:#00274C;color:white;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:600;font-size:.9em;">Button Label</a></p>`
    },
    {
      name: 'Accordion',
      color: '#8B5CF6',
      desc: 'Native HTML expand/collapse using &lt;details&gt;.',
      html: `<details style="border:1px solid #e5e7eb;border-radius:8px;margin:8px 0;overflow:hidden;">\n  <summary style="padding:12px 16px;cursor:pointer;font-weight:600;background:#fafafa;list-style:none;">Section Title &#9660;</summary>\n  <div style="padding:16px;">\n    <p>Hidden content goes here.</p>\n  </div>\n</details>`
    },
    {
      name: 'Image + Caption',
      color: '#EC4899',
      desc: 'Centered image with a styled caption below.',
      html: `<figure style="margin:16px 0;text-align:center;">\n  <img src="PASTE_IMAGE_URL_HERE" alt="Describe the image" style="max-width:100%;border-radius:8px;" />\n  <figcaption style="font-size:.85em;color:#666;margin-top:8px;font-style:italic;">Caption text here.</figcaption>\n</figure>`
    },
    {
      name: 'Spacer',
      color: '#D1D5DB',
      desc: '32px of vertical breathing room.',
      html: `<div style="height:32px;" aria-hidden="true"></div>`
    }
  ];

  // ── Style guide data ───────────────────────────────────────────────────────
  const STYLE_GUIDE_HTML = `
    <div class="lxd-sg">
      <p class="lxd-sg-label">Brand Colors</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#00274C" data-hex="#00274C"><div class="lxd-swatch-block"></div><span>U-M Blue</span><code>#00274C</code></div>
        <div class="lxd-swatch" style="--c:#FFCB05" data-hex="#FFCB05"><div class="lxd-swatch-block"></div><span>Maize</span><code>#FFCB05</code></div>
        <div class="lxd-swatch" style="--c:#1a3a5c" data-hex="#1a3a5c"><div class="lxd-swatch-block"></div><span>Blue Mid</span><code>#1a3a5c</code></div>
        <div class="lxd-swatch" style="--c:#f7f6f2" data-hex="#f7f6f2"><div class="lxd-swatch-block" style="border:1px solid #ddd"></div><span>Off-white</span><code>#f7f6f2</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:16px">Callout Colors</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#3B82F6" data-hex="#3B82F6"><div class="lxd-swatch-block"></div><span>Info</span><code>#3B82F6</code></div>
        <div class="lxd-swatch" style="--c:#F59E0B" data-hex="#F59E0B"><div class="lxd-swatch-block"></div><span>Warning</span><code>#F59E0B</code></div>
        <div class="lxd-swatch" style="--c:#10B981" data-hex="#10B981"><div class="lxd-swatch-block"></div><span>Success</span><code>#10B981</code></div>
        <div class="lxd-swatch" style="--c:#EF4444" data-hex="#EF4444"><div class="lxd-swatch-block"></div><span>Error</span><code>#EF4444</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:16px">Type Scale</p>
      <div class="lxd-type">
        <div class="lxd-type-row"><span style="font-size:1.5em;font-weight:700;line-height:1">Heading 2</span><code>1.5em / 700</code></div>
        <div class="lxd-type-row"><span style="font-size:1.25em;font-weight:700;line-height:1">Heading 3</span><code>1.25em / 700</code></div>
        <div class="lxd-type-row"><span style="font-size:1em;line-height:1">Body</span><code>1em / 400</code></div>
        <div class="lxd-type-row"><span style="font-size:.875em;line-height:1">Small</span><code>.875em / 400</code></div>
        <div class="lxd-type-row"><span style="font-size:.875em;font-weight:700;line-height:1">Label</span><code>.875em / 700</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:16px">Canvas CSS Classes</p>
      <div class="lxd-classes">
        <div class="lxd-class-row"><code>.new-canvas</code><span>Root wrapper for styled pages</span></div>
        <div class="lxd-class-row"><code>.display-header</code><span>Hero section</span></div>
        <div class="lxd-class-row"><code>.heading</code><span>Two-col hero layout</span></div>
        <div class="lxd-class-row"><code>.collage</code><span>Image collage container</span></div>
      </div>
    </div>
  `;

  // ── CSS ────────────────────────────────────────────────────────────────────
  const CSS = `
    #${ID} {
      position: fixed;
      top: 0; right: 0;
      width: ${PUSH_W};
      height: 100vh;
      background: #f7f6f2;
      border-left: 1px solid #e4e2dc;
      box-shadow: -4px 0 24px rgba(0,0,0,.1);
      z-index: 999999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      color: #1c1c1e;
      overflow: hidden;
    }
    #${ID} * { box-sizing: border-box; }

    /* Header */
    #${ID} .lxd-head {
      background: #1c1c1e;
      color: white;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #${ID} .lxd-head-title {
      font-weight: 700;
      font-size: .9rem;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    #${ID} .lxd-head-badge {
      background: #FFCB05;
      color: #1c1c1e;
      font-size: .62rem;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: .5px;
      text-transform: uppercase;
    }
    #${ID} .lxd-close {
      background: rgba(255,255,255,.15);
      border: none;
      color: white;
      width: 26px; height: 26px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    #${ID} .lxd-close:hover { background: rgba(255,255,255,.3); }

    /* Tabs */
    #${ID} .lxd-tabs {
      display: flex;
      background: white;
      border-bottom: 1px solid #e4e2dc;
      flex-shrink: 0;
    }
    #${ID} .lxd-tab {
      flex: 1;
      padding: 9px 4px;
      background: none;
      border: none;
      border-bottom: 2px solid transparent;
      font-size: .75rem;
      font-weight: 600;
      color: #999;
      cursor: pointer;
      transition: color .15s, border-color .15s;
      letter-spacing: .2px;
    }
    #${ID} .lxd-tab:hover { color: #555; }
    #${ID} .lxd-tab.active { color: #1c1c1e; border-bottom-color: #FFCB05; }

    /* Search */
    #${ID} .lxd-search-wrap {
      padding: 10px 12px 8px;
      background: white;
      border-bottom: 1px solid #e4e2dc;
      flex-shrink: 0;
    }
    #${ID} .lxd-search {
      width: 100%;
      padding: 6px 10px;
      border: 1px solid #e4e2dc;
      border-radius: 7px;
      font-size: .82rem;
      background: #f7f6f2;
      color: #1c1c1e;
      outline: none;
      transition: border-color .15s;
    }
    #${ID} .lxd-search:focus { border-color: #aaa; }

    /* Scroll area */
    #${ID} .lxd-panel {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: none;
    }
    #${ID} .lxd-panel.active { display: block; }

    /* Component card */
    #${ID} .lxd-card {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 10px;
      margin-bottom: 8px;
      overflow: hidden;
      transition: box-shadow .15s;
    }
    #${ID} .lxd-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
    #${ID} .lxd-card-preview {
      padding: 10px 12px 8px;
      border-bottom: 1px solid #f0ede6;
    }
    #${ID} .lxd-card-body {
      padding: 8px 12px 10px;
    }
    #${ID} .lxd-card-tag {
      font-size: .65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .7px;
      margin-bottom: 2px;
    }
    #${ID} .lxd-card-name {
      font-weight: 700;
      font-size: .88rem;
      margin-bottom: 2px;
    }
    #${ID} .lxd-card-desc {
      font-size: .76rem;
      color: #888;
      line-height: 1.4;
      margin-bottom: 8px;
    }
    #${ID} .lxd-card-actions {
      display: flex;
      gap: 6px;
    }
    #${ID} .lxd-btn-insert {
      flex: 1;
      padding: 5px 10px;
      background: #1c1c1e;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: .78rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s;
    }
    #${ID} .lxd-btn-insert:hover { background: #333; }
    #${ID} .lxd-btn-copy {
      padding: 5px 10px;
      background: transparent;
      color: #888;
      border: 1px solid #e4e2dc;
      border-radius: 6px;
      font-size: .78rem;
      cursor: pointer;
      transition: border-color .15s, color .15s;
    }
    #${ID} .lxd-btn-copy:hover { border-color: #aaa; color: #555; }

    /* Snippet card (simpler, no preview) */
    #${ID} .lxd-snippet {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 10px;
      padding: 10px 12px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #${ID} .lxd-snippet-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    #${ID} .lxd-snippet-info { flex: 1; min-width: 0; }
    #${ID} .lxd-snippet-name { font-weight: 700; font-size: .85rem; }
    #${ID} .lxd-snippet-desc { font-size: .73rem; color: #888; line-height: 1.3; }

    /* Style guide */
    #${ID} .lxd-sg-label {
      font-size: .68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: #aaa;
      margin-bottom: 8px;
    }
    #${ID} .lxd-colors {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
      margin-bottom: 4px;
    }
    #${ID} .lxd-swatch {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 8px;
      padding: 6px 8px;
      cursor: pointer;
      transition: box-shadow .15s;
    }
    #${ID} .lxd-swatch:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    #${ID} .lxd-swatch-block {
      width: 100%; height: 28px;
      background: var(--c);
      border-radius: 5px;
      margin-bottom: 5px;
    }
    #${ID} .lxd-swatch span { display: block; font-size: .72rem; font-weight: 600; color: #555; }
    #${ID} .lxd-swatch code { font-size: .68rem; color: #aaa; }

    #${ID} .lxd-type { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-type-row {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 7px;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    #${ID} .lxd-type-row code { font-size: .7rem; color: #aaa; }

    #${ID} .lxd-classes { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-class-row {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 7px;
      padding: 7px 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    #${ID} .lxd-class-row code { font-size: .75rem; color: #1c1c1e; white-space: nowrap; }
    #${ID} .lxd-class-row span { font-size: .72rem; color: #888; text-align: right; }

    /* Toast */
    #${ID}-toast {
      position: fixed;
      bottom: 24px;
      right: 340px;
      background: #1c1c1e;
      color: white;
      font-size: .78rem;
      font-family: -apple-system, sans-serif;
      padding: 7px 14px;
      border-radius: 20px;
      z-index: 9999999;
      opacity: 0;
      transition: opacity .25s;
      pointer-events: none;
    }
    #${ID}-toast.show { opacity: 1; }
  `;

  // ── Inject style ───────────────────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.id = ID + '-style';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ── Build HTML ─────────────────────────────────────────────────────────────
  function componentCards(list) {
    return list.map(c => `
      <div class="lxd-card" data-name="${c.name.toLowerCase()}">
        <div class="lxd-card-preview">${c.preview || ''}</div>
        <div class="lxd-card-body">
          <div class="lxd-card-tag" style="color:${c.color}">${c.tag}</div>
          <div class="lxd-card-name">${c.name}</div>
          <div class="lxd-card-desc">${c.desc}</div>
          <div class="lxd-card-actions">
            <button class="lxd-btn-insert" data-html="${encodeURIComponent(c.html)}">Insert</button>
            <button class="lxd-btn-copy"   data-html="${encodeURIComponent(c.html)}">Copy</button>
          </div>
        </div>
      </div>`).join('');
  }

  function snippetCards(list) {
    return list.map(s => `
      <div class="lxd-snippet" data-name="${s.name.toLowerCase()}">
        <div class="lxd-snippet-dot" style="background:${s.color}"></div>
        <div class="lxd-snippet-info">
          <div class="lxd-snippet-name">${s.name}</div>
          <div class="lxd-snippet-desc">${s.desc}</div>
        </div>
        <button class="lxd-btn-insert" data-html="${encodeURIComponent(s.html)}">Insert</button>
        <button class="lxd-btn-copy"   data-html="${encodeURIComponent(s.html)}">Copy</button>
      </div>`).join('');
  }

  const sidebar = document.createElement('div');
  sidebar.id = ID;
  sidebar.innerHTML = `
    <div class="lxd-head">
      <div class="lxd-head-title">
        🛠 LXD Sidebar
        <span class="lxd-head-badge">Beta</span>
      </div>
      <button class="lxd-close" id="${ID}-close">×</button>
    </div>

    <div class="lxd-tabs">
      <button class="lxd-tab active" data-tab="components">Components</button>
      <button class="lxd-tab"        data-tab="snippets">Snippets</button>
      <button class="lxd-tab"        data-tab="styleguide">Style Guide</button>
    </div>

    <div class="lxd-search-wrap" id="${ID}-search-wrap">
      <input class="lxd-search" id="${ID}-search" placeholder="Search…" type="search">
    </div>

    <div class="lxd-panel active" id="${ID}-panel-components">
      ${componentCards(COMPONENTS)}
    </div>

    <div class="lxd-panel" id="${ID}-panel-snippets">
      ${snippetCards(SNIPPETS)}
    </div>

    <div class="lxd-panel" id="${ID}-panel-styleguide">
      ${STYLE_GUIDE_HTML}
    </div>
  `;

  const toast = document.createElement('div');
  toast.id = ID + '-toast';
  document.body.appendChild(toast);
  document.body.appendChild(sidebar);
  document.body.style.marginRight = PUSH_W;

  // ── Insert / Copy ──────────────────────────────────────────────────────────
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function insertHTML(html) {
    // RCE v1 / v2 direct
    if (window.tinymce) {
      const ed = tinymce.activeEditor || (tinymce.editors && tinymce.editors[0]);
      if (ed) { ed.insertContent(html); showToast('Inserted ✓'); return; }
    }
    // RCE v2 sandboxed iframe
    for (const f of document.querySelectorAll('iframe')) {
      try {
        const tw = f.contentWindow;
        if (tw && tw.tinymce) {
          const ed = tw.tinymce.activeEditor || (tw.tinymce.editors && tw.tinymce.editors[0]);
          if (ed) { ed.insertContent(html); showToast('Inserted ✓'); return; }
        }
      } catch (e) { /* cross-origin, skip */ }
    }
    // Fallback: clipboard
    navigator.clipboard.writeText(html)
      .then(() => showToast('Copied to clipboard — paste with ⌘V'))
      .catch(() => showToast('Could not insert — try clicking inside the editor first'));
  }

  function copyHTML(html) {
    navigator.clipboard.writeText(html)
      .then(() => showToast('Copied to clipboard ✓'))
      .catch(() => showToast('Copy failed'));
  }

  // ── Events ─────────────────────────────────────────────────────────────────

  // Close
  document.getElementById(ID + '-close').addEventListener('click', () => {
    sidebar.remove();
    toast.remove();
    styleEl.remove();
    document.body.style.marginRight = '';
  });

  // Tabs
  sidebar.querySelectorAll('.lxd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sidebar.querySelectorAll('.lxd-tab').forEach(t => t.classList.remove('active'));
      sidebar.querySelectorAll('.lxd-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(ID + '-panel-' + tab.dataset.tab).classList.add('active');
      // Hide search on style guide
      document.getElementById(ID + '-search-wrap').style.display =
        tab.dataset.tab === 'styleguide' ? 'none' : '';
    });
  });

  // Insert / Copy buttons
  sidebar.addEventListener('click', e => {
    const btn = e.target.closest('.lxd-btn-insert, .lxd-btn-copy');
    if (!btn) return;
    const html = decodeURIComponent(btn.dataset.html);
    if (btn.classList.contains('lxd-btn-insert')) insertHTML(html);
    else copyHTML(html);
  });

  // Copy swatch hex
  sidebar.addEventListener('click', e => {
    const swatch = e.target.closest('.lxd-swatch');
    if (!swatch) return;
    navigator.clipboard.writeText(swatch.dataset.hex)
      .then(() => showToast(swatch.dataset.hex + ' copied'));
  });

  // Search filter
  document.getElementById(ID + '-search').addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    const activePanel = sidebar.querySelector('.lxd-panel.active');
    activePanel.querySelectorAll('[data-name]').forEach(card => {
      card.style.display = !q || card.dataset.name.includes(q) ? '' : 'none';
    });
  });

})();
