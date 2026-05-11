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
  // HTML snippets sourced from academic-innovation/canvas-css cookbook JSON
  const COMPONENTS = [

    // ── Text ───────────────────────────────────────────────────────────────
    {
      name: 'Text Block',
      cat: 'Text',
      color: '#00274C',
      desc: 'Base content section. Most common building block.',
      preview: '<div style="padding:6px 8px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:70px;height:9px;background:#00274c;border-radius:3px;opacity:.7"></div><div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px"></div><div style="width:85%;height:6px;background:#e5e7eb;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <h2>Heading 2</h2>\n  <p>Paragraph text</p>\n</section>\n</div>`
    },
    {
      name: 'Text Block (Assignment)',
      cat: 'Text',
      color: '#00274C',
      desc: 'Text block styled for assignment instructions.',
      preview: '<div style="padding:6px 8px;height:52px;border-left:3px solid #00274c;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:80px;height:9px;background:#00274c;border-radius:3px;opacity:.8"></div><div style="width:100%;height:6px;background:#e5e7eb;border-radius:3px"></div><div style="width:75%;height:6px;background:#e5e7eb;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block assignment">\n  <h2>Your Assignment</h2>\n  <h3>Overview</h3>\n  <p>Assignment instructions go here.</p>\n  <h3>Instructions</h3>\n  <p>Step-by-step instructions. <a href="">link text</a></p>\n</section>\n</div>`
    },
    {
      name: 'Graphical Highlight',
      cat: 'Text',
      color: '#8B5CF6',
      desc: 'Two-column highlight — text left, graphic right.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#ede9fe;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:#ddd6fe;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="width:20px;height:20px;background:#8B5CF6;border-radius:50%;opacity:.4"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="graphical-highlight">\n  <div>\n    <p>Highlight content goes here.</p>\n  </div>\n  <div></div>\n</section>\n</div>`
    },
    {
      name: 'Gamut Intro (Gallery)',
      cat: 'Text',
      color: '#10B981',
      desc: 'Text block for introducing a Gamut Gallery tool.',
      preview: '<div style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:60px;height:8px;background:#10B981;border-radius:3px;opacity:.8"></div><div style="width:90px;height:6px;background:rgba(16,185,129,.3);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block gamut-intro gallery">\n  <p>Text block content</p>\n</section>\n</div>`
    },
    {
      name: 'Gamut Intro (Workbook)',
      cat: 'Text',
      color: '#10B981',
      desc: 'Text block for introducing a Gamut Workbook tool.',
      preview: '<div style="background:linear-gradient(135deg,#d1fae5,#a7f3d0);border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:60px;height:8px;background:#059669;border-radius:3px;opacity:.8"></div><div style="width:90px;height:6px;background:rgba(5,150,105,.3);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block gamut-intro workbook">\n  <p>Text block content</p>\n</section>\n</div>`
    },

    // ── Callouts ───────────────────────────────────────────────────────────
    {
      name: 'Callout Box',
      cat: 'Callouts',
      color: '#3B82F6',
      desc: 'Info callout — definitions, reminders, key takeaways.',
      preview: '<div style="border:2px solid #3B82F6;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#3B82F6;border-radius:3px;opacity:.7"></div><div style="width:110px;height:6px;background:#bfdbfe;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box">\n    <p class="tag">Information</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Callout Box (Action)',
      cat: 'Callouts',
      color: '#FFCB05',
      desc: 'Action callout — prompts, reflections, learner tasks.',
      preview: '<div style="border:2px solid #FFCB05;background:#fffdf0;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="width:110px;height:6px;background:#fde68a;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box action">\n    <p class="tag">Action</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Callout Box (Highlight)',
      cat: 'Callouts',
      color: '#00274C',
      desc: 'High-visibility callout — warnings, strong emphasis.',
      preview: '<div style="background:#00274c;border-radius:8px;padding:8px 12px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:50px;height:7px;background:#FFCB05;border-radius:3px"></div><div style="width:110px;height:6px;background:rgba(255,255,255,.25);border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="callout-box highlight">\n    <p class="tag">Highlight</p>\n    <p>Put content here</p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Pull Quote',
      cat: 'Callouts',
      color: '#FFCB05',
      desc: 'Styled blockquote for key quotes or takeaways.',
      preview: '<div style="border-left:4px solid #FFCB05;background:#fffdf0;padding:8px 12px;border-radius:0 6px 6px 0;height:52px;display:flex;flex-direction:column;justify-content:center;gap:5px"><div style="width:100px;height:7px;background:#d4a800;border-radius:3px;opacity:.6;font-style:italic"></div><div style="width:55px;height:5px;background:#fde68a;border-radius:3px"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <blockquote>\n    <p>Put quote text here</p>\n    <p>Put author name here</p>\n  </blockquote>\n</section>\n</div>`
    },
    {
      name: 'Side-by-Side Callout',
      cat: 'Callouts',
      color: '#6B7280',
      desc: 'Two side-by-side callout boxes for comparisons.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;height:52px"><div style="border:2px solid #9ca3af;border-radius:5px;padding:5px;display:flex;flex-direction:column;gap:3px"><div style="height:6px;background:#d1d5db;border-radius:2px;width:70%"></div><div style="height:5px;background:#e5e7eb;border-radius:2px"></div></div><div style="border:2px solid #9ca3af;border-radius:5px;padding:5px;display:flex;flex-direction:column;gap:3px"><div style="height:6px;background:#d1d5db;border-radius:2px;width:70%"></div><div style="height:5px;background:#e5e7eb;border-radius:2px"></div></div></div>',
      html: `<div class="sideBySideCallOutCon">\n  <div class="sideBySideCallOut">\n    <h2>Left heading:</h2>\n    <ul>\n      <li>Sample Text</li>\n      <li>Sample Text</li>\n    </ul>\n  </div>\n  <div class="sideBySideCallOut">\n    <h2>Right heading:</h2>\n    <ul>\n      <li>Sample Text</li>\n      <li>Sample Text</li>\n    </ul>\n  </div>\n</div>`
    },

    // ── Video ──────────────────────────────────────────────────────────────
    {
      name: 'Video Block',
      cat: 'Video',
      color: '#00274C',
      desc: 'Standard lecture video section.',
      preview: '<div style="background:#f3f4f6;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:#00274c;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid white;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:#9ca3af;border-radius:3px"></div><div style="width:38px;height:5px;background:#d1d5db;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block">\n  <div class="video-tag-wrapper">\n    <p class="tag">Lecture</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },
    {
      name: 'Video Block (Guest Lecture)',
      cat: 'Video',
      color: '#1a3a5c',
      desc: 'Highlighted video block for guest lecture content.',
      preview: '<div style="background:#00274c;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:rgba(255,203,5,.9);border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid #00274c;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:rgba(255,255,255,.4);border-radius:3px"></div><div style="width:38px;height:5px;background:rgba(255,255,255,.25);border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block highlight">\n  <div class="video-tag-wrapper">\n    <p class="tag">Guest lecture</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },
    {
      name: 'Video Block (Blue)',
      cat: 'Video',
      color: '#3B82F6',
      desc: 'Blue-tag video block for alternate video labeling.',
      preview: '<div style="background:#eff6ff;border-radius:6px;height:52px;display:flex;align-items:center;justify-content:center;gap:8px"><div style="width:28px;height:28px;background:#3B82F6;border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="border-left:9px solid white;border-top:5px solid transparent;border-bottom:5px solid transparent;margin-left:2px"></div></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:55px;height:6px;background:#93c5fd;border-radius:3px"></div><div style="width:38px;height:5px;background:#bfdbfe;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block video-block blue">\n  <div class="video-tag-wrapper">\n    <p class="tag">Tag label</p>\n  </div>\n  <h2>Video Title</h2>\n  <p>Brief description of the video content.</p>\n</section>\n</div>`
    },

    // ── Layout ─────────────────────────────────────────────────────────────
    {
      name: 'Course Display Header',
      cat: 'Layout',
      color: '#00274C',
      desc: 'Full hero header for the Course Intro page with collage and nav.',
      preview: '<div style="background:linear-gradient(90deg,#00274c 45%,#e0e0e0 45%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:8px;top:10px;width:90px;height:10px;background:rgba(255,203,5,.9);border-radius:3px"></div><div style="position:absolute;left:8px;top:26px;width:60px;height:7px;background:rgba(255,255,255,.3);border-radius:3px"></div><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:linear-gradient(135deg,#ccc 25%,#bbb 25%,#bbb 50%,#ccc 50%,#ccc 75%,#bbb 75%);background-size:8px 8px;opacity:.6"></div></div>',
      html: `<div class="new-canvas">\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <h2>Welcome to <strong>Course Title</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75" loading="lazy">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image" loading="lazy"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="URL here">Start Here</a></p></li>\n      <li><p><a href="URL here">See Syllabus</a></p></li>\n      <li><p><a href="URL here">See Modules</a></p></li>\n      <li><p><a href="URL here">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Course Header (Series)',
      cat: 'Layout',
      color: '#1a3a5c',
      desc: 'Display header with series number sub-title.',
      preview: '<div style="background:linear-gradient(90deg,#1a3a5c 45%,#e0e0e0 45%);height:52px;border-radius:6px;position:relative;overflow:hidden"><div style="position:absolute;left:6px;top:6px;width:60px;height:5px;background:rgba(255,255,255,.3);border-radius:2px"></div><div style="position:absolute;left:6px;top:16px;width:90px;height:10px;background:rgba(255,203,5,.9);border-radius:3px"></div><div style="position:absolute;right:0;top:0;bottom:0;width:55%;background:linear-gradient(135deg,#ccc 25%,#bbb 25%,#bbb 50%,#ccc 50%,#ccc 75%,#bbb 75%);background-size:8px 8px;opacity:.6"></div></div>',
      html: `<div class="new-canvas">\n<div class="sub-title">\n  <p>Course # of the <em>Course Series Name</em> Series</p>\n</div>\n<section class="display-header">\n  <div class="heading">\n    <div>\n      <p class="tag">Course # of #</p>\n      <h2>Welcome to <strong>Course Title</strong></h2>\n      <img class="um-logo" role="presentation" src="https://courses.online.umich.edu/courses/284/files/9377/preview" alt="" width="71" height="75" loading="lazy">\n    </div>\n    <div class="collage">\n      <div>&nbsp;</div>\n      <div><img src="PASTE_IMAGE_URL" alt="Describe the image" loading="lazy"></div>\n    </div>\n  </div>\n  <div class="nav-links">\n    <ul>\n      <li><p><a href="URL here">Start Here</a></p></li>\n      <li><p><a href="URL here">See Syllabus</a></p></li>\n      <li><p><a href="URL here">See Modules</a></p></li>\n      <li><p><a href="URL here">Get Course Support</a></p></li>\n    </ul>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Accordion',
      cat: 'Layout',
      color: '#00274C',
      desc: 'Expandable FAQ-style sections with details/summary.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;padding:4px 2px"><div style="background:#f3f4f6;border-radius:4px;padding:6px 8px;display:flex;justify-content:space-between;align-items:center"><div style="width:60px;height:7px;background:#d1d5db;border-radius:3px"></div><span style="color:#aaa;font-size:9px">▾</span></div><div style="background:#f3f4f6;border-radius:4px;padding:6px 8px;display:flex;justify-content:space-between;align-items:center"><div style="width:80px;height:7px;background:#d1d5db;border-radius:3px"></div><span style="color:#aaa;font-size:9px">▾</span></div></div>',
      html: `<div class="new-canvas">\n<section>\n  <section class="accordion">\n    <h2>Frequently Asked Questions</h2>\n    <details>\n      <summary>Accordion Item Title 1</summary>\n      <div>\n        <p>Content for accordion item 1.</p>\n      </div>\n    </details>\n    <details>\n      <summary>Accordion Item Title 2</summary>\n      <div>\n        <p>Content for accordion item 2.</p>\n      </div>\n    </details>\n    <details>\n      <summary>Accordion Item Title 3</summary>\n      <div>\n        <p>Content for accordion item 3.</p>\n      </div>\n    </details>\n  </section>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Text)',
      cat: 'Layout',
      color: '#8B5CF6',
      desc: 'Two text columns side by side.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-text">\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the first column.</p>\n    </div>\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the second column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Text Light Blue)',
      cat: 'Layout',
      color: '#3B82F6',
      desc: 'Two text columns with a light blue background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#eff6ff;border-radius:6px;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#93c5fd;border-radius:3px"></div><div style="height:5px;background:#bfdbfe;border-radius:3px"></div></div><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#93c5fd;border-radius:3px"></div><div style="height:5px;background:#bfdbfe;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-text light-blue">\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the first column.</p>\n    </div>\n    <div>\n      <h4>Column heading</h4>\n      <p>Content for the second column.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image)',
      cat: 'Layout',
      color: '#8B5CF6',
      desc: 'Text left, image right.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px"><div style="background:#f3f4f6;border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#c4b5fd;border-radius:3px"></div><div style="height:5px;background:#e9d5ff;border-radius:3px;width:80%"></div></div><div style="background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:4px;display:flex;align-items:center;justify-content:center"><div style="width:18px;height:18px;background:#8B5CF6;border-radius:3px;opacity:.4"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image Dark)',
      cat: 'Layout',
      color: '#1c1c1e',
      desc: 'Text and image side by side, dark background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#1c1c1e;border-radius:6px;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:rgba(255,203,5,.7);border-radius:3px"></div><div style="height:5px;background:rgba(255,255,255,.2);border-radius:3px"></div></div><div style="background:rgba(255,255,255,.1);border-radius:3px;display:flex;align-items:center;justify-content:center"><div style="width:16px;height:16px;background:rgba(255,255,255,.3);border-radius:2px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img dark">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Two-Col (Text / Image Highlight)',
      cat: 'Layout',
      color: '#FFCB05',
      desc: 'Text and image side by side, maize highlight background.',
      preview: '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;height:52px;background:#fffdf0;border-radius:6px;border:2px solid #FFCB05;padding:6px"><div style="border-radius:3px;padding:4px;display:flex;flex-direction:column;gap:4px"><div style="height:7px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="height:5px;background:#fde68a;border-radius:3px"></div></div><div style="background:#fef9c3;border-radius:3px;display:flex;align-items:center;justify-content:center"><div style="width:16px;height:16px;background:#fde68a;border-radius:2px"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="two-col text-img highlight">\n    <div>\n      <h3>Column Heading</h3>\n      <p>Text content for the left column.</p>\n    </div>\n    <div>\n      <img src="PASTE_IMAGE_URL" alt="Put alternative text here" loading="lazy">\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Instructor Panel (Blue)',
      cat: 'Layout',
      color: '#00274C',
      desc: 'Instructor profile block — U-M Blue variant.',
      preview: '<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:center;height:52px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#93c5fd,#60a5fa)"></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:70px;height:8px;background:#00274c;border-radius:3px;opacity:.7"></div><div style="width:100px;height:5px;background:#d1d5db;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section>\n  <div class="instructor">\n    <div>\n      <img src="PASTE_PHOTO_URL" alt="Headshot of Instructor Name">\n      <h2>Instructor Name</h2>\n      <p><strong>Title, Department</strong></p>\n    </div>\n    <div>\n      <p>Instructor bio goes here.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Instructor Panel (Maize)',
      cat: 'Layout',
      color: '#FFCB05',
      desc: 'Instructor profile block — U-M Maize variant.',
      preview: '<div style="display:grid;grid-template-columns:36px 1fr;gap:8px;align-items:center;height:52px"><div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#fde68a,#fbbf24)"></div><div style="display:flex;flex-direction:column;gap:4px"><div style="width:70px;height:8px;background:#d4a800;border-radius:3px;opacity:.8"></div><div style="width:100px;height:5px;background:#fde68a;border-radius:3px"></div></div></div>',
      html: `<div class="new-canvas">\n<section>\n  <div class="instructor maize">\n    <div>\n      <img src="PASTE_PHOTO_URL" alt="Headshot of Instructor Name">\n      <h2>Instructor Name</h2>\n      <p><strong>Title, Department</strong></p>\n    </div>\n    <div>\n      <p>Instructor bio goes here.</p>\n    </div>\n  </div>\n</section>\n</div>`
    },

    // ── Media ──────────────────────────────────────────────────────────────
    {
      name: 'Image (Sharp Corners)',
      cat: 'Media',
      color: '#F97316',
      desc: 'Full-width image with caption text.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;height:52px"><div style="background:linear-gradient(135deg,#fed7aa,#fdba74);border-radius:3px;flex:1"></div><div style="width:80px;height:5px;background:#d1d5db;border-radius:3px;margin:0 auto"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="img-caption">\n    <img src="PASTE_IMAGE_URL" alt="Alt text here" loading="lazy">\n    <p><em>Put caption text here</em></p>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Image (Rounded Corners)',
      cat: 'Media',
      color: '#F97316',
      desc: 'Full-width image with rounded corners and caption.',
      preview: '<div style="display:flex;flex-direction:column;gap:4px;height:52px"><div style="background:linear-gradient(135deg,#fed7aa,#fdba74);border-radius:8px;flex:1"></div><div style="width:80px;height:5px;background:#d1d5db;border-radius:3px;margin:0 auto"></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="img-caption">\n    <img src="PASTE_IMAGE_URL" class="rounded-corners" alt="Alt text here" loading="lazy">\n    <p><em>Put caption text here</em></p>\n  </div>\n</section>\n</div>`
    },

    // ── Tables ─────────────────────────────────────────────────────────────
    {
      name: 'Table',
      cat: 'Tables',
      color: '#0EA5E9',
      desc: 'Standard scrollable data table.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:8px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table>\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Table (Alternate Rows)',
      cat: 'Tables',
      color: '#0EA5E9',
      desc: 'Table with alternating row background colors.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:8px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;background:#f0f9ff;display:flex;gap:8px"><div style="height:5px;background:#bae6fd;border-radius:2px;flex:1"></div><div style="height:5px;background:#bae6fd;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:8px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table class="alternate-rows">\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },
    {
      name: 'Table (Alternate Columns)',
      cat: 'Tables',
      color: '#0EA5E9',
      desc: 'Table with alternating column background colors.',
      preview: '<div style="border:1px solid #e5e7eb;border-radius:5px;overflow:hidden;height:52px"><div style="background:#00274c;padding:5px 8px;display:flex;gap:4px"><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.3);border-radius:2px;flex:1"></div><div style="height:6px;background:rgba(255,255,255,.5);border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:4px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#f0f9ff;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div><div style="padding:5px 8px;display:flex;gap:4px"><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div><div style="height:5px;background:#f0f9ff;border-radius:2px;flex:1"></div><div style="height:5px;background:#e5e7eb;border-radius:2px;flex:1"></div></div></div>',
      html: `<div class="new-canvas">\n<section class="text-block">\n  <div class="table-container">\n    <table class="alternate-columns">\n      <thead>\n        <tr>\n          <th>Header</th>\n          <th>Header</th>\n          <th>Header</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n        <tr>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n          <td>Sample text here</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n</div>`
    },

  ];

  // ── Snippets data ──────────────────────────────────────────────────────────
  const SNIPPETS = [
    {
      name: 'Divider (Subtle)',
      color: '#6B7280',
      desc: 'Subtle horizontal rule.',
      html: `<hr style="border:none;border-top:2px solid #e5e7eb;margin:24px 0;" />`
    },
    {
      name: 'Divider (Maize)',
      color: '#FFCB05',
      desc: 'Short maize accent divider.',
      html: `<hr style="border:none;border-top:3px solid #FFCB05;margin:24px 0;width:60px;" />`
    },
    {
      name: 'Button (Navy)',
      color: '#00274C',
      desc: 'Navy CTA button link.',
      html: `<p><a href="PASTE_URL" style="display:inline-block;background:#00274C;color:white;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:600;font-size:.9em;">Button Label</a></p>`
    },
    {
      name: 'Button (Maize)',
      color: '#FFCB05',
      desc: 'Maize CTA button link.',
      html: `<p><a href="PASTE_URL" style="display:inline-block;background:#FFCB05;color:#1c1c1e;padding:10px 22px;border-radius:6px;text-decoration:none;font-weight:700;font-size:.9em;">Button Label</a></p>`
    },
    {
      name: 'Tag / Pill',
      color: '#8B5CF6',
      desc: 'Inline tag label using the .tag class.',
      html: `<span class="tag">Tag Label</span>`
    },
    {
      name: 'UM Logo',
      color: '#00274C',
      desc: 'Official University of Michigan block M logo.',
      html: `<img role="presentation" src="https://shared-files.online.umich.edu/michigan-online/course-images/current/umichlogo.png" alt="" width="71" height="75" />`
    },
    {
      name: 'Michigan Online Logo',
      color: '#00274C',
      desc: 'Michigan Online horizontal lockup.',
      html: `<img role="presentation" src="https://shared-files.online.umich.edu/michigan-online/course-images/current/michiganOnline.png" alt="" width="318" height="56" />`
    },
    {
      name: 'Spacer (32px)',
      color: '#D1D5DB',
      desc: '32px of vertical breathing room.',
      html: `<div style="height:32px;" aria-hidden="true"></div>`
    },
    {
      name: 'Spacer (64px)',
      color: '#D1D5DB',
      desc: '64px of vertical breathing room.',
      html: `<div style="height:64px;" aria-hidden="true"></div>`
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

    /* Category filter */
    #${ID} .lxd-cat-filter {
      padding: 7px 10px 5px;
      background: white;
      border-bottom: 1px solid #e4e2dc;
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
      flex-shrink: 0;
    }
    #${ID} .lxd-cat-btn {
      padding: 3px 8px;
      border-radius: 20px;
      border: 1px solid #e4e2dc;
      background: transparent;
      font-size: .68rem;
      font-weight: 600;
      color: #888;
      cursor: pointer;
      transition: all .15s;
      white-space: nowrap;
    }
    #${ID} .lxd-cat-btn:hover { border-color: #bbb; color: #444; }
    #${ID} .lxd-cat-btn.active { background: #1c1c1e; border-color: #1c1c1e; color: white; }

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

    #${ID} .lxd-card {
      background: white;
      border: 1px solid #e4e2dc;
      border-radius: 10px;
      margin-bottom: 8px;
      overflow: hidden;
      transition: box-shadow .15s;
    }
    #${ID} .lxd-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,.08); }
    #${ID} .lxd-card-preview { padding: 10px 12px 8px; border-bottom: 1px solid #f0ede6; }
    #${ID} .lxd-card-body { padding: 8px 12px 10px; }
    #${ID} .lxd-card-tag {
      font-size: .65rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .7px;
      margin-bottom: 2px;
    }
    #${ID} .lxd-card-name { font-weight: 700; font-size: .88rem; margin-bottom: 2px; }
    #${ID} .lxd-card-desc { font-size: .76rem; color: #888; line-height: 1.4; margin-bottom: 8px; }
    #${ID} .lxd-card-actions { display: flex; gap: 6px; }

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
    #${ID} .lxd-snippet-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
    #${ID} .lxd-snippet-info { flex: 1; min-width: 0; }
    #${ID} .lxd-snippet-name { font-weight: 700; font-size: .85rem; }
    #${ID} .lxd-snippet-desc { font-size: .73rem; color: #888; line-height: 1.3; }

    #${ID} .lxd-sg-label {
      font-size: .68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .8px;
      color: #aaa;
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
    #${ID} .lxd-swatch code { font-size: .68rem; color: #aaa; }

    #${ID} .lxd-type { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-type-row {
      background: white; border: 1px solid #e4e2dc; border-radius: 7px;
      padding: 7px 10px; display: flex; align-items: center; justify-content: space-between;
    }
    #${ID} .lxd-type-row code { font-size: .7rem; color: #aaa; }

    #${ID} .lxd-classes { display: flex; flex-direction: column; gap: 4px; }
    #${ID} .lxd-class-row {
      background: white; border: 1px solid #e4e2dc; border-radius: 7px;
      padding: 7px 10px; display: flex; align-items: center; justify-content: space-between; gap: 8px;
    }
    #${ID} .lxd-class-row code { font-size: .73rem; color: #1c1c1e; white-space: nowrap; }
    #${ID} .lxd-class-row span { font-size: .7rem; color: #888; text-align: right; }

    #${ID}-toast {
      position: fixed;
      bottom: 24px; right: 340px;
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
  // Strip the outer <div class="new-canvas"> wrapper — insertHTML manages it
  function stripWrapper(html) {
    return html
      .replace(/^<div class="new-canvas">\n?/, '')
      .replace(/\n?<\/div>$/, '');
  }

  function componentCards(list) {
    return list.map(c => {
      const inner = encodeURIComponent(stripWrapper(c.html));
      return `
      <div class="lxd-card" data-name="${c.name.toLowerCase()}" data-cat="${c.cat}">
        <div class="lxd-card-preview">${c.preview || ''}</div>
        <div class="lxd-card-body">
          <div class="lxd-card-tag" style="color:${c.color}">${c.cat}</div>
          <div class="lxd-card-name">${c.name}</div>
          <div class="lxd-card-desc">${c.desc}</div>
          <div class="lxd-card-actions">
            <button class="lxd-btn-insert" data-html="${inner}">Insert</button>
            <button class="lxd-btn-copy"   data-html="${inner}">Copy</button>
          </div>
        </div>
      </div>`;
    }).join('');
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

  const CATS = ['All', 'Text', 'Callouts', 'Video', 'Layout', 'Media', 'Tables'];
  const catFilterHTML = CATS.map((c, i) =>
    `<button class="lxd-cat-btn${i === 0 ? ' active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

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

    <div class="lxd-cat-filter" id="${ID}-cat-filter">
      ${catFilterHTML}
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

  // ── State ──────────────────────────────────────────────────────────────────
  let activeCat = 'All';

  // ── Helpers ────────────────────────────────────────────────────────────────
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function doInsert(ed, html) {
    const body = ed.getBody();
    let wrapper = body.querySelector('.new-canvas');

    if (!wrapper) {
      // First insert — create the page wrapper at end of body, then grab it
      ed.selection.select(body, true);
      ed.selection.collapse(false);
      ed.insertContent('<div class="new-canvas"><p></p></div>');
      wrapper = body.querySelector('.new-canvas');
    }

    if (wrapper) {
      // Always append inside the wrapper, ignoring wherever the cursor was
      const range = ed.dom.createRng();
      range.selectNodeContents(wrapper);
      range.collapse(false); // collapse to end of wrapper contents
      ed.selection.setRng(range);
      ed.insertContent(html);

      // Leave cursor at end of wrapper so the next insert also lands there
      const updated = body.querySelector('.new-canvas');
      if (updated) {
        const r = ed.dom.createRng();
        r.selectNodeContents(updated);
        r.collapse(false);
        ed.selection.setRng(r);
      }
    } else {
      // Fallback — wrapper creation failed for some reason
      ed.insertContent('<div class="new-canvas">' + html + '</div>');
    }

    showToast('Inserted ✓');
  }

  function insertHTML(html) {
    if (window.tinymce) {
      const ed = tinymce.activeEditor || (tinymce.editors && tinymce.editors[0]);
      if (ed) { doInsert(ed, html); return; }
    }
    for (const f of document.querySelectorAll('iframe')) {
      try {
        const tw = f.contentWindow;
        if (tw && tw.tinymce) {
          const ed = tw.tinymce.activeEditor || (tw.tinymce.editors && tw.tinymce.editors[0]);
          if (ed) { doInsert(ed, html); return; }
        }
      } catch (e) { /* cross-origin */ }
    }
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

  function applyFilter() {
    const q = (document.getElementById(ID + '-search').value || '').toLowerCase().trim();
    document.getElementById(ID + '-panel-components').querySelectorAll('.lxd-card').forEach(card => {
      const nameMatch = !q || card.dataset.name.includes(q);
      const catMatch = activeCat === 'All' || card.dataset.cat === activeCat;
      card.style.display = (nameMatch && catMatch) ? '' : 'none';
    });
    document.getElementById(ID + '-panel-snippets').querySelectorAll('.lxd-snippet').forEach(card => {
      card.style.display = !q || card.dataset.name.includes(q) ? '' : 'none';
    });
  }

  // ── Events ─────────────────────────────────────────────────────────────────
  document.getElementById(ID + '-close').addEventListener('click', () => {
    sidebar.remove(); toast.remove(); styleEl.remove();
    document.body.style.marginRight = '';
  });

  sidebar.querySelectorAll('.lxd-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      sidebar.querySelectorAll('.lxd-tab').forEach(t => t.classList.remove('active'));
      sidebar.querySelectorAll('.lxd-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(ID + '-panel-' + tab.dataset.tab).classList.add('active');
      const isComp = tab.dataset.tab === 'components';
      document.getElementById(ID + '-cat-filter').style.display = isComp ? '' : 'none';
      document.getElementById(ID + '-search-wrap').style.display =
        tab.dataset.tab === 'styleguide' ? 'none' : '';
    });
  });

  sidebar.querySelector('.lxd-cat-filter').addEventListener('click', e => {
    const btn = e.target.closest('.lxd-cat-btn');
    if (!btn) return;
    sidebar.querySelectorAll('.lxd-cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCat = btn.dataset.cat;
    applyFilter();
  });

  sidebar.addEventListener('click', e => {
    const btn = e.target.closest('.lxd-btn-insert, .lxd-btn-copy');
    if (!btn) return;
    const html = decodeURIComponent(btn.dataset.html);
    if (btn.classList.contains('lxd-btn-insert')) insertHTML(html);
    else copyHTML(html);
  });

  sidebar.addEventListener('click', e => {
    const swatch = e.target.closest('.lxd-swatch');
    if (!swatch) return;
    navigator.clipboard.writeText(swatch.dataset.hex)
      .then(() => showToast(swatch.dataset.hex + ' copied'));
  });

  document.getElementById(ID + '-search').addEventListener('input', applyFilter);

})();
