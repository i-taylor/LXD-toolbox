(function () {
  'use strict';

  // Detect dev vs production: document.currentScript.src contains "@develop" for the dev CDN URL
  const _scriptSrc = (document.currentScript && document.currentScript.src) || '';
  const _isDev = _scriptSrc.includes('@develop') || /^localhost|^127\./.test(window.location.hostname);

  const ID = '__lxd-sidebar';
  const PUSH_W = '360px';

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const existing = document.getElementById(ID);
  if (existing) {
    existing.remove();
    document.getElementById(ID + '-style')?.remove();
    document.body.style.marginRight = '';
    return;
  }

  // ── Components data ────────────────────────────────────────────────────────
  // HTML snippets sourced from academic-innovation/canvas-css cookbook JSON
  const COMPONENTS = [

    // ── Text ───────────────────────────────────────────────────────────────
    {
      name: 'Text Block',
      cat: 'Text',
      type: 'standalone',
      color: '#00274C',
      desc: 'Base content section. Most common building block.',
      preview: '<div style="padding:6px 8px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:70px;height:9px;background:#00274c;border-radius:3px;opacity:.7"></div><div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px"></div><div style="width:85%;height:6px;background:#e5e7eb;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <h2>Heading 2</h2>\n  <p>Paragraph text</p>\n</section>\n</div>`
    },
    {
      name: 'Text Block (Assignment)',
      cat: 'Text',
      type: 'standalone',
      color: '#00274C',
      desc: 'Text block styled for assignment instructions.',
      preview: '<div style="padding:6px 8px;height:52px;border-left:3px solid #00274c;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:80px;height:9px;background:#00274c;border-radius:3px;opacity:.8"></div><div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px"></div><div style="width:75%;height:6px;background:#e5e7eb;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block assignment">\n  <h2>Your Assignment</h2>\n  <h3>Overview</h3>\n  <p>Assignment instructions go here.</p>\n  <h3>Instructions</h3>\n  <p>Step-by-step instructions. <a href="">link text</a></p>\n</section>\n</div>`
    },
    {
      name: 'Graphical Highlight',
      cat: 'Text',
      type: 'standalone',
      color: '#8B5CF6',
      desc: 'Two-column highlight — text left, graphic right.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#ede9fe;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:#ddd6fe;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="width:20px;height:20px;background:#8B5CF6;border-radius:50%;opacity:.4"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="graphical-highlight">\n  <div>\n    <p>Highlight content goes here.</p>\n  </div>\n  <div></div>\n</section>\n</div>`,
      variants: [
        { label: 'Default',    cls: '',          bg: '#FFEA9B' },
        { label: 'UM Blue',    cls: 'umblue',    bg: '#00274C' },
        { label: 'Maize',      cls: 'maize',     bg: '#FFCB05' },
        { label: 'Cool Blue',  cls: 'coolblue',  bg: '#305CDE' },
      ]
    },
    {
      name: 'Gamut Intro (Gallery)',
      cat: 'Text',
      type: 'standalone',
      color: '#10B981',
      desc: 'Text block for introducing a Gamut Gallery tool.',
      preview: '<div style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:60px;height:8px;background:#10B981;border-radius:3px;opacity:.8"></div><div style="width:90px;height:6px;background:rgba(16,185,129,.3);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block gamut-intro gallery">\n  <p>Text block content</p>\n</section>\n</div>`
    },
    {
      name: 'Gamut Intro (Workbook)',
      cat: 'Text',
      type: 'standalone',
      color: '#10B981',
      desc: 'Text block for introducing a Gamut Workbook tool.',
      preview: '<div style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:60px;height:8px;background:#059669;border-radius:3px;opacity:.8"></div><div style="width:90px;height:6px;background:rgba(5,150,105,.3);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block gamut-intro workbook">\n  <p>Text block content</p>\n</section>\n</div>`
    },

    // ── Callouts ───────────────────────────────────────────────────────────
    {
      name: 'Callout Box',
      cat: 'Callouts',
      type: 'text',
      color: '#3B82F6',
      desc: 'Info callout — definitions, reminders, key takeaways.',
      preview: '<div style="border:2px solid #3B82F6;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#3B82F6;border-radius:3px;opacity:.7"></div><div style="width:110px;height:6px;background:#bfdbfe;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box">\n    <p class="tag">Information</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Callout Box (Action)',
      cat: 'Callouts',
      type: 'text',
      color: '#FFCB05',
      desc: 'Action callout — prompts, reflections, learner tasks.',
      preview: '<div style="border:2px solid #FFCB05;background:#fffdf0;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="width:110px;height:6px;background:#fde68a;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box action">\n    <p class="tag">Action</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Callout Box (Highlight)',
      cat: 'Callouts',
      type: 'text',
      color: '#00274C',
      desc: 'High-visibility callout — warnings, strong emphasis.',
      preview: '<div style="background:#00274c;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#FFCB05;border-radius:3px"></div><div style="width:110px;height:6px;background:rgba(255,255,255,.25);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box highlight">\n    <p class="tag">Highlight</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Pull Quote',
      cat: 'Callouts',
      type: 'text',
      color: '#FFCB05',
      desc: 'Styled blockquote for key quotes or takeaways.',
      preview: '<div style="border-left:4px solid #FFCB05;background:#fffdf0;padding:8px 12px;border-radius:0 6px 6px 0;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:100px;height:7px;background:#d4a800;border-radius:3px;opacity:.6;font-style:italic"></div><div style="width:55px;height:5px;background:#fde68a;border-radius:3px"></div></div>',
      settings: [
        { id: 'quote',  label: 'Quote text', type: 'text', default: '', placeholder: 'Put quote text here' },
        { id: 'author', label: 'Author',      type: 'text', default: '', placeholder: 'Put author name here' },
      ],
      build(s) {
        const q = s.quote  || 'Put quote text here';
        const a = s.author || 'Put author name here';
        return `<div class="new-canvas">\n<section class="text-block">\n  <blockquote>\n    <p>${q}</p>\n    <p>${a}</p>\n  </blockquote>\n</section>\n</div>`;
      },
      html: `<div class="new-canvas">\n<section class="text-block">\n  <blockquote>\n    <p>Put quote text here</p>\n    <p>Put author name here</p>\n  </blockquote>\n</section>\n</div>`
    },
    {
      name: 'Side-by-Side Callout',
      cat: 'Callouts',
      type: 'standalone',
      color: '#6B7280',
      desc: 'Two side-by-side callout boxes for comparisons.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;height:52px"><div style="border:2px solid #9ca3af;border-radius:5px;padding:5px;display:flex;flex-direction:column;gap:3px"><div style="height:6px;background:#d1d5db;border-radius:2px;width:70%"></div><div style="height:5px;background:#e5e7eb;border-radius:2px"></div></div><div style="border:2px solid #9ca3af;border-radius:5px;padding:5px;display:flex;flex-direction:column;gap:3px"><div style="height:6px;background:#d1d5db;border-radius:2px;width:70%"></div><div style="height:5px;background:#e5e7eb;border-radius:2px"></div></div></div>',
      html: `<div class="sideBySideCallOutCon">\n  <div class="sideBySideCallOut">\n    <h2>Left heading:</h2>\n    <ul>\n      <li>Sample Text</li>\n      <li>Sample Text</li>\n    </ul>\n  </div>\n  <div class="sideBySideCallOut">\n    <h2>Right heading:</h2>\n    <ul>\n      <li>Sample Text</li>\n      <li>Sample Text</li>\n    </ul>\n  </div>\n</div>`
    },

    // ── Video ──────────────────────────────────────────────────────────────
    {
      name: 'Video Block',
      cat: 'Video',
      type: 'video',
      color: '#00274C',
      desc: 'Standard lecture video section.',
      preview: '<div style="background:#f3f4f6;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:#00274c;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid white;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:#9ca3af;border-radius:3px"></div><div style="width:38px;height:5px;background:#d1d5db;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block">\n  <div class="video-tag-wrapper">\n    <p class="tag">Video</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },
    {
      name: 'Video Block (Guest Lecture)',
      cat: 'Video',
      type: 'video',
      color: '#1a3a5c',
      desc: 'Highlighted video block for guest lecture content.',
      preview: '<div style="background:#00274c;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:rgba(255,203,5,.9);border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid #00274c;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:rgba(255,255,255,.4);border-radius:3px"></div><div style="width:38px;height:5px;background:rgba(255,255,255,.25);border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block highlight">\n  <div class="video-tag-wrapper">\n    <p class="tag">Guest Video</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },
    {
      name: 'Video Block (Blue)',
      cat: 'Video',
      type: 'video',
      color: '#3B82F6',
      desc: 'Blue-tag video block for alternate video labeling.',
      preview: '<div style="background:#eff6ff;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:#3B82F6;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid white;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:#93c5fd;border-radius:3px"></div><div style="width:38px;height:5px;background:#bfdbfe;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block blue">\n  <div class="video-tag-wrapper">\n    <p class="tag">Tag label</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },

    // ── Layout ─────────────────────────────────────────────────────────────
    {
      name: 'Course Display Header',
      cat: 'Layout',
      type: 'standalone',
      color: '#00274C',
      desc: 'Full hero header for the Course Intro page with collage and nav links.',
      preview: '<div style="background:linear-gradient(90deg,#00274c 45%,#e0e0e0 45%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:8px;top:10px;width:90px;height:10px;background:rgba(255,203,5,.9);border-radius:3px"></div><div style="position:absolute;left:8px;top:26px;width:60px;height:7px;background:rgba(255,255,255,.3);border-radius:3px"></div><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:linear-gradient(135deg,#ccc 25%,#bbb 25%,#bbb 50%,#ccc 50%,#ccc 75%,#bbb 75%);background-size:8px 8px;opacity:.6"></div></div>',
      settings: [
        { id: 'title', label: 'Course title', type: 'text', default: 'Course Title', placeholder: 'e.g. Introduction to…' },
      ],
      build(s) {
        const t = (s.title || 'Course Title').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<div class="new-canvas">\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <h2>Welcome to <strong>${t}</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="PASTE_LINK_URL">Start Here</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Syllabus</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Modules</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`;
      },
      html: `<div class="new-canvas">\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <h2>Welcome to <strong>Course Title</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="PASTE_LINK_URL">Start Here</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Syllabus</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Modules</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Course Display Header (Series)',
      cat: 'Layout',
      type: 'standalone',
      color: '#00274C',
      desc: 'Display header with a "Course # of #" tag — for courses in a series.',
      preview: '<div style="background:linear-gradient(90deg,#00274c 45%,#e0e0e0 45%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:8px;top:6px;width:44px;height:6px;background:rgba(255,203,5,.7);border-radius:3px"></div><div style="position:absolute;left:8px;top:17px;width:90px;height:10px;background:rgba(255,203,5,.9);border-radius:3px"></div><div style="position:absolute;left:8px;top:33px;width:60px;height:7px;background:rgba(255,255,255,.3);border-radius:3px"></div><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:linear-gradient(135deg,#ccc 25%,#bbb 25%,#bbb 50%,#ccc 50%,#ccc 75%,#bbb 75%);background-size:8px 8px;opacity:.6"></div></div>',
      settings: [
        { id: 'num',   label: 'Course #',       type: 'number', default: 1, min: 1, max: 20 },
        { id: 'total', label: 'Total in series', type: 'number', default: 3, min: 2, max: 20 },
        { id: 'title', label: 'Course title',    type: 'text',   default: 'Course Title', placeholder: 'e.g. Introduction to…' },
      ],
      build(s) {
        const num   = Math.max(1, +s.num   || 1);
        const total = Math.max(2, +s.total || 3);
        const t     = (s.title || 'Course Title').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<div class="new-canvas">\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <p class="tag">Course ${num} of ${total}</p>\n      <h2>Welcome to <strong>${t}</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="PASTE_LINK_URL">Start Here</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Syllabus</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Modules</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`;
      },
      html: `<div class="new-canvas">\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <p class="tag">Course # of #</p>\n      <h2>Welcome to <strong>Course Title</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="PASTE_LINK_URL">Start Here</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Syllabus</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">See Modules</a></p></li>\n      <li><p><a href="PASTE_LINK_URL">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Course Header (Series)',
      cat: 'Layout',
      type: 'standalone',
      color: '#1a3a5c',
      desc: 'Display header with series number sub-title.',
      preview: '<div style="background:linear-gradient(90deg,#1a3a5c 45%,#e0e0e0 45%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:6px;top:6px;width:60px;height:5px;background:rgba(255,255,255,.3);border-radius:2px"></div><div style="position:absolute;left:6px;top:16px;width:90px;height:10px;background:rgba(255,203,5,.9);border-radius:3px"></div><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:linear-gradient(135deg,#ccc 25%,#bbb 25%,#bbb 50%,#ccc 50%,#ccc 75%,#bbb 75%);background-size:8px 8px;opacity:.6"></div></div>',
      html: `<div class="new-canvas">\n<div class="sub-title">\n  <p>Course # of the <em>Course Series Name</em> Series</p>\n</div>\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <p class="tag">Course # of #</p>\n      <h2>Welcome to <strong>Course Title</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75" loading="lazy">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image" loading="lazy"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="URL here">Start Here</a></p></li>\n      <li><p><a href="URL here">See Syllabus</a></p></li>\n      <li><p><a href="URL here">See Modules</a></p></li>\n      <li><p><a href="URL here">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Accordion',
      cat: 'Layout',
      type: 'standalone',
      color: '#00274C',
      desc: 'Expandable FAQ-style sections with details/summary.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;padding:4px 2px"><div style="background:#f3f4f6;border-radius:4px;padding:6px 8px;display:flex;justify-content:space-between;align-items:center"><div style="width:60px;height:7px;background:#d1d5db;border-radius:3px"></div><span style="color:#aaa;font-size:9px">▾</span></div><div style="background:#f3f4f6;border-radius:4px;padding:6px 8px;display:flex;justify-content:space-between;align-items:center"><div style="width:80px;height:7px;background:#d1d5db;border-radius:3px"></div><span style="color:#aaa;font-size:9px">▾</span></div></div>',
      settings: [
        { id: 'items', label: 'Number of items', type: 'number', default: 3, min: 1, max: 12 },
      ],
      build(s) {
        const n = Math.max(1, Math.min(12, +s.items || 3));
        const details = Array.from({ length: n }, (_, i) =>
          `    <details>\n      <summary>Accordion Item Title ${i + 1}</summary>\n      <div>\n        <p>Content for accordion item ${i + 1}.</p>\n      </div>\n    </details>`
        ).join('\n');
        return `<div class="new-canvas">\n<section>\n  <section class="accordion">\n    <h2>Frequently Asked Questions</h2>\n${details}\n  </section>\n</section>\n</div>`;
      },
      html: `<div class="new-canvas">\n<section>\n  <section class="accordion">\n    <h2>Frequently Asked Questions</h2>\n    <details>\n      <summary>Accordion Item Title 1</summary>\n      <div>\n        <p>Content for accordion item 1.</p>\n      </div>\n    </details>\n    <details>\n      <summary>Accordion Item Title 2</summary>\n      <div>\n        <p>Content for accordion item 2.</p>\n      </div>\n    </details>\n    <details>\n      <summary>Accordion Item Title 3</summary>\n      <div>\n        <p>Content for accordion item 3.</p>\n      </div>\n    </details>\n  </section>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Text)',
      cat: 'Layout',
      type: 'text',
      color: '#8B5CF6',
      desc: 'Two text columns side by side.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-text">\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the first column.</p>\n    </div>\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the second column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Text Light Blue)',
      cat: 'Layout',
      type: 'text',
      color: '#3B82F6',
      desc: 'Two text columns with a light blue background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#eff6ff;border-radius:6px;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#93c5fd;border-radius:3px"></div><div style="height:5px;background:#bfdbfe;border-radius:3px"></div></div><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#93c5fd;border-radius:3px"></div><div style="height:5px;background:#bfdbfe;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-text light-blue">\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the first column.</p>\n    </div>\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the second column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image)',
      cat: 'Layout',
      type: 'text',
      color: '#8B5CF6',
      desc: 'Text left, image right.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="#ddd6fe"/><circle cx="10" cy="8" r="3" fill="#c4b5fd"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="#c4b5fd"/></svg></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image Dark)',
      cat: 'Layout',
      type: 'text',
      color: '#1c1c1e',
      desc: 'Text and image side by side, dark background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#1c1c1e;border-radius:6px;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:rgba(255,203,5,.7);border-radius:3px"></div><div style="height:5px;background:rgba(255,255,255,.2);border-radius:3px"></div></div><div style="background:rgba(255,255,255,.08);border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="rgba(255,255,255,.08)"/><circle cx="10" cy="8" r="3" fill="rgba(255,255,255,.3)"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="rgba(255,255,255,.3)"/></svg></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img dark">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image Highlight)',
      cat: 'Layout',
      type: 'text',
      color: '#FFCB05',
      desc: 'Text and image side by side, maize highlight background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#fffdf0;border-radius:6px;border:2px solid #FFCB05;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="height:5px;background:#fde68a;border-radius:3px"></div></div><div style="background:#fef9c3;border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="#fde68a"/><circle cx="10" cy="8" r="3" fill="#d4a800"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="#d4a800"/></svg></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img highlight">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Image / Text)',
      cat: 'Layout',
      type: 'text',
      color: '#8B5CF6',
      desc: 'Image left, text right — flexible to the image\'s native aspect ratio.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="#ddd6fe"/><circle cx="10" cy="8" r="3" fill="#c4b5fd"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="#c4b5fd"/></svg></div><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col img-text">\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" width="" height="" loading="lazy">\n    </div>\n    <div>\n      <p class="tag">optional tag</p>\n      <h3>Optional H3 Heading</h3>\n      <p>Text content for the right column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Image / Text Dark)',
      cat: 'Layout',
      type: 'text',
      color: '#1c1c1e',
      desc: 'Image left, text right — dark background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#1c1c1e;border-radius:6px;padding:6px"><div style="background:rgba(255,255,255,.08);border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="rgba(255,255,255,.08)"/><circle cx="10" cy="8" r="3" fill="rgba(255,255,255,.3)"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="rgba(255,255,255,.3)"/></svg></div><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:rgba(255,203,5,.7);border-radius:3px"></div><div style="height:5px;background:rgba(255,255,255,.2);border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col img-text dark">\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" width="" height="" loading="lazy">\n    </div>\n    <div>\n      <p class="tag">optional tag</p>\n      <h3>Optional H3 Heading</h3>\n      <p>Text content for the right column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Image / Text Corner Accent)',
      cat: 'Layout',
      type: 'text',
      color: '#8B5CF6',
      desc: 'Image left, text right — with a corner accent decoration.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;position:relative"><div style="background:#ede9fe;border-radius:4px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="#ddd6fe"/><circle cx="10" cy="8" r="3" fill="#c4b5fd"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="#c4b5fd"/></svg><div style="position:absolute;top:0;left:0;width:10px;height:10px;background:#8B5CF6;border-radius:0 0 4px 0"></div></div><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col img-text corner-accent">\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" width="" height="" loading="lazy">\n    </div>\n    <div>\n      <p class="tag">optional tag</p>\n      <h3>Optional H3 Heading</h3>\n      <p>Text content for the right column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Image / Text Corner Accent Dark)',
      cat: 'Layout',
      type: 'text',
      color: '#1c1c1e',
      desc: 'Image left, text right — corner accent, dark background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#1c1c1e;border-radius:6px;padding:6px"><div style="background:rgba(255,255,255,.08);border-radius:3px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative"><svg width="36" height="28" viewBox="0 0 36 28"><rect width="36" height="28" fill="rgba(255,255,255,.08)"/><circle cx="10" cy="8" r="3" fill="rgba(255,255,255,.3)"/><path d="M0 20 L10 12 L16 18 L21 14 L36 23 L36 28 L0 28 Z" fill="rgba(255,255,255,.3)"/></svg><div style="position:absolute;top:0;left:0;width:8px;height:8px;background:rgba(255,203,5,.8);border-radius:0 0 3px 0"></div></div><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:rgba(255,203,5,.7);border-radius:3px"></div><div style="height:5px;background:rgba(255,255,255,.2);border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col img-text corner-accent dark">\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" width="" height="" loading="lazy">\n    </div>\n    <div>\n      <p class="tag">optional tag</p>\n      <h3>Optional H3 Heading</h3>\n      <p>Text content for the right column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Instructor Panel (Blue)',
      cat: 'Layout',
      type: 'standalone',
      color: '#00274C',
      desc: 'Instructor profile block — U-M Blue variant.',
      preview: '<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:center;height:52px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#93c5fd,#60a5fa)"></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:70px;height:8px;background:#00274c;border-radius:3px;opacity:.7"></div><div style="width:100px;height:5px;background:#d1d5db;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section>\n  <div class="instructor">\n    <div>\n      <img src="PASTE_PHOTO_URL" alt="Headshot of Instructor Name">\n      <h2>Instructor Name</h2>\n      <p><strong>Title, Department</strong></p>\n    </div>\n    <div>\n      <p>Instructor bio goes here.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Instructor Panel (Maize)',
      cat: 'Layout',
      type: 'standalone',
      color: '#FFCB05',
      desc: 'Instructor profile block — U-M Maize variant.',
      preview: '<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:center;height:52px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#fde68a,#fbbf24)"></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:70px;height:8px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="width:100px;height:5px;background:#fde68a;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section>\n  <div class="instructor maize">\n    <div>\n      <img src="PASTE_PHOTO_URL" alt="Headshot of Instructor Name">\n      <h2>Instructor Name</h2>\n      <p><strong>Title, Department</strong></p>\n    </div>\n    <div>\n      <p>Instructor bio goes here.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },

    // ── Media ──────────────────────────────────────────────────────────────
    {
      name: 'Image (Sharp Corners)',
      cat: 'Media',
      type: 'text',
      color: '#F97316',
      desc: 'Full-width image with caption text.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;height:52px"><div style="background:#e5e7eb;border-radius:3px;flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="44" height="30" viewBox="0 0 44 30"><rect width="44" height="30" fill="#d1d5db"/><circle cx="12" cy="9" r="4" fill="#9ca3af"/><path d="M0 22 L12 12 L20 19 L27 14 L44 25 L44 30 L0 30 Z" fill="#9ca3af"/></svg></div><div style="width:70px;height:5px;background:#d1d5db;border-radius:3px;margin:0 auto"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="img-caption">\n    <img src="PASTE_IMAGE_URL" alt="Alt text here" loading="lazy">\n    <p><em>Put caption text here</em></p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Image (Rounded Corners)',
      cat: 'Media',
      type: 'text',
      color: '#F97316',
      desc: 'Full-width image with rounded corners and caption.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;height:52px"><div style="background:#e5e7eb;border-radius:10px;flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden"><svg width="44" height="30" viewBox="0 0 44 30"><rect width="44" height="30" fill="#d1d5db"/><circle cx="12" cy="9" r="4" fill="#9ca3af"/><path d="M0 22 L12 12 L20 19 L27 14 L44 25 L44 30 L0 30 Z" fill="#9ca3af"/></svg></div><div style="width:70px;height:5px;background:#d1d5db;border-radius:3px;margin:0 auto"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="img-caption">\n    <img src="PASTE_IMAGE_URL" class="rounded-corners" alt="Alt text here" loading="lazy">\n    <p><em>Put caption text here</em></p>\n  </div>\n</section>\n</div>`
    },

    // ── Tables ─────────────────────────────────────────────────────────────
    {
      name: 'Table',
      cat: 'Tables',
      type: 'text',
      color: '#0EA5E9',
      desc: 'Standard scrollable data table.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:8px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      settings: [
        { id: 'rows',   label: 'Rows',        type: 'number',   default: 3, min: 1, max: 15 },
        { id: 'cols',   label: 'Columns',      type: 'number',   default: 3, min: 1, max: 8  },
        { id: 'header', label: 'Header row',   type: 'checkbox', default: true },
      ],
      build(s) { return buildTable('', s); },
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table>\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Table (Alternate Rows)',
      cat: 'Tables',
      type: 'text',
      color: '#0EA5E9',
      desc: 'Table with alternating row background colors.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:8px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;background:#f0f9ff;display:flex;gap:8px"><div style="height:5px;background:#bae6fd;border-radius:2px;flex:1"></div><div style="height:5px;background:#bae6fd;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      settings: [
        { id: 'rows',   label: 'Rows',        type: 'number',   default: 3, min: 1, max: 15 },
        { id: 'cols',   label: 'Columns',      type: 'number',   default: 3, min: 1, max: 8  },
        { id: 'header', label: 'Header row',   type: 'checkbox', default: true },
      ],
      build(s) { return buildTable('alternate-rows', s); },
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table class="alternate-rows">\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Table (Alternate Columns)',
      cat: 'Tables',
      type: 'text',
      color: '#0EA5E9',
      desc: 'Table with alternating column background colors.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:4px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.3);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:4px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#f0f9ff;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:4px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#f0f9ff;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      settings: [
        { id: 'rows',   label: 'Rows',        type: 'number',   default: 3, min: 1, max: 15 },
        { id: 'cols',   label: 'Columns',      type: 'number',   default: 3, min: 1, max: 8  },
        { id: 'header', label: 'Header row',   type: 'checkbox', default: true },
      ],
      build(s) { return buildTable('alternate-columns', s); },
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table class="alternate-columns">\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },

    // ── Footer ─────────────────────────────────────────────────────────────
    {
      name: 'MO Logo Footer',
      cat: 'Footer',
      type: 'standalone',
      color: '#00274C',
      desc: 'Michigan Online logo footer — place at the bottom of the page.',
      preview: '<div style="background:#00274c;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;padding:8px 14px"><div style="height:14px;width:80px;background:white;border-radius:2px;opacity:.9"></div></div>',
      html: `<div class="new-canvas">\n<section class="mo-logo-footer">\n  <img role="presentation" src="https://shared-files.online.umich.edu/michigan-online/course-images/current/michiganOnline.png" alt="" width="318" height="56" />\n</section>\n</div>`
    },
    {
      name: 'Button Footer + MO Logo',
      cat: 'Footer',
      type: 'standalone',
      color: '#00274C',
      desc: 'CTA button above the Michigan Online logo footer.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;height:52px"><div style="background:#FFCB05;border-radius:5px;height:18px;display:flex;align-items:center;justify-content:center"><div style="width:50px;height:6px;background:#1c1c1e;border-radius:2px;opacity:.6"></div></div><div style="background:#00274c;border-radius:5px;flex:1;display:flex;align-items:center;justify-content:center"><div style="height:10px;width:60px;background:white;border-radius:2px;opacity:.7"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="btn-footer">\n  <a href="URL here" class="btn">Start Here</a>\n</section>\n<section class="mo-logo-footer">\n  <img role="presentation" src="https://shared-files.online.umich.edu/michigan-online/course-images/current/michiganOnline.png" alt="" width="318" height="56" />\n</section>\n</div>`
    },

  ];

  // ── Snippets data ──────────────────────────────────────────────────────────
  // ── Pages data ─────────────────────────────────────────────────────────────
  // Each entry is a full pre-built page template — multiple sections inserted
  // together. 'sections' is an array of { html, type } objects so doInsert
  // handles each one with the correct merging / standalone rules.
  const PAGES = [
    // Add page templates here
  ];

  // ── Style guide data ───────────────────────────────────────────────────────
  const STYLE_GUIDE_HTML = `
    <div class="lxd-sg">

      <p class="lxd-sg-label">Primary</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#00274C" data-hex="#00274C"><div class="lxd-swatch-block"></div><span>um-blue</span><code>#00274C</code></div>
        <div class="lxd-swatch" style="--c:#ffcb05" data-hex="#ffcb05"><div class="lxd-swatch-block"></div><span>um-maize</span><code>#ffcb05</code></div>
        <div class="lxd-swatch" style="--c:#ffffff" data-hex="#ffffff"><div class="lxd-swatch-block" style="border:1px solid #e4e2dc"></div><span>white</span><code>#ffffff</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:14px">Secondary</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#1022A0" data-hex="#1022A0"><div class="lxd-swatch-block"></div><span>blue CTA</span><code>#1022A0</code></div>
        <div class="lxd-swatch" style="--c:#305CDE" data-hex="#305CDE"><div class="lxd-swatch-block"></div><span>cool blue</span><code>#305CDE</code></div>
        <div class="lxd-swatch" style="--c:#59B5F7" data-hex="#59B5F7"><div class="lxd-swatch-block"></div><span>warm blue</span><code>#59B5F7</code></div>
        <div class="lxd-swatch" style="--c:#FF5B1A" data-hex="#FF5B1A"><div class="lxd-swatch-block"></div><span>accent orange</span><code>#FF5B1A</code></div>
        <div class="lxd-swatch" style="--c:#FFEA9B" data-hex="#FFEA9B"><div class="lxd-swatch-block"></div><span>yellow light</span><code>#FFEA9B</code></div>
        <div class="lxd-swatch" style="--c:#fffbeb" data-hex="#fffbeb"><div class="lxd-swatch-block" style="border:1px solid #e4e2dc"></div><span>yellow x-light</span><code>#fffbeb</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:14px">Shapes &amp; Graphics</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#59B5F7" data-hex="#59B5F7"><div class="lxd-swatch-block"></div><span>accent warm blue</span><code>#59B5F7</code></div>
        <div class="lxd-swatch" style="--c:#acdafb" data-hex="#acdafb"><div class="lxd-swatch-block"></div><span>warm blue light</span><code>#acdafb</code></div>
        <div class="lxd-swatch" style="--c:#def0fd" data-hex="#def0fd"><div class="lxd-swatch-block" style="border:1px solid #e4e2dc"></div><span>warm blue x-light</span><code>#def0fd</code></div>
        <div class="lxd-swatch" style="--c:#ffcb05" data-hex="#ffcb05"><div class="lxd-swatch-block"></div><span>accent yellow</span><code>#ffcb05</code></div>
        <div class="lxd-swatch" style="--c:#FF5B1A" data-hex="#FF5B1A"><div class="lxd-swatch-block"></div><span>accent orange</span><code>#FF5B1A</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:14px">Notifications</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#008000" data-hex="#008000"><div class="lxd-swatch-block"></div><span>success</span><code>#008000</code></div>
        <div class="lxd-swatch" style="--c:#fd8904" data-hex="#fd8904"><div class="lxd-swatch-block"></div><span>warning</span><code>#fd8904</code></div>
        <div class="lxd-swatch" style="--c:#b60000" data-hex="#b60000"><div class="lxd-swatch-block"></div><span>error</span><code>#b60000</code></div>
        <div class="lxd-swatch" style="--c:#702082" data-hex="#702082"><div class="lxd-swatch-block"></div><span>info</span><code>#702082</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:14px">Grays</p>
      <div class="lxd-colors">
        <div class="lxd-swatch" style="--c:#f8f8f8" data-hex="#f8f8f8"><div class="lxd-swatch-block" style="border:1px solid #e4e2dc"></div><span>neutral x-light</span><code>#f8f8f8</code></div>
        <div class="lxd-swatch" style="--c:#EAEBEA" data-hex="#EAEBEA"><div class="lxd-swatch-block"></div><span>neutral light</span><code>#EAEBEA</code></div>
        <div class="lxd-swatch" style="--c:#d5d7d5" data-hex="#d5d7d5"><div class="lxd-swatch-block"></div><span>neutral medium</span><code>#d5d7d5</code></div>
        <div class="lxd-swatch" style="--c:#acafab" data-hex="#acafab"><div class="lxd-swatch-block"></div><span>border default</span><code>#acafab</code></div>
        <div class="lxd-swatch" style="--c:#797c78" data-hex="#797c78"><div class="lxd-swatch-block"></div><span>neutral dark</span><code>#797c78</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:16px">Type Scale</p>
      <div class="lxd-type">
        <div class="lxd-type-row"><span style="font-size:1.5em;font-weight:700;line-height:1">Heading 2</span><code>1.5em / 700</code></div>
        <div class="lxd-type-row"><span style="font-size:1.25em;font-weight:700;line-height:1">Heading 3</span><code>1.25em / 700</code></div>
        <div class="lxd-type-row"><span style="font-size:1.1em;font-weight:700;line-height:1">Heading 4</span><code>1.1em / 700</code></div>
        <div class="lxd-type-row"><span style="font-size:1em;line-height:1">Body</span><code>1em / 400</code></div>
        <div class="lxd-type-row"><span style="font-size:.875em;line-height:1">Small / Tag</span><code>.875em / 400</code></div>
      </div>

      <p class="lxd-sg-label" style="margin-top:16px">Component Classes</p>
      <div class="lxd-classes">
        <div class="lxd-class-row"><code>.new-canvas</code><span>Root wrapper (required)</span></div>
        <div class="lxd-class-row"><code>.text-block</code><span>Content section</span></div>
        <div class="lxd-class-row"><code>.text-block.assignment</code><span>Assignment instructions</span></div>
        <div class="lxd-class-row"><code>.text-block.video-block</code><span>Lecture video section</span></div>
        <div class="lxd-class-row"><code>.text-block.video-block.highlight</code><span>Guest lecture</span></div>
        <div class="lxd-class-row"><code>.text-block.video-block.blue</code><span>Blue video variant</span></div>
        <div class="lxd-class-row"><code>.display-header</code><span>Course intro hero</span></div>
        <div class="lxd-class-row"><code>.sub-title</code><span>Series sub-title bar</span></div>
        <div class="lxd-class-row"><code>.accordion</code><span>FAQ accordion</span></div>
        <div class="lxd-class-row"><code>.callout-box</code><span>Info callout</span></div>
        <div class="lxd-class-row"><code>.callout-box.action</code><span>CTA callout</span></div>
        <div class="lxd-class-row"><code>.callout-box.highlight</code><span>Navy callout</span></div>
        <div class="lxd-class-row"><code>.two-col.text-text</code><span>Two text columns</span></div>
        <div class="lxd-class-row"><code>.two-col.text-img</code><span>Text + image</span></div>
        <div class="lxd-class-row"><code>.two-col .dark/.highlight</code><span>Two-col variants</span></div>
        <div class="lxd-class-row"><code>.instructor</code><span>Instructor profile</span></div>
        <div class="lxd-class-row"><code>.instructor.maize</code><span>Maize variant</span></div>
        <div class="lxd-class-row"><code>.graphical-highlight</code><span>Graphic + text block</span></div>
        <div class="lxd-class-row"><code>.gamut-intro.gallery</code><span>Gamut Gallery intro</span></div>
        <div class="lxd-class-row"><code>.gamut-intro.workbook</code><span>Gamut Workbook intro</span></div>
        <div class="lxd-class-row"><code>.img-caption</code><span>Image with caption</span></div>
        <div class="lxd-class-row"><code>.rounded-corners</code><span>Image modifier</span></div>
        <div class="lxd-class-row"><code>.table-container</code><span>Scrollable table wrapper</span></div>
        <div class="lxd-class-row"><code>.alternate-rows</code><span>Table row striping</span></div>
        <div class="lxd-class-row"><code>.alternate-columns</code><span>Table col striping</span></div>
        <div class="lxd-class-row"><code>.tag</code><span>Inline pill label</span></div>
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
    #${ID} .lxd-resize-handle {
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 5px;
      cursor: ew-resize;
      z-index: 10;
      transition: background .15s;
    }
    #${ID} .lxd-resize-handle:hover,
    #${ID} .lxd-resize-handle.dragging { background: rgba(0,39,76,.12); }
    #${ID} * { box-sizing: border-box; }

    #${ID} .lxd-head {
      background: #1c1c1e;
      color: white;
      padding: 12px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    #${ID} .lxd-head-dev {
      background: #1c1c1e;
      border-top: 3px solid #F97316;
    }
    #${ID} .lxd-head-title {
      font-weight: 700;
      font-size: .9rem;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    #${ID} .lxd-head-badge {
      font-size: .62rem;
      font-weight: 800;
      padding: 2px 7px;
      border-radius: 4px;
      letter-spacing: .5px;
      text-transform: uppercase;
      background: #F97316;
      color: white;
      border: 1px dashed rgba(255,255,255,.5);
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
      font-size: .73rem;
      font-weight: 600;
      color: #646464;
      cursor: pointer;
      transition: color .15s, border-color .15s;
      white-space: nowrap;
    }
    #${ID} .lxd-tab:hover { color: #555; }
    #${ID} .lxd-tab.active { color: #1c1c1e; border-bottom-color: #FFCB05; }

    /* ── Category tile grid (level 1) ── */
    #${ID}-panel-components { padding: 0; }
    #${ID} .lxd-comp-home {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      padding: 10px;
    }
    #${ID} .lxd-cat-tile {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      transition: box-shadow .15s, border-color .15s;
    }
    #${ID} .lxd-cat-tile:hover { box-shadow: 0 4px 14px rgba(0,0,0,.09); border-color: #ccc; }
    #${ID} .lxd-cat-tile-accent { height: 4px; background: var(--accent); }
    #${ID} .lxd-cat-tile-body { padding: 10px 10px 9px; }
    #${ID} .lxd-cat-tile-name { font-weight: 700; font-size: .85rem; margin-bottom: 3px; color: #1c1c1e; }
    #${ID} .lxd-cat-tile-count { font-size: .7rem; color: #767676; }

    /* ── Browse header ── */
    #${ID} .lxd-browse-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px 8px;
      border-bottom: 1px solid #e4e2dc;
      flex-shrink: 0;
    }
    #${ID} .lxd-back-btn {
      background: none;
      border: none;
      font-size: .75rem;
      font-weight: 600;
      color: #595959;
      cursor: pointer;
      padding: 2px 6px 2px 2px;
      border-radius: 5px;
      transition: color .15s;
    }
    #${ID} .lxd-back-btn:hover { color: #333; }
    #${ID} .lxd-browse-title { font-weight: 700; font-size: .88rem; color: #1c1c1e; }

    /* ── Component tile grid (level 2 + search) ── */
    #${ID} .lxd-comp-tiles {
      display: grid;
      grid-template-columns: 1fr;
      gap: 7px;
      padding: 8px 10px;
    }
    #${ID} .lxd-comp-tile {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 9px;
      overflow: hidden;
      transition: box-shadow .15s;
    }
    #${ID} .lxd-comp-tile:hover { box-shadow: 0 3px 10px rgba(0,0,0,.08); }
    #${ID} .lxd-comp-tile-preview {
      padding: 10px 12px 8px;
      border-bottom: 1px solid #f0ede6;
      height: 68px;
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      cursor: zoom-in;
      position: relative;
      transition: background .15s;
    }
    #${ID} .lxd-comp-tile-preview:hover { background: #f0ede6; }
    #${ID} .lxd-comp-tile-preview > * { pointer-events: none; width: 100%; }
    #${ID} .lxd-comp-tile-name { padding: 6px 10px 4px; font-size: .75rem; font-weight: 600; color: #1c1c1e; line-height: 1.3; }
    #${ID} .lxd-comp-tile-actions { display: flex; gap: 5px; padding: 0 10px 9px; }
    #${ID} .lxd-comp-tile-actions .lxd-btn-insert { flex: 1; padding: 4px 6px; font-size: .72rem; }
    #${ID} .lxd-comp-tile-actions .lxd-btn-copy   { padding: 4px 8px; font-size: .72rem; }

    /* ── Editor tools strip ── */
    #${ID} .lxd-editor-tools {
      background: #f7f6f2;
      border-bottom: 1px solid #e4e2dc;
      padding: 5px 10px;
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }
    #${ID} .lxd-blocks-btn {
      padding: 3px 9px;
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 5px;
      font-size: .7rem;
      font-weight: 600;
      color: #666;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: background .15s, color .15s, border-color .15s;
    }
    #${ID} .lxd-blocks-btn:hover { background: #f0ede6; color: #333; border-color: #ccc; }
    #${ID} .lxd-blocks-btn.active {
      background: #00274C;
      border-color: #00274C;
      color: white;
    }
    /* ── Arrange panel ── */
    #${ID} .lxd-arrange-empty {
      padding: 32px 16px;
      text-align: center;
      color: #767676;
      font-size: .8rem;
    }
    #${ID} .lxd-arrange-list {
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    #${ID} .lxd-arrange-row {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 6px 8px;
      border-radius: 7px;
      border: 1px solid #e4e2dc;
      background: white;
      cursor: grab;
      user-select: none;
      transition: box-shadow .12s, border-color .12s;
    }
    #${ID} .lxd-arrange-row:hover { border-color: #bbb; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
    #${ID} .lxd-arrange-row.drag-over { border-color: #00274C; box-shadow: 0 0 0 2px rgba(0,39,76,.18); }
    #${ID} .lxd-arrange-row.dragging { opacity: .4; }
    #${ID} .lxd-arrange-handle {
      color: #767676;
      font-size: 14px;
      line-height: 1;
      cursor: grab;
      flex-shrink: 0;
    }
    #${ID} .lxd-arrange-badge {
      font-size: .6rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .5px;
      padding: 1px 5px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    #${ID} .lxd-arrange-badge-text          { background: #e0e7ff; color: #3730a3; }
    #${ID} .lxd-arrange-badge-video         { background: #fef9c3; color: #854d0e; }
    #${ID} .lxd-arrange-badge-other         { background: #f3f4f6; color: #4b5563; }
    #${ID} .lxd-arrange-badge-callout-info  { background: #dbeafe; color: #1d4ed8; }
    #${ID} .lxd-arrange-badge-callout-action{ background: #fef9c3; color: #854d0e; }
    #${ID} .lxd-arrange-badge-callout-hl   { background: #1c1c1e; color: #FFCB05; }
    #${ID} .lxd-arrange-badge-image         { background: #ffedd5; color: #c2410c; }
    #${ID} .lxd-arrange-badge-table         { background: #e0f2fe; color: #0369a1; }
    #${ID} .lxd-arrange-badge-quote         { background: #fdf4ff; color: #7e22ce; }
    #${ID} .lxd-arrange-row--sub {
      margin-left: 14px;
      background: #fafaf9;
      border-color: #ece9e2;
    }
    #${ID} .lxd-arrange-label {
      flex: 1;
      min-width: 0;
      font-size: .75rem;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #${ID} .lxd-arrange-del {
      background: none;
      border: none;
      color: #767676;
      font-size: 13px;
      cursor: pointer;
      padding: 0 2px;
      line-height: 1;
      flex-shrink: 0;
    }
    #${ID} .lxd-arrange-del:hover { color: #e53e3e; }

    #${ID} .lxd-search-wrap {
      padding: 7px 12px 6px;
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

    #${ID} .lxd-panel {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: none;
    }
    #${ID} .lxd-panel.active { display: block; }

    /* (card styles removed — components panel now uses tile grid) */

    #${ID} .lxd-btn-insert {
      flex: 1;
      padding: 5px 10px;
      background: #00274C;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: .78rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s;
    }
    #${ID} .lxd-btn-insert:hover { background: #003a6e; }
    #${ID} .lxd-btn-copy {
      padding: 5px 10px;
      background: #f0ede6;
      color: #555;
      border: 1px solid #e4e2dc;
      border-radius: 6px;
      font-size: .78rem;
      cursor: pointer;
      transition: background .15s, color .15s;
    }
    #${ID} .lxd-btn-copy:hover { background: #e8e4db; color: #333; }

    /* ── Pages panel ── */
    #${ID} .lxd-page-card {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 10px;
      padding: 12px 14px;
      margin-bottom: 8px;
      transition: border-color .15s, box-shadow .15s;
    }
    #${ID} .lxd-page-card:hover { border-color: #bbb; box-shadow: 0 1px 4px rgba(0,0,0,.07); }
    #${ID} .lxd-page-card-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    #${ID} .lxd-page-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    #${ID} .lxd-page-name { font-weight: 700; font-size: .85rem; flex: 1; }
    #${ID} .lxd-page-sections {
      font-size: .68rem;
      color: #767676;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .4px;
    }
    #${ID} .lxd-page-desc { font-size: .73rem; color: #595959; line-height: 1.3; margin-bottom: 10px; }
    #${ID} .lxd-page-actions { display: flex; gap: 6px; }
    #${ID} .lxd-page-del {
      background: none; border: none; color: #767676; font-size: 13px;
      cursor: pointer; padding: 0 2px; line-height: 1; flex-shrink: 0;
    }
    #${ID} .lxd-page-del:hover { color: #e53e3e; }
    /* ── Pages edit link ── */
    #${ID} .lxd-pages-edit-link {
      display: block;
      text-align: center;
      font-size: .7rem;
      color: #767676;
      padding: 10px 0 4px;
      text-decoration: none;
    }
    #${ID} .lxd-pages-edit-link:hover { color: #00274C; }

    #${ID} .lxd-sg-label {
      font-size: .68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: #767676;
      margin-bottom: 8px;
    }
    #${ID} .lxd-colors { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px; }
    #${ID} .lxd-swatch {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 8px;
      padding: 6px 8px;
      cursor: pointer;
      transition: box-shadow .15s;
    }
    #${ID} .lxd-swatch:hover { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    #${ID} .lxd-swatch-block { width: 100%; height: 28px; background: var(--c); border-radius: 5px; margin-bottom: 5px; }
    #${ID} .lxd-swatch span { display: block; font-size: .72rem; font-weight: 600; color: #555; }
    #${ID} .lxd-swatch code { font-size: .68rem; color: #ffffff; background: #1c1c1e; padding: 1px 5px; border-radius: 3px; }

    #${ID} .lxd-type { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-type-row {
      background: white; border: 1px solid #e4e2dc; border-radius: 7px;
      padding: 7px 10px; display: flex; align-items: center; justify-content: space-between;
    }
    #${ID} .lxd-type-row code { font-size: .7rem; color: #595959; background: #f0ede6; padding: 1px 5px; border-radius: 3px; }

    #${ID} .lxd-classes { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-class-row {
      background: white; border: 1px solid #e4e2dc; border-radius: 7px;
      padding: 7px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }
    #${ID} .lxd-class-row code { font-size: .73rem; color: #1c1c1e; background: #f0ede6; padding: 1px 5px; border-radius: 3px; white-space: nowrap; }
    #${ID} .lxd-class-row span { font-size: .7rem; color: #595959; text-align: right; }

    /* ── Preview modal ── */
    #${ID} .lxd-preview-modal {
      position: absolute;
      inset: 0;
      background: rgba(247,246,242,.97);
      z-index: 200;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      padding: 20px 18px 24px;
      gap: 14px;
    }
    #${ID} .lxd-pm-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 8px;
    }
    #${ID} .lxd-pm-name {
      font-weight: 700;
      font-size: 1rem;
      color: #1c1c1e;
      line-height: 1.3;
    }
    #${ID} .lxd-pm-close {
      background: rgba(0,0,0,.06);
      border: none;
      border-radius: 50%;
      width: 26px; height: 26px;
      font-size: 14px;
      cursor: pointer;
      color: #555;
      flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: background .15s;
    }
    #${ID} .lxd-pm-close:hover { background: rgba(0,0,0,.13); }
    #${ID} .lxd-pm-preview-wrap {
      border: 1px solid #e4e2dc;
      border-radius: 12px;
      overflow: hidden;
      flex: 1;
      min-height: 0;
    }
    #${ID} .lxd-pm-frame {
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      background: white;
    }
    #${ID} .lxd-pm-desc {
      font-size: .8rem;
      color: #595959;
      line-height: 1.45;
    }
    #${ID} .lxd-pm-actions {
      display: flex;
      gap: 8px;
    }
    #${ID} .lxd-pm-insert {
      flex: 1;
      padding: 8px 14px;
      background: #00274C;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: .82rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s;
    }
    #${ID} .lxd-pm-insert:hover { background: #003a6e; }
    #${ID} .lxd-pm-copy {
      padding: 8px 14px;
      background: #f0ede6;
      color: #555;
      border: 1px solid #e4e2dc;
      border-radius: 8px;
      font-size: .82rem;
      cursor: pointer;
      transition: background .15s, color .15s;
    }
    #${ID} .lxd-pm-copy:hover { background: #e8e4db; color: #333; }

    /* ── Settings panel ── */
    #${ID} .lxd-settings-btn {
      padding: 4px 7px;
      background: #f0ede6;
      border: 1px solid #e4e2dc;
      border-radius: 6px;
      font-size: .75rem;
      color: #595959;
      cursor: pointer;
      transition: background .15s, color .15s;
      line-height: 1;
    }
    #${ID} .lxd-settings-btn:hover { background: #e8e4db; color: #555; }
    #${ID} .lxd-settings-btn.active { background: #00274C; border-color: #00274C; color: white; }

    #${ID} .lxd-comp-tile-settings {
      border-top: 1px solid #f0ede6;
      background: #faf9f7;
      padding: 9px 10px 10px;
    }
    #${ID} .lxd-sf-fields {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: flex-end;
      margin-bottom: 9px;
    }
    #${ID} .lxd-sf-field { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-sf-text-field { flex: 1; min-width: 120px; }
    #${ID} .lxd-sf-label {
      font-size: .63rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .6px;
      color: #767676;
    }
    #${ID} .lxd-sf-input {
      padding: 4px 7px;
      border: 1px solid #e4e2dc;
      border-radius: 6px;
      font-size: .78rem;
      background: white;
      color: #1c1c1e;
      outline: none;
      transition: border-color .15s;
    }
    #${ID} .lxd-sf-input:focus { border-color: #aaa; }
    #${ID} .lxd-sf-input[type="number"] { width: 58px; }
    #${ID} .lxd-sf-text { width: 100%; box-sizing: border-box; }
    #${ID} .lxd-sf-check-row {
      flex-direction: row;
      align-items: center;
      gap: 6px;
      padding-bottom: 3px;
    }
    #${ID} .lxd-sf-check-label { font-size: .76rem; color: #555; cursor: pointer; }
    #${ID} .lxd-sf-submit {
      width: 100%;
      padding: 5px 10px;
      background: #00274C;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: .74rem;
      font-weight: 600;
      cursor: pointer;
      transition: background .15s;
    }
    #${ID} .lxd-sf-submit:hover { background: #003a6e; }

    /* ── Variant colour picker ── */
    #${ID} .lxd-variant-picker {
      padding: 5px 10px 9px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-top: 1px solid #f0ede6;
    }
    #${ID} .lxd-variant-label {
      font-size: .63rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .6px;
      color: #767676;
      flex-shrink: 0;
    }
    #${ID} .lxd-variant-chip {
      width: 20px; height: 20px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      outline: none;
      box-shadow: 0 0 0 2px transparent;
      transition: box-shadow .15s, transform .12s;
    }
    #${ID} .lxd-variant-chip:hover { transform: scale(1.15); }
    #${ID} .lxd-variant-chip.active {
      box-shadow: 0 0 0 2px white, 0 0 0 4px #1c1c1e;
    }

    #${ID}-toast {
      position: fixed;
      bottom: 24px; right: 380px;
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

    /* ── Course Images tab ─────────────────────────────────────────────────── */
    #${ID}-panel-images { padding: 0; overflow: hidden; }
    #${ID}-panel-images.active { display: flex; flex-direction: column; }

    #${ID} .lxd-img-view { display: flex; flex-direction: column; flex: 1; min-height: 0; }
    #${ID} .lxd-img-view.hidden { display: none; }

    #${ID} .lxd-img-toolbar {
      padding: 8px 10px;
      border-bottom: 1px solid #e4e2dc;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
      background: white;
    }
    #${ID} .lxd-img-breadcrumb {
      flex: 1;
      font-size: .72rem;
      color: #595959;
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      overflow: hidden;
    }
    #${ID} .lxd-img-crumb-btn {
      background: none; border: none; cursor: pointer;
      font-size: .72rem; color: #00274C; font-weight: 600;
      padding: 0; text-decoration: underline;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 130px;
      font-family: inherit;
    }
    #${ID} .lxd-img-crumb-sep { color: #ccc; font-size: .65rem; flex-shrink: 0; }
    #${ID} .lxd-img-crumb-current {
      color: #1c1c1e; font-weight: 600; font-size: .72rem;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    #${ID} .lxd-img-reload-btn {
      background: none; border: 1px solid #e4e2dc; border-radius: 5px;
      width: 24px; height: 24px; cursor: pointer; font-size: .8rem;
      display: flex; align-items: center; justify-content: center;
      color: #595959; flex-shrink: 0; transition: background .12s;
    }
    #${ID} .lxd-img-reload-btn:hover { background: #f0ede6; }

    #${ID} .lxd-img-content { flex: 1; overflow-y: auto; padding: 8px 10px; min-height: 0; }
    #${ID} .lxd-img-section-label {
      font-size: .63rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .5px; color: #767676; padding: 2px 0 6px;
    }
    #${ID} .lxd-img-folder-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px; }
    #${ID} .lxd-img-folder-btn {
      background: #fafaf9; border: 1px solid #e4e2dc; border-radius: 7px;
      padding: 7px 10px; font-size: .78rem; font-weight: 600; color: #1c1c1e;
      cursor: pointer; text-align: left; display: flex; align-items: center; gap: 8px;
      transition: background .12s, border-color .12s; font-family: inherit; width: 100%;
    }
    #${ID} .lxd-img-folder-btn:hover { background: #f0ede6; border-color: #bbb; }
    #${ID} .lxd-img-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 7px; }
    #${ID} .lxd-img-thumb {
      border: 2px solid #e4e2dc; border-radius: 8px; overflow: hidden;
      cursor: pointer; background: #f3f2ef;
      transition: border-color .15s, box-shadow .15s;
    }
    #${ID} .lxd-img-thumb:hover { border-color: #00274C; box-shadow: 0 2px 8px rgba(0,0,0,.12); }
    #${ID} .lxd-img-thumb img {
      width: 100%; height: 80px; object-fit: contain; display: block;
      background: repeating-conic-gradient(#e4e2dc 0% 25%, #f3f2ef 0% 50%) 0 0 / 12px 12px;
    }
    #${ID} .lxd-img-thumb-name {
      font-size: .6rem; color: #595959; padding: 3px 5px 4px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3;
    }

    /* alt text screen */
    #${ID} .lxd-img-alt-back {
      background: white; border: none; border-bottom: 1px solid #e4e2dc;
      padding: 9px 12px; font-size: .75rem; font-weight: 600; color: #595959;
      cursor: pointer; text-align: left; font-family: inherit; flex-shrink: 0;
      transition: color .15s; width: 100%;
    }
    #${ID} .lxd-img-alt-back:hover { color: #1c1c1e; }
    #${ID} .lxd-img-alt-body {
      padding: 12px; display: flex; flex-direction: column; gap: 10px; flex: 1; overflow-y: auto;
    }
    #${ID} .lxd-img-alt-preview-wrap {
      border-radius: 8px; overflow: hidden; border: 1px solid #e4e2dc;
      height: 120px; flex-shrink: 0;
    }
    #${ID} .lxd-img-alt-preview-wrap img {
      width: 100%; height: 100%; object-fit: contain; background: #f3f2ef; display: block;
    }
    #${ID} .lxd-img-alt-filename { font-size: .78rem; font-weight: 600; color: #1c1c1e; line-height: 1.3; }
    #${ID} .lxd-img-alt-mode-badge {
      display: inline-block; font-size: .62rem; font-weight: 700;
      text-transform: uppercase; padding: 2px 7px; border-radius: 4px; letter-spacing: .5px;
    }
    #${ID} .lxd-img-alt-mode-badge.swap   { background: #dbeafe; color: #1e40af; }
    #${ID} .lxd-img-alt-mode-badge.insert { background: #dcfce7; color: #166534; }
    #${ID} .lxd-img-alt-mode-hint { font-size: .68rem; color: #767676; }
    #${ID} .lxd-img-alt-label {
      font-size: .68rem; font-weight: 700; text-transform: uppercase;
      letter-spacing: .5px; color: #767676; margin-bottom: 5px;
    }
    #${ID} .lxd-img-alt-sublabel { font-size: .68rem; color: #767676; margin-bottom: 5px; }
    #${ID} .lxd-img-alt-input {
      padding: 7px 10px; border: 1px solid #e4e2dc; border-radius: 7px;
      font-size: .83rem; font-family: inherit; color: #1c1c1e; background: #fafaf9;
      outline: none; resize: vertical; width: 100%; height: 60px;
      transition: border-color .15s; line-height: 1.4;
    }
    #${ID} .lxd-img-alt-input:focus { border-color: #00274C; background: white; }
    #${ID} .lxd-img-alt-input:disabled { opacity: .45; cursor: not-allowed; }
    #${ID} .lxd-img-decorative-row {
      display: flex; align-items: center; gap: 8px; font-size: .78rem; color: #1c1c1e;
    }
    #${ID} .lxd-img-decorative-row label { cursor: pointer; }
    #${ID} .lxd-img-alt-submit {
      padding: 9px 14px; border: none; border-radius: 8px;
      font-size: .83rem; font-weight: 700; cursor: pointer; font-family: inherit;
      background: #FFCB05; color: #1c1c1e; width: 100%;
      transition: background .15s; margin-top: 4px;
    }
    #${ID} .lxd-img-alt-submit:hover { background: #f0c000; }
  `;

  // ── Inject style ───────────────────────────────────────────────────────────
  const styleEl = document.createElement('style');
  styleEl.id = ID + '-style';
  styleEl.textContent = CSS;
  document.head.appendChild(styleEl);

  // ── Build HTML ─────────────────────────────────────────────────────────────
  // Strip the outer <div class="new-canvas"> wrapper — insertHTML manages it
  function stripWrapper(html) {
    return html
      .replace(/^<div class="new-canvas">\n?/, '')
      .replace(/\n?<\/div>$/, '');
  }

  // ── Table builder (shared by all three table variants) ────────────────────
  function buildTable(cls, s) {
    const cols = Math.max(1, Math.min(8,  +s.cols || 3));
    const rows = Math.max(1, Math.min(15, +s.rows || 3));
    const cls_ = cls ? ` class="${cls}"` : '';
    const th    = Array(cols).fill('<th>Header</th>').join('');
    const td    = Array(cols).fill('<td>Cell</td>').join('');
    const thead = s.header ? `<thead>\n        <tr>${th}</tr>\n      </thead>\n      ` : '';
    const tbody = Array(rows).fill(`<tr>${td}</tr>`).join('\n        ');
    return `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table${cls_}>\n      ${thead}<tbody>\n        ${tbody}\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`;
  }

  // ── Settings panel HTML builder ────────────────────────────────────────────
  function renderSettingsPanel(comp, idx) {
    const fields = comp.settings.map(f => {
      if (f.type === 'number') {
        return `<div class="lxd-sf-field">
          <div class="lxd-sf-label">${f.label}</div>
          <input class="lxd-sf-input" type="number" data-field="${f.id}"
            value="${f.default}" min="${f.min || 1}" max="${f.max || 99}">
        </div>`;
      }
      if (f.type === 'checkbox') {
        return `<div class="lxd-sf-field lxd-sf-check-row">
          <input type="checkbox" id="lxd-sf-${idx}-${f.id}" data-field="${f.id}"${f.default ? ' checked' : ''}>
          <label class="lxd-sf-check-label" for="lxd-sf-${idx}-${f.id}">${f.label}</label>
        </div>`;
      }
      if (f.type === 'text') {
        return `<div class="lxd-sf-field lxd-sf-text-field">
          <div class="lxd-sf-label">${f.label}</div>
          <input class="lxd-sf-input lxd-sf-text" type="text" data-field="${f.id}"
            value="${f.default}" placeholder="${f.placeholder || ''}">
        </div>`;
      }
      return '';
    }).join('');
    return `<div class="lxd-comp-tile-settings" style="display:none">
      <div class="lxd-sf-fields">${fields}</div>
      <button class="lxd-sf-submit" data-idx="${idx}">Insert with settings →</button>
    </div>`;
  }

  // ── Category accent colours ────────────────────────────────────────────────
  const CAT_COLORS = {
    Text:     '#00274C',
    Callouts: '#3B82F6',
    Video:    '#EF4444',
    Layout:   '#8B5CF6',
    Media:    '#10B981',
    Tables:   '#F59E0B',
  };

  function catTilesHTML() {
    const cats = [...new Set(COMPONENTS.map(c => c.cat))];
    return cats.map(cat => {
      const count = COMPONENTS.filter(c => c.cat === cat).length;
      const color = CAT_COLORS[cat] || '#888';
      return `<div class="lxd-cat-tile" data-cat="${cat}" style="--accent:${color}">
        <div class="lxd-cat-tile-accent"></div>
        <div class="lxd-cat-tile-body">
          <div class="lxd-cat-tile-name">${cat}</div>
          <div class="lxd-cat-tile-count">${count} component${count !== 1 ? 's' : ''}</div>
        </div>
      </div>`;
    }).join('');
  }

  function compTilesHTML(list) {
    return list.map(c => {
      const idx      = COMPONENTS.indexOf(c);
      const inner    = encodeURIComponent(stripWrapper(c.html));
      const compType = c.type || 'standalone';
      const settingsBtn   = c.settings ? `<button class="lxd-settings-btn" data-idx="${idx}" title="Configure">⚙</button>` : '';
      const settingsPanel = c.settings ? renderSettingsPanel(c, idx) : '';

      const variantPicker = c.variants ? (() => {
        const chips = c.variants.map((v, vi) => {
          const vHtml = v.cls
            ? c.html.replace('class="graphical-highlight"', `class="graphical-highlight ${v.cls}"`)
            : c.html;
          const enc = encodeURIComponent(stripWrapper(vHtml));
          return `<button class="lxd-variant-chip${vi === 0 ? ' active' : ''}" data-vh="${enc}" data-vtype="${compType}" style="background:${v.bg}" title="${v.label}"></button>`;
        }).join('');
        return `<div class="lxd-variant-picker"><span class="lxd-variant-label">Color</span>${chips}</div>`;
      })() : '';

      return `<div class="lxd-comp-tile" data-name="${c.name.toLowerCase()}">
        <div class="lxd-comp-tile-preview">${c.preview || ''}</div>
        <div class="lxd-comp-tile-name">${c.name}</div>
        <div class="lxd-comp-tile-actions">
          <button class="lxd-btn-insert" data-html="${inner}" data-type="${compType}">Insert</button>
          <button class="lxd-btn-copy"   data-html="${inner}">Copy</button>
          ${settingsBtn}
        </div>
        ${variantPicker}
        ${settingsPanel}
      </div>`;
    }).join('');
  }

  // ── Pages panel — fetch templates from pages.json ─────────────────────────
  // In local dev (localhost) fall back to same-origin so preview.html works.
  const _isLocal = /^localhost|^127\./.test(window.location.hostname);
  const PAGES_JSON_URL   = _isLocal
    ? window.location.origin + '/pages.json'
    : 'https://i-taylor.github.io/LXD-toolbox/pages.json';
  const PAGES_EDITOR_URL = _isLocal
    ? window.location.origin + '/pages-editor.html'
    : 'https://i-taylor.github.io/LXD-toolbox/pages-editor.html';

  // ── Course Images tab ──────────────────────────────────────────────────────

  // Minimal HTML-escape helpers (no external deps)
  function imgEsc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function imgEscAttr(str) {
    return String(str).replace(/"/g,'&quot;');
  }

  function getCourseId() {
    const m = window.location.pathname.match(/\/courses\/(\d+)/);
    return m ? m[1] : null;
  }

  const imgState = {
    courseId: null,
    breadcrumb: [],     // [{name, id}]
    selectedImg: null   // {url, name, thumbnailUrl}
  };

  function imgBrowseView()   { return document.getElementById(ID + '-img-browse'); }
  function imgAltView()      { return document.getElementById(ID + '-img-alt'); }
  function imgContentEl()    { return document.getElementById(ID + '-img-content'); }
  function imgBreadcrumbEl() { return document.getElementById(ID + '-img-breadcrumb'); }

  function renderImgBreadcrumb() {
    const bc = imgState.breadcrumb;
    if (!bc.length) {
      imgBreadcrumbEl().innerHTML = '<span style="color:#767676;font-size:.72rem">Course Files</span>';
      return;
    }
    const parts = bc.map((b, i) => {
      if (i === bc.length - 1) {
        return `<span class="lxd-img-crumb-current" title="${imgEscAttr(b.name)}">${imgEsc(b.name)}</span>`;
      }
      return `<button class="lxd-img-crumb-btn" data-crumb-idx="${i}" title="${imgEscAttr(b.name)}">${imgEsc(b.name)}</button><span class="lxd-img-crumb-sep">›</span>`;
    });
    imgBreadcrumbEl().innerHTML = parts.join('');
  }

  function loadImgFolder(folderId, push) {
    if (push) imgState.breadcrumb.push(push);
    renderImgBreadcrumb();

    const content = imgContentEl();
    content.innerHTML = '<div class="lxd-arrange-empty" style="padding:20px 0">Loading…</div>';

    Promise.all([
      fetch(`/api/v1/folders/${folderId}/folders?per_page=100&sort=name`).then(r => { if (!r.ok) throw r; return r.json(); }),
      fetch(`/api/v1/folders/${folderId}/files?per_page=100&sort=name`).then(r => { if (!r.ok) throw r; return r.json(); })
    ]).then(([folders, files]) => {
      // Canvas API uses the hyphenated key "content-type"; also check mime_class for reliability
      const images = Array.isArray(files)
        ? files.filter(f =>
            f.mime_class === 'image' ||
            (f['content-type'] || f.content_type || '').startsWith('image/')
          )
        : [];

      let html = '';

      if (Array.isArray(folders) && folders.length) {
        html += `<div class="lxd-img-section-label">Folders</div>
          <div class="lxd-img-folder-list">
            ${folders.map(f =>
              `<button class="lxd-img-folder-btn" data-folder-id="${f.id}" data-folder-name="${imgEscAttr(f.name)}">
                📁 ${imgEsc(f.name)}
              </button>`
            ).join('')}
          </div>`;
      }

      if (images.length) {
        html += `<div class="lxd-img-section-label">Images (${images.length})</div>
          <div class="lxd-img-grid">
            ${images.map(img => {
              const name = img.display_name || img.filename || 'Image';
              // thumbnail_url may redirect to no_pic.gif even when the URL looks legitimate,
              // because Canvas hasn't processed the thumbnail yet. img.url always serves
              // the real file (browsers render <img src> regardless of Content-Disposition).
              const thumb = img.url;
              const onerr = `this.onerror=null;this.src='${imgEscAttr(img.url)}'`;
              return `<div class="lxd-img-thumb"
                data-img-url="${imgEscAttr(img.url)}"
                data-img-name="${imgEscAttr(name)}"
                data-img-thumb="${imgEscAttr(thumb)}"
                data-img-id="${img.id || ''}">
                  <img src="${imgEscAttr(thumb)}" alt="" loading="lazy" onerror="${onerr}">
                  <div class="lxd-img-thumb-name" title="${imgEscAttr(name)}">${imgEsc(name)}</div>
              </div>`;
            }).join('')}
          </div>`;
      }

      if (!html) {
        html = '<div class="lxd-arrange-empty" style="padding:20px 0">No images or subfolders in this folder.</div>';
      }
      content.innerHTML = html;
    }).catch(() => {
      content.innerHTML = '<div class="lxd-arrange-empty" style="padding:20px 0">Couldn\'t load files. Make sure you\'re on a Canvas course page.</div>';
    });
  }

  function showImgAltScreen(imgUrl, imgName, imgThumb, fileId) {
    imgState.selectedImg = { url: imgUrl, name: imgName, thumbnailUrl: imgThumb, fileId: fileId || '' };

    // Determine mode: swap if cursor is on an <img> in the editor
    const ed = getEditor();
    const selNode = ed ? ed.selection.getNode() : null;
    const isSwap  = !!(selNode && selNode.nodeName === 'IMG');
    const currentAlt = isSwap ? (selNode.getAttribute('alt') || '') : '';

    document.getElementById(ID + '-img-alt-preview').src = imgThumb || imgUrl;
    document.getElementById(ID + '-img-alt-preview').alt = imgName;
    document.getElementById(ID + '-img-alt-filename').textContent = imgName;

    const badge = document.getElementById(ID + '-img-alt-badge');
    badge.className = `lxd-img-alt-mode-badge ${isSwap ? 'swap' : 'insert'}`;
    badge.textContent = isSwap ? 'Swap Image' : 'Insert Image';

    document.getElementById(ID + '-img-alt-mode-hint').textContent = isSwap
      ? 'Will replace the currently selected image in the editor.'
      : 'Will insert a new image at your cursor position.';

    const altInput = document.getElementById(ID + '-img-alt-input');
    altInput.value = currentAlt;
    altInput.disabled = false;

    const decor = document.getElementById(ID + '-img-alt-decorative');
    decor.checked = false;

    const submit = document.getElementById(ID + '-img-alt-submit');
    submit.textContent = isSwap ? 'Swap Image' : 'Insert Image';
    submit.dataset.isSwap = isSwap ? '1' : '0';

    imgBrowseView().classList.add('hidden');
    imgAltView().classList.remove('hidden');
  }

  function doInsertImage() {
    const { url } = imgState.selectedImg;
    const decor    = document.getElementById(ID + '-img-alt-decorative').checked;
    const altText  = decor ? '' : document.getElementById(ID + '-img-alt-input').value.trim();
    const isSwap   = document.getElementById(ID + '-img-alt-submit').dataset.isSwap === '1';

    const ed = getEditor();
    if (!ed) { showToast('Open a page editor first'); return; }

    ed.undoManager.transact(() => {
      if (isSwap) {
        const node = ed.selection.getNode();
        if (node && node.nodeName === 'IMG') {
          // Snapshot size and carry-over attributes before replacing the node
          const snapW     = node.getAttribute('width')  || (node.offsetWidth  ? String(node.offsetWidth)  : null);
          const snapH     = node.getAttribute('height') || (node.offsetHeight ? String(node.offsetHeight) : null);
          const snapStyle = node.getAttribute('style')  || null;
          const snapRole  = node.getAttribute('role')   || null;

          // Build new attribute map — replacing the node entirely avoids
          // TinyMCE resetting data-mce-src on a live node after mutation
          const { fileId } = imgState.selectedImg;
          const existingEndpoint = node.getAttribute('data-api-endpoint') || '';
          const courseId = existingEndpoint.match(/\/courses\/(\d+)\//)?.[1]
                        || window.location.pathname.match(/\/courses\/(\d+)\//)?.[1];

          const attrs = { alt: altText };
          if (snapW)     attrs.width  = snapW;
          if (snapH)     attrs.height = snapH;
          if (snapStyle) attrs.style  = snapStyle;
          if (snapRole)  attrs.role   = snapRole;

          if (fileId && courseId) {
            const origin     = window.location.origin;
            const previewUrl = `${origin}/courses/${courseId}/files/${fileId}/preview`;
            attrs.src                  = previewUrl;
            attrs['data-mce-src']      = previewUrl;
            attrs.id                   = fileId;
            attrs['data-api-endpoint'] = `${origin}/api/v1/courses/${courseId}/files/${fileId}`;
            attrs['data-api-returntype'] = 'File';
          } else {
            attrs.src             = url;
            attrs['data-mce-src'] = url;
          }

          const newNode = ed.dom.create('img', attrs);
          ed.dom.replace(newNode, node);
          ed.selection.select(newNode);
          ed.nodeChanged();
        } else {
          // Selection moved — fall back to insert
          ed.insertContent(`<img src="${url}" alt="${altText}">`);
        }
      } else {
        ed.insertContent(`<img src="${url}" alt="${altText}">`);
      }
    });

    showToast(isSwap ? 'Image swapped ✓' : 'Image inserted ✓');
    // Return to browse, stay on Images tab
    imgAltView().classList.add('hidden');
    imgBrowseView().classList.remove('hidden');
  }

  function renderImagesTab() {
    const courseId = getCourseId();
    imgState.courseId = courseId;

    // Reset to browse view
    imgAltView().classList.add('hidden');
    imgBrowseView().classList.remove('hidden');

    if (!courseId) {
      imgState.breadcrumb = [];
      renderImgBreadcrumb();
      imgContentEl().innerHTML = '<div class="lxd-arrange-empty" style="padding:20px 0">Open a Canvas course page to browse course images.</div>';
      return;
    }

    imgState.breadcrumb = [];
    renderImgBreadcrumb();
    imgContentEl().innerHTML = '<div class="lxd-arrange-empty" style="padding:20px 0">Loading course files…</div>';

    // Fetch the course root folder via the by_path endpoint
    fetch(`/api/v1/courses/${courseId}/folders/by_path/`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(data => {
        // by_path returns an array of folders along the path; last item is the target
        const rootFolder = Array.isArray(data) ? data[data.length - 1] : data;
        if (!rootFolder?.id) throw new Error('No root folder');
        imgState.breadcrumb = [{ name: 'Course Files', id: rootFolder.id }];
        loadImgFolder(rootFolder.id, null);
      })
      .catch(() => {
        imgState.breadcrumb = [];
        renderImgBreadcrumb();
        imgContentEl().innerHTML = '<div class="lxd-arrange-empty" style="padding:20px 0">Couldn\'t load course files. Are you on a Canvas course page?</div>';
      });
  }

  function renderPagesPanel() {
    const list = document.getElementById(ID + '-pages-list');
    if (!list) return;
    list.innerHTML = '<div class="lxd-arrange-empty">Loading templates…</div>';

    fetch(PAGES_JSON_URL + '?_=' + Date.now())
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(pages => {
        list._lxd_pages = pages;
        if (!pages.length) {
          list.innerHTML = `
            <div class="lxd-arrange-empty">
              No page templates yet.<br><br>
              <a href="${PAGES_EDITOR_URL}" target="_blank"
                 style="color:#00274C;font-weight:700;text-decoration:none">
                Open Template Editor →
              </a>
            </div>`;
          return;
        }
        const editLink = `<a class="lxd-pages-edit-link" href="${PAGES_EDITOR_URL}" target="_blank">Edit templates →</a>`;
        list.innerHTML = pages.map((p, i) => `<div class="lxd-page-card">
            <div class="lxd-page-card-head">
              <div class="lxd-page-dot" style="background:${p.color || '#00274C'}"></div>
              <span class="lxd-page-name">${p.name}</span>
            </div>
            ${p.desc ? `<div class="lxd-page-desc">${p.desc}</div>` : ''}
            <div class="lxd-page-actions">
              <button class="lxd-btn-insert" data-page-idx="${i}">Insert</button>
              <button class="lxd-btn-copy"   data-page-idx="${i}">Copy HTML</button>
            </div>
          </div>`).join('') + editLink;
      })
      .catch(() => {
        list.innerHTML = `
          <div class="lxd-arrange-empty">
            Could not load templates.<br>
            <small style="color:#bbb">Check your connection or try again.</small>
          </div>`;
      });
  }

  const sidebar = document.createElement('div');
  sidebar.id = ID;
  sidebar.innerHTML = `
    <div class="lxd-resize-handle" id="${ID}-resize"></div>
    <div class="lxd-head${_isDev ? ' lxd-head-dev' : ''}">
      <div class="lxd-head-title">
        🛠 LXD Sidebar
        ${_isDev ? '<span class="lxd-head-badge">Dev</span>' : ''}
      </div>
      <button class="lxd-close" id="${ID}-close">×</button>
    </div>

    <div class="lxd-tabs">
      <button class="lxd-tab active" data-tab="components">Components</button>
      <button class="lxd-tab"        data-tab="arrange">Arrange</button>
      <button class="lxd-tab"        data-tab="pages">Pages</button>
      ${_isDev ? '<button class="lxd-tab" data-tab="images">Images</button>' : ''}
      <button class="lxd-tab"        data-tab="styleguide">Style</button>
    </div>

    <div class="lxd-editor-tools">
      <button class="lxd-blocks-btn" id="${ID}-show-blocks" title="Outline text &amp; video blocks in the editor (editor-only, not published)">👁 Blocks</button>
      <button class="lxd-blocks-btn" id="${ID}-insert-p" title="Insert a paragraph at your cursor">¶ Paragraph</button>
    </div>

    <div class="lxd-search-wrap" id="${ID}-search-wrap">
      <input class="lxd-search" id="${ID}-search" placeholder="Search…" type="search">
    </div>

    <div class="lxd-panel active" id="${ID}-panel-components">
      <div class="lxd-comp-home" id="${ID}-comp-home">
        ${catTilesHTML()}
      </div>
      <div class="lxd-comp-browse" id="${ID}-comp-browse" style="display:none">
        <div class="lxd-browse-head">
          <button class="lxd-back-btn" id="${ID}-back-btn">← Back</button>
          <span class="lxd-browse-title" id="${ID}-browse-title"></span>
        </div>
        <div class="lxd-comp-tiles" id="${ID}-comp-tiles"></div>
      </div>
      <div class="lxd-comp-search" id="${ID}-comp-search" style="display:none">
        <div class="lxd-comp-tiles" id="${ID}-search-tiles"></div>
      </div>
    </div>

    <div class="lxd-panel" id="${ID}-panel-arrange">
      <div class="lxd-arrange-list" id="${ID}-arrange-list"></div>
    </div>

    <div class="lxd-panel" id="${ID}-panel-pages">
      <div id="${ID}-pages-list"></div>
    </div>

    ${_isDev ? `
    <div class="lxd-panel" id="${ID}-panel-images">
      <!-- Browse view: folder nav + image grid -->
      <div class="lxd-img-view" id="${ID}-img-browse">
        <div class="lxd-img-toolbar">
          <div class="lxd-img-breadcrumb" id="${ID}-img-breadcrumb"></div>
          <button class="lxd-img-reload-btn" id="${ID}-img-reload" title="Reload">↺</button>
        </div>
        <div class="lxd-img-content" id="${ID}-img-content">
          <div class="lxd-arrange-empty" style="padding:20px 0">Switch to the Images tab to load course files.</div>
        </div>
      </div>
      <!-- Alt text screen: shown after clicking an image -->
      <div class="lxd-img-view hidden" id="${ID}-img-alt">
        <button class="lxd-img-alt-back" id="${ID}-img-alt-back">← Back to Images</button>
        <div class="lxd-img-alt-body">
          <div class="lxd-img-alt-preview-wrap">
            <img id="${ID}-img-alt-preview" src="" alt="">
          </div>
          <div class="lxd-img-alt-filename" id="${ID}-img-alt-filename"></div>
          <div>
            <span class="lxd-img-alt-mode-badge" id="${ID}-img-alt-badge">Insert</span>
            <div class="lxd-img-alt-mode-hint" id="${ID}-img-alt-mode-hint" style="margin-top:5px"></div>
          </div>
          <div>
            <div class="lxd-img-alt-label">Alt Text</div>
            <div class="lxd-img-alt-sublabel">Describe the image for screen reader users.</div>
            <textarea class="lxd-img-alt-input" id="${ID}-img-alt-input" placeholder="Describe the image content…"></textarea>
          </div>
          <div class="lxd-img-decorative-row">
            <input type="checkbox" id="${ID}-img-alt-decorative">
            <label for="${ID}-img-alt-decorative">Decorative — leave alt empty</label>
          </div>
          <button class="lxd-img-alt-submit" id="${ID}-img-alt-submit">Insert Image</button>
        </div>
      </div>
    </div>` : ''}

    <div class="lxd-panel" id="${ID}-panel-styleguide">
      ${STYLE_GUIDE_HTML}
    </div>

    <div class="lxd-preview-modal" id="${ID}-preview-modal" style="display:none">
      <div class="lxd-pm-header">
        <div class="lxd-pm-name" id="${ID}-pm-name"></div>
        <button class="lxd-pm-close" id="${ID}-pm-close">✕</button>
      </div>
      <div class="lxd-pm-preview-wrap">
        <iframe class="lxd-pm-frame" id="${ID}-pm-frame"></iframe>
      </div>
      <div class="lxd-pm-desc" id="${ID}-pm-desc"></div>
      <div class="lxd-pm-actions">
        <button class="lxd-pm-insert" id="${ID}-pm-insert">Insert</button>
        <button class="lxd-pm-copy"   id="${ID}-pm-copy">Copy</button>
      </div>
    </div>

  `;

  const toast = document.createElement('div');
  toast.id = ID + '-toast';
  document.body.appendChild(toast);
  document.body.appendChild(sidebar);
  document.body.style.marginRight = PUSH_W;

  // ── State ──────────────────────────────────────────────────────────────────
  let compView      = 'home';  // 'home' | 'browse' | 'search'
  let blocksVisible = false;

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // Find the active TinyMCE editor (checks page scope and iframes)
  function getEditor() {
    if (window.tinymce) {
      const ed = tinymce.activeEditor || (tinymce.editors && tinymce.editors[0]);
      if (ed) return ed;
    }
    for (const f of document.querySelectorAll('iframe')) {
      try {
        const tw = f.contentWindow;
        if (tw && tw.tinymce) {
          const ed = tw.tinymce.activeEditor || (tw.tinymce.editors && tw.tinymce.editors[0]);
          if (ed) return ed;
        }
      } catch (e) { /* cross-origin */ }
    }
    return null;
  }

  // True if section is a plain, non-special text-block (can accumulate content into it)
  function isPlainTextBlock(el) {
    return el && el.tagName === 'SECTION' &&
      el.classList.contains('text-block') &&
      !el.classList.contains('video-block') &&
      !el.classList.contains('assignment') &&
      !el.classList.contains('gamut-intro') &&
      !el.classList.contains('display-header') &&
      !el.classList.contains('graphical-highlight');
  }

  // Walk up from cursorNode to find the nearest sub-element the cursor is nested inside
  // that we should "break out of" before inserting a bare paragraph.
  // Returns the sub-element, or null if the cursor is in open text-block space.
  const BREAK_OUT = ['.callout-box', 'blockquote', '.two-col', '.img-caption', '.table-container'];
  function getCursorSubWrapper(cursorNode, section) {
    let el = cursorNode;
    while (el && el !== section) {
      if (el.matches) {
        for (const sel of BREAK_OUT) {
          if (el.matches(sel)) return el;
        }
      }
      el = el.parentElement;
    }
    return null;
  }

  // Walk up from cursorNode to find the direct SECTION child of wrapper that contains it
  function getAnchorSection(wrapper, cursorNode) {
    try {
      let el = cursorNode;
      while (el && el.parentElement !== wrapper) el = el.parentElement;
      return (el && el !== wrapper) ? el : null;
    } catch (e) { return null; }
  }

  // Low-level DOM helpers — bypass selection/focus entirely for section-level inserts.
  // insertAdjacentHTML puts content exactly where asked without TinyMCE's cursor fighting us.
  // undoManager.transact() keeps the change on the undo stack.

  function appendToWrapper(ed, wrapper, html) {
    ed.undoManager.transact(() => { wrapper.insertAdjacentHTML('beforeend', html); });
  }

  function insertAfterSection(ed, section, html) {
    ed.undoManager.transact(() => { section.insertAdjacentHTML('afterend', html); });
  }

  function insertBeforeSection(ed, section, html) {
    ed.undoManager.transact(() => { section.insertAdjacentHTML('beforebegin', html); });
  }

  // ── Section label helper ────────────────────────────────────────────────────
  function sectionLabel(section) {
    const cls = section.classList;
    if (cls.contains('video-block'))         return ['video', 'Video Block'];
    if (cls.contains('display-header'))      return ['other', 'Display Header'];
    if (cls.contains('accordion'))           return ['other', 'Accordion'];
    if (cls.contains('graphical-highlight')) return ['other', 'Graphical Highlight'];
    if (cls.contains('assignment'))          return ['other', 'Assignment Block'];
    if (cls.contains('gamut-intro'))         return ['other', 'Gamut Intro'];
    const h = section.querySelector('h2,h3,h4');
    const heading = h ? h.textContent.trim().slice(0, 30) : '';
    return ['text', heading || 'Text Block'];
  }

  // ── Placeholder ─────────────────────────────────────────────────────────────
  // Keeps a non-publishable landing-zone section at the bottom of .new-canvas.
  // Stripped from GetContent so it never reaches Canvas storage.
  const PH_ATTR = 'data-lxd-ph';
  const PH_CSS_ID = 'lxd-ph-style';

  function ensurePlaceholder(ed) {
    const wrapper = ed.getBody().querySelector('.new-canvas');
    if (!wrapper) return;
    // Remove any stale placeholder first
    wrapper.querySelectorAll(`[${PH_ATTR}]`).forEach(el => el.remove());
    const ph = ed.getDoc().createElement('section');
    ph.className = 'text-block';
    ph.setAttribute(PH_ATTR, '1');
    ph.innerHTML = '<p><br></p>';
    wrapper.appendChild(ph);

    // Inject placeholder styling once per editor session
    if (!ed.getDoc().getElementById(PH_CSS_ID)) {
      const style = ed.getDoc().createElement('style');
      style.id = PH_CSS_ID;
      style.textContent = `
        [${PH_ATTR}] {
          outline: 2px dashed #ccc !important;
          background: #fafafa !important;
          min-height: 60px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: text !important;
          position: relative !important;
        }
        [${PH_ATTR}]::after {
          content: '↓  Click here, then insert a component';
          position: absolute;
          color: #767676;
          font-size: 12px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          pointer-events: none;
          letter-spacing: .2px;
        }
        [${PH_ATTR}] p { opacity: 0; margin: 0; }
      `;
      ed.getDoc().head.appendChild(style);

      // Strip placeholder from content before Canvas saves it
      ed.on('GetContent', function (e) {
        if (e.content && e.content.includes(PH_ATTR)) {
          const tmp = document.createElement('div');
          tmp.innerHTML = e.content;
          tmp.querySelectorAll(`[${PH_ATTR}]`).forEach(el => el.remove());
          e.content = tmp.innerHTML;
        }
      });
    }
  }

  // ── Arrange panel ───────────────────────────────────────────────────────────
  // Reads all real sections (excluding placeholder) and renders a drag-to-reorder
  // list inside the sidebar. Drag events move actual DOM nodes in the editor.
  function buildArrangePanel() {
    const listEl = document.getElementById(ID + '-arrange-list');
    if (!listEl) return;

    const ed = getEditor();
    if (!ed) {
      listEl.innerHTML = '<div class="lxd-arrange-empty">Open a page editor first.</div>';
      return;
    }

    const wrapper  = ed.getBody().querySelector('.new-canvas');
    const sections = wrapper
      ? Array.from(wrapper.children).filter(el => el.tagName === 'SECTION' && !el.getAttribute(PH_ATTR))
      : [];

    if (!sections.length) {
      listEl.innerHTML = '<div class="lxd-arrange-empty">No sections on this page yet.</div>';
      return;
    }

    listEl.innerHTML = '';
    let dragSrc = null; // { el, moveEls, parentSection, isSection }

    // ── Sub-element classifier ──────────────────────────────────────────────
    const SUB_SELECTOR = ':scope > .callout-box, :scope > blockquote, :scope > .two-col, :scope > .img-caption, :scope > .table-container';

    function subInfo(el) {
      const cls = el.classList;
      if (el.tagName === 'BLOCKQUOTE') return { badge: 'QUOTE',   badgeCls: 'quote',          label: 'Pull Quote' };
      if (cls.contains('callout-box')) {
        if (cls.contains('action'))    return { badge: 'CALLOUT', badgeCls: 'callout-action',  label: 'Action Callout' };
        if (cls.contains('highlight')) return { badge: 'CALLOUT', badgeCls: 'callout-hl',      label: 'Highlight Callout' };
        return                                { badge: 'CALLOUT', badgeCls: 'callout-info',    label: 'Info Callout' };
      }
      if (cls.contains('two-col')) {
        const l = cls.contains('text-img') ? 'Two Col – Text / Image' : 'Two Col – Text / Text';
        return { badge: 'LAYOUT', badgeCls: 'other', label: l };
      }
      if (cls.contains('img-caption'))    return { badge: 'IMAGE', badgeCls: 'image', label: 'Image' };
      if (cls.contains('table-container'))return { badge: 'TABLE', badgeCls: 'table', label: 'Table' };
      return { badge: 'BLOCK', badgeCls: 'other', label: 'Block' };
    }

    // ── Build flat item list ────────────────────────────────────────────────
    // Each item: { el, moveEls[], parentSection, isSection, isSub, badge, badgeCls, label }
    const items = [];

    sections.forEach(section => {
      if (isPlainTextBlock(section)) {
        const namedEls = Array.from(section.querySelectorAll(SUB_SELECTOR));

        if (!namedEls.length) {
          // Plain text section with no sub-elements — single row
          const [, label] = sectionLabel(section);
          items.push({ el: section, moveEls: [section], parentSection: wrapper,
            isSection: true, isSub: false, badge: 'TEXT', badgeCls: 'text', label });
        } else {
          // Walk direct children in DOM order, grouping adjacent text nodes
          const children = Array.from(section.children);
          let textGroup = [];

          const flushTextGroup = () => {
            if (!textGroup.length) return;
            const h = textGroup.find(e => e.matches('h2,h3,h4'));
            const label = h ? h.textContent.trim().slice(0, 30) : 'Text Content';
            items.push({ el: textGroup[0], moveEls: [...textGroup], parentSection: section,
              isSection: false, isSub: true, badge: 'TEXT', badgeCls: 'text', label });
            textGroup = [];
          };

          children.forEach(child => {
            if (child.matches('.callout-box, blockquote, .two-col, .img-caption, .table-container')) {
              flushTextGroup();
              const info = subInfo(child);
              items.push({ el: child, moveEls: [child], parentSection: section,
                isSection: false, isSub: true, ...info });
            } else {
              textGroup.push(child);
            }
          });
          flushTextGroup();
        }
      } else {
        // Standalone section (video, accordion, etc.)
        const [type, label] = sectionLabel(section);
        const badgeCls = type === 'video' ? 'video' : 'other';
        const badge    = type === 'video' ? 'VIDEO' : 'BLOCK';
        items.push({ el: section, moveEls: [section], parentSection: wrapper,
          isSection: true, isSub: false, badge, badgeCls, label });
      }
    });

    // ── Render rows ─────────────────────────────────────────────────────────
    items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'lxd-arrange-row' + (item.isSub ? ' lxd-arrange-row--sub' : '');
      row.draggable = true;
      row.innerHTML = `
        <span class="lxd-arrange-handle">⠿</span>
        <span class="lxd-arrange-badge lxd-arrange-badge-${item.badgeCls}">${item.badge}</span>
        <span class="lxd-arrange-label" title="${item.label.replace(/"/g, '&quot;')}">${item.label}</span>
        ${item.isSection ? `<button class="lxd-arrange-del" title="Delete section">🗑</button>` : ''}
      `;

      row.addEventListener('dragstart', e => {
        dragSrc = item;
        row.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      row.addEventListener('dragend', () => {
        dragSrc = null;
        row.classList.remove('dragging');
        listEl.querySelectorAll('.lxd-arrange-row').forEach(r => r.classList.remove('drag-over'));
      });
      row.addEventListener('dragover', e => {
        e.preventDefault();
        if (!dragSrc || dragSrc.el === item.el) return;
        listEl.querySelectorAll('.lxd-arrange-row').forEach(r => r.classList.remove('drag-over'));
        row.classList.add('drag-over');
      });
      row.addEventListener('dragleave', () => row.classList.remove('drag-over'));
      row.addEventListener('drop', e => {
        e.preventDefault();
        row.classList.remove('drag-over');
        if (!dragSrc || dragSrc.el === item.el) return;

        const src = dragSrc;
        const tgt = item;

        ed.undoManager.transact(() => {
          if (src.isSection && tgt.isSection) {
            // Section → Section
            tgt.el.insertAdjacentElement('beforebegin', src.el);

          } else if (!src.isSection && !tgt.isSection) {
            // Sub-element → Sub-element (may cross sections)
            src.moveEls.forEach(el => tgt.el.insertAdjacentElement('beforebegin', el));
            // Remove source parent section if it became empty
            if (src.parentSection !== wrapper && !src.parentSection.children.length) {
              src.parentSection.remove();
            }

          } else if (src.isSection && !tgt.isSection) {
            // Section dragged onto a sub-element → insert section before sub's parent section
            tgt.parentSection.insertAdjacentElement('beforebegin', src.el);

          } else {
            // Sub-element dragged onto a standalone section → move into that section's start
            const firstChild = tgt.el.firstElementChild;
            if (firstChild) {
              src.moveEls.forEach(el => firstChild.insertAdjacentElement('beforebegin', el));
            } else {
              src.moveEls.forEach(el => tgt.el.appendChild(el));
            }
            if (src.parentSection !== wrapper && !src.parentSection.children.length) {
              src.parentSection.remove();
            }
          }
          ensurePlaceholder(ed);
        });

        buildArrangePanel();
      });

      if (item.isSection) {
        row.querySelector('.lxd-arrange-del').addEventListener('click', () => {
          if (!confirm(`Delete "${item.label}"? This cannot be undone.`)) return;
          ed.undoManager.transact(() => item.el.remove());
          buildArrangePanel();
        });
      }

      listEl.appendChild(row);
    });
  }

  // ── Smart insertion ─────────────────────────────────────────────────────────
  // Priority: cursor position → end-of-page (before placeholder) fallback
  //
  // Cursor-aware and end-append both merge inner content for text type as
  // a convenience — the placeholder is always maintained at the bottom.
  //
  // type 'text'       → merge inner content into nearest plain section.text-block
  // type 'video'      → always its own section (preserves .highlight/.blue classes)
  // type 'standalone' → always its own section
  function doInsert(ed, html, type) {
    const body = ed.getBody();
    let wrapper = body.querySelector('.new-canvas');

    if (!wrapper) {
      ed.focus();
      ed.selection.select(body, true);
      ed.selection.collapse(false);
      ed.insertContent('<div class="new-canvas"></div>');
      wrapper = body.querySelector('.new-canvas');
    }
    if (!wrapper) {
      ed.insertContent('<div class="new-canvas">' + html + '</div>');
      showToast('Inserted ✓');
      return;
    }

    // Strip section wrapper for text type → get bare inner content for merging
    let innerContent = html;
    if (type === 'text') {
      innerContent = html
        .replace(/^<section[^>]*>\n?/, '')
        .replace(/\n?<\/section>$/, '')
        .trim();
    }
    const wrapBlock = c => `<section class="text-block">\n${c}\n</section>`;

    const ph = wrapper.querySelector(`[${PH_ATTR}]`);

    // ── 1. Cursor-aware ──────────────────────────────────────────────────────
    let cursorSection = null;
    try {
      cursorSection = getAnchorSection(wrapper, ed.selection.getNode());
    } catch (e) {}

    // Ignore cursor if it's sitting inside the placeholder
    if (cursorSection && cursorSection.getAttribute(PH_ATTR)) cursorSection = null;

    if (cursorSection) {
      if (type === 'text') {
        if (isPlainTextBlock(cursorSection)) {
          // Merge into the text-block the cursor is in
          ed.focus();
          const range = ed.dom.createRng();
          range.selectNodeContents(cursorSection);
          range.collapse(false);
          ed.selection.setRng(range);
          ed.insertContent(innerContent);
          showToast('Added to text block ✓');
        } else {
          // Cursor is in a non-mergeable section — new text-block after it
          insertAfterSection(ed, cursorSection, wrapBlock(innerContent));
          showToast('Inserted ✓');
        }
      } else {
        // video / standalone — insert after cursor section
        insertAfterSection(ed, cursorSection, html);
        showToast('Inserted ✓');
      }
      ensurePlaceholder(ed);
      return;
    }

    // ── 2. End-of-page fallback (insert before placeholder) ─────────────────
    if (type === 'text') {
      const realSections = Array.from(wrapper.children)
        .filter(el => el.tagName === 'SECTION' && !el.getAttribute(PH_ATTR));
      const last = realSections[realSections.length - 1] || null;
      if (isPlainTextBlock(last)) {
        ed.focus();
        const range = ed.dom.createRng();
        range.selectNodeContents(last);
        range.collapse(false);
        ed.selection.setRng(range);
        ed.insertContent(innerContent);
        showToast('Added to text block ✓');
      } else if (ph) {
        insertBeforeSection(ed, ph, wrapBlock(innerContent));
        showToast('Inserted ✓');
      } else {
        appendToWrapper(ed, wrapper, wrapBlock(innerContent));
        showToast('Inserted ✓');
      }
    } else {
      if (ph) {
        insertBeforeSection(ed, ph, html);
      } else {
        appendToWrapper(ed, wrapper, html);
      }
      showToast('Inserted ✓');
    }
    ensurePlaceholder(ed);
  }

  function insertHTML(html, type) {
    type = type || 'standalone';
    const ed = getEditor();
    if (ed) { doInsert(ed, html, type); return; }
    // Clipboard fallback — wrap it for the user to paste
    const wrapped = '<div class="new-canvas">\n' + html + '\n</div>';
    navigator.clipboard.writeText(wrapped)
      .then(() => showToast('Copied — paste into editor with ⌘V'))
      .catch(() => showToast('Could not insert — click inside the editor first'));
  }

  function copyHTML(html) {
    navigator.clipboard.writeText(html)
      .then(() => showToast('Copied ✓'))
      .catch(() => showToast('Copy failed'));
  }

  // ── Nav helpers ────────────────────────────────────────────────────────────
  function showCompHome() {
    compView = 'home';
    document.getElementById(ID + '-comp-home').style.display = '';
    document.getElementById(ID + '-comp-browse').style.display = 'none';
    document.getElementById(ID + '-comp-search').style.display = 'none';
  }

  function showCompBrowse(cat) {
    compView = 'browse';
    document.getElementById(ID + '-comp-home').style.display = 'none';
    document.getElementById(ID + '-comp-browse').style.display = '';
    document.getElementById(ID + '-comp-search').style.display = 'none';
    document.getElementById(ID + '-browse-title').textContent = cat;
    document.getElementById(ID + '-comp-tiles').innerHTML =
      compTilesHTML(COMPONENTS.filter(c => c.cat === cat));
  }

  function showCompSearch(q) {
    compView = 'search';
    document.getElementById(ID + '-comp-home').style.display = 'none';
    document.getElementById(ID + '-comp-browse').style.display = 'none';
    document.getElementById(ID + '-comp-search').style.display = '';
    document.getElementById(ID + '-search-tiles').innerHTML =
      compTilesHTML(COMPONENTS.filter(c => c.name.toLowerCase().includes(q)));
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  document.getElementById(ID + '-close').addEventListener('click', () => {
    // Clean up any editor-injected styles/overlays before removing sidebar
    const ed = getEditor();
    if (ed) {
      try { ed.getDoc().getElementById('lxd-block-vis')?.remove(); } catch (e) {}
    }
    sidebar.remove(); toast.remove(); styleEl.remove();
    document.body.style.marginRight = '';
  });

  // ── Resize handle ──────────────────────────────────────────────────────────
  document.getElementById(ID + '-resize').addEventListener('mousedown', e => {
    e.preventDefault();
    const handle = e.currentTarget;
    const startX = e.clientX;
    const startW = sidebar.offsetWidth;
    handle.classList.add('dragging');
    document.body.style.userSelect = 'none';

    function onMove(e) {
      const w = Math.max(260, Math.min(680, startW + (startX - e.clientX)));
      sidebar.style.width = w + 'px';
      document.body.style.marginRight = w + 'px';
      toast.style.right = (w + 20) + 'px';
    }
    function onUp() {
      handle.classList.remove('dragging');
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  // ── Show Blocks toggle ─────────────────────────────────────────────────────
  document.getElementById(ID + '-show-blocks').addEventListener('click', function () {
    const ed = getEditor();
    if (!ed) { showToast('Open a page editor first'); return; }
    const edDoc = ed.getDoc();

    if (blocksVisible) {
      // ── Turn off ──────────────────────────────────────────────────────────
      edDoc.getElementById('lxd-block-vis')?.remove();
      blocksVisible = false;
      this.classList.remove('active');
    } else {
      // ── Turn on ───────────────────────────────────────────────────────────
      const style = edDoc.createElement('style');
      style.id = 'lxd-block-vis';
      style.textContent = `
        section.text-block:not(.video-block) {
          outline: 2px dashed #00274C !important;
          position: relative !important;
        }
        section.text-block:not(.video-block)::before {
          content: 'TEXT BLOCK';
          position: absolute;
          top: 0; left: 0;
          background: #00274C;
          color: white;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .6px;
          padding: 2px 7px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          pointer-events: none;
          z-index: 9999;
          border-radius: 0 0 4px 0;
        }
        section.text-block.video-block {
          outline: 2px dashed #FFCB05 !important;
          position: relative !important;
        }
        section.text-block.video-block::before {
          content: 'VIDEO BLOCK';
          position: absolute;
          top: 0; left: 0;
          background: #FFCB05;
          color: #1c1c1e;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .6px;
          padding: 2px 7px;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          pointer-events: none;
          z-index: 9999;
          border-radius: 0 0 4px 0;
        }
      `;
      edDoc.head.appendChild(style);
      blocksVisible = true;
      this.classList.add('active');
      ensurePlaceholder(ed);
      showToast('Block outlines on');
    }
  });

  // ── Insert paragraph ───────────────────────────────────────────────────────
  // If cursor is inside a plain text-block → insert <p> inline at cursor.
  // If cursor is inside a video block, callout, or other special section →
  // exit that section and create a new text-block after it, matching the
  // same behaviour as inserting a Text Block component with an H2.
  document.getElementById(ID + '-insert-p').addEventListener('click', () => {
    const ed = getEditor();
    if (!ed) { showToast('Open a page editor first'); return; }

    const wrapper = ed.getBody().querySelector('.new-canvas');

    if (!wrapper) {
      // No canvas structure yet — plain inline insert
      ed.focus();
      ed.insertContent('<p>Paragraph text</p>');
      showToast('Paragraph inserted ✓');
      return;
    }

    let cursorSection = null;
    try { cursorSection = getAnchorSection(wrapper, ed.selection.getNode()); } catch (e) {}
    if (cursorSection && cursorSection.getAttribute(PH_ATTR)) cursorSection = null;

    if (cursorSection && isPlainTextBlock(cursorSection)) {
      // Inside a plain text-block — but check if the cursor is nested inside
      // a callout, blockquote, two-col, etc. If so, break out past that element.
      const subWrapper = getCursorSubWrapper(ed.selection.getNode(), cursorSection);
      if (subWrapper) {
        ed.undoManager.transact(() => subWrapper.insertAdjacentHTML('afterend', '<p>Paragraph text</p>'));
      } else {
        ed.focus();
        ed.insertContent('<p>Paragraph text</p>');
      }
    } else if (cursorSection) {
      // Inside a video block, callout, header, etc. — break out into a new section
      insertAfterSection(ed, cursorSection, '<section class="text-block">\n  <p>Paragraph text</p>\n</section>');
    } else {
      // No cursor — insert before placeholder / at end of page
      const ph = wrapper.querySelector(`[${PH_ATTR}]`);
      if (ph) {
        insertBeforeSection(ed, ph, '<section class="text-block">\n  <p>Paragraph text</p>\n</section>');
      } else {
        appendToWrapper(ed, wrapper, '<section class="text-block">\n  <p>Paragraph text</p>\n</section>');
      }
    }
    ensurePlaceholder(ed);
    showToast('Paragraph inserted ✓');
  });

  sidebar.querySelectorAll('.lxd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sidebar.querySelectorAll('.lxd-tab').forEach(t => t.classList.remove('active'));
      sidebar.querySelectorAll('.lxd-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(ID + '-panel-' + tab.dataset.tab).classList.add('active');
      const isStyleguide = tab.dataset.tab === 'styleguide';
      const isArrange    = tab.dataset.tab === 'arrange';
      const isPages      = tab.dataset.tab === 'pages';
      const isImages     = tab.dataset.tab === 'images';
      document.getElementById(ID + '-search-wrap').style.display = (isStyleguide || isArrange || isPages || isImages) ? 'none' : '';
      // Clear search and reset component nav when switching tabs
      document.getElementById(ID + '-search').value = '';
      if (tab.dataset.tab === 'components') showCompHome();
      if (isArrange) {
        const ed = getEditor();
        if (ed) ensurePlaceholder(ed);
        buildArrangePanel();
      }
      if (isPages)  renderPagesPanel();
      if (isImages) renderImagesTab();
    });
  });

  // ── Category tile → browse view ────────────────────────────────────────────
  sidebar.addEventListener('click', e => {
    const tile = e.target.closest('.lxd-cat-tile');
    if (!tile) return;
    showCompBrowse(tile.dataset.cat);
  });

  // ── Back button ────────────────────────────────────────────────────────────
  document.getElementById(ID + '-back-btn').addEventListener('click', () => {
    showCompHome();
    document.getElementById(ID + '-search').value = '';
  });

  // ── Preview modal ──────────────────────────────────────────────────────────
  function hidePreviewModal() {
    document.getElementById(ID + '-preview-modal').style.display = 'none';
  }

  sidebar.addEventListener('click', e => {
    const preview = e.target.closest('.lxd-comp-tile-preview');
    if (!preview) return;
    const tile    = preview.closest('.lxd-comp-tile');
    const name    = tile.querySelector('.lxd-comp-tile-name').textContent.trim();
    const htmlEnc = tile.querySelector('.lxd-btn-insert')?.dataset.html || '';
    const IMG_PH   = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDUwIiB2aWV3Qm94PSIwIDAgODAwIDQ1MCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0NTAiIGZpbGw9IiNlNWU3ZWIiLz48Y2lyY2xlIGN4PSIyMjAiIGN5PSIxMzAiIHI9IjY1IiBmaWxsPSIjOWNhM2FmIi8+PHBhdGggZD0iTTAgMzEwIEwyMjAgMTcwIEwzNTAgMjgwIEw0NjAgMjEwIEw4MDAgMzcwIEw4MDAgNDUwIEwwIDQ1MCBaIiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';
    const PHOTO_PH = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIxMDAiIGZpbGw9IiNlNWU3ZWIiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3OCIgcj0iMzgiIGZpbGw9IiM5Y2EzYWYiLz48cGF0aCBkPSJNMjAgMjAwIFEyMCAxMzggMTAwIDEzOCBRMTgwIDEzOCAxODAgMjAwIFoiIGZpbGw9IiM5Y2EzYWYiLz48L3N2Zz4=';

    const pmComp  = COMPONENTS.find(c => c.name.toLowerCase() === tile.dataset.name);
    const inner = decodeURIComponent(htmlEnc)
      .replace(/PASTE_IMAGE_URL/g, IMG_PH)
      .replace(/PASTE_PHOTO_URL/g, PHOTO_PH);

    document.getElementById(ID + '-pm-name').textContent       = name;
    document.getElementById(ID + '-pm-desc').textContent       = pmComp?.desc || '';
    document.getElementById(ID + '-pm-insert').dataset.html    = htmlEnc;
    document.getElementById(ID + '-pm-insert').dataset.type    = pmComp?.type || 'standalone';
    document.getElementById(ID + '-pm-copy').dataset.html      = htmlEnc;
    document.getElementById(ID + '-pm-frame').srcdoc = `<!DOCTYPE html><html><head>
      <link rel="stylesheet" href="https://academic-innovation.github.io/canvas-css/dist/canvas-style.css">
      <style>body{margin:0;padding:16px;}</style>
    </head><body><div class="new-canvas">${inner}</div></body></html>`;
    document.getElementById(ID + '-preview-modal').style.display = 'flex';
  });

  document.getElementById(ID + '-pm-close').addEventListener('click', hidePreviewModal);

  document.getElementById(ID + '-pm-insert').addEventListener('click', function () {
    insertHTML(decodeURIComponent(this.dataset.html), this.dataset.type || 'standalone');
    hidePreviewModal();
  });

  document.getElementById(ID + '-pm-copy').addEventListener('click', function () {
    copyHTML(decodeURIComponent(this.dataset.html));
    hidePreviewModal();
  });

  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') hidePreviewModal();
  });

  // ── Pages tab — Insert and Copy HTML ──────────────────────────────────────
  // page.html is the raw full-page HTML string (the <div class="new-canvas">…</div> block).

  function insertPage(page) {
    const ed = getEditor();
    if (!ed) { showToast('Open a page editor first'); return; }
    if (!page.html) { showToast('No HTML in this template'); return; }
    const body = ed.getBody();
    const hasContent = body.textContent.trim().length > 0
      || body.querySelector('.new-canvas, section');
    if (hasContent && !confirm(`Replace the current page content with "${page.name}"?`)) return;
    ed.undoManager.transact(() => ed.setContent(page.html));
    showToast(`"${page.name}" inserted ✓`);
  }

  function copyPageHTML(page) {
    if (!page.html) { showToast('No HTML in this template'); return; }
    navigator.clipboard.writeText(page.html)
      .then(() => showToast('Page HTML copied ✓'))
      .catch(() => showToast('Copy failed'));
  }

  document.getElementById(ID + '-panel-pages').addEventListener('click', e => {
    const btn = e.target.closest('.lxd-btn-insert, .lxd-btn-copy');
    if (!btn || btn.dataset.pageIdx === undefined) return;
    const pages = document.getElementById(ID + '-pages-list')._lxd_pages || [];
    const page = pages[+btn.dataset.pageIdx];
    if (!page) return;
    if (btn.classList.contains('lxd-btn-insert')) insertPage(page);
    else copyPageHTML(page);
  });

  // ── Settings toggle ────────────────────────────────────────────────────────
  sidebar.addEventListener('click', e => {
    const btn = e.target.closest('.lxd-settings-btn');
    if (!btn) return;
    const panel = btn.closest('.lxd-comp-tile').querySelector('.lxd-comp-tile-settings');
    const opening = panel.style.display === 'none';
    panel.style.display = opening ? 'block' : 'none';
    btn.classList.toggle('active', opening);
  });

  // ── Settings insert ────────────────────────────────────────────────────────
  sidebar.addEventListener('click', e => {
    const btn = e.target.closest('.lxd-sf-submit');
    if (!btn) return;
    const comp = COMPONENTS[+btn.dataset.idx];
    if (!comp?.build) return;
    const vals = {};
    btn.closest('.lxd-comp-tile-settings').querySelectorAll('[data-field]').forEach(input => {
      vals[input.dataset.field] = input.type === 'checkbox' ? input.checked : input.value;
    });
    insertHTML(stripWrapper(comp.build(vals)), comp.type || 'standalone');
  });

  sidebar.addEventListener('click', e => {
    const btn = e.target.closest('.lxd-btn-insert, .lxd-btn-copy');
    if (!btn) return;
    const html = decodeURIComponent(btn.dataset.html);
    if (btn.classList.contains('lxd-btn-insert')) insertHTML(html, btn.dataset.type || 'standalone');
    else copyHTML(html);
  });

  sidebar.addEventListener('click', e => {
    const chip = e.target.closest('.lxd-variant-chip');
    if (!chip) return;
    const tile = chip.closest('.lxd-comp-tile');
    tile.querySelectorAll('.lxd-variant-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    tile.querySelector('.lxd-btn-insert').dataset.html = chip.dataset.vh;
    tile.querySelector('.lxd-btn-insert').dataset.type = chip.dataset.vtype;
    tile.querySelector('.lxd-btn-copy').dataset.html   = chip.dataset.vh;
  });

  sidebar.addEventListener('click', e => {
    const swatch = e.target.closest('.lxd-swatch');
    if (!swatch) return;
    navigator.clipboard.writeText(swatch.dataset.hex)
      .then(() => showToast(swatch.dataset.hex + ' copied'));
  });

  // ── Course Images tab interactions (dev only) ─────────────────────────────
  if (_isDev) {
    // Folder button → navigate into folder
    document.getElementById(ID + '-img-content').addEventListener('click', e => {
      const folderBtn = e.target.closest('.lxd-img-folder-btn');
      if (folderBtn) {
        const fid  = folderBtn.dataset.folderId;
        const name = folderBtn.dataset.folderName || 'Folder';
        loadImgFolder(fid, { name, id: fid });
        return;
      }
      // Image thumbnail → show alt text screen
      const thumb = e.target.closest('.lxd-img-thumb');
      if (thumb) {
        const url    = thumb.dataset.imgUrl;
        const name   = thumb.dataset.imgName || 'Image';
        const turl   = thumb.dataset.imgThumb || url;
        const fileId = thumb.dataset.imgId || '';
        showImgAltScreen(url, name, turl, fileId);
      }
    });

    // Breadcrumb navigation
    document.getElementById(ID + '-img-breadcrumb').addEventListener('click', e => {
      const btn = e.target.closest('.lxd-img-crumb-btn');
      if (!btn) return;
      const idx = +btn.dataset.crumbIdx;
      const target = imgState.breadcrumb[idx];
      if (!target) return;
      imgState.breadcrumb = imgState.breadcrumb.slice(0, idx + 1);
      loadImgFolder(target.id, null);
    });

    // Reload button
    document.getElementById(ID + '-img-reload').addEventListener('click', () => {
      renderImagesTab();
    });

    // Alt text back button
    document.getElementById(ID + '-img-alt-back').addEventListener('click', () => {
      imgAltView().classList.add('hidden');
      imgBrowseView().classList.remove('hidden');
    });

    // Decorative checkbox → toggle alt text input
    document.getElementById(ID + '-img-alt-decorative').addEventListener('change', function () {
      document.getElementById(ID + '-img-alt-input').disabled = this.checked;
    });

    // Submit (Insert/Swap) button
    document.getElementById(ID + '-img-alt-submit').addEventListener('click', doInsertImage);
  }

  document.getElementById(ID + '-search').addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    if (q) showCompSearch(q);
    else if (compView === 'search') showCompHome();
  });

})();
