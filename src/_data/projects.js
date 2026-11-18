/* The work. Home, /work/, the Ctrl+K search, the sitemap and every
   /work/<slug>/ page render from this list.

   Sources (nothing here is made up):
   - projects.js, CONTENT.md and the internship pages in
     Blackphenixlord/blackphenixlord.github.io (master, Nov 18 2026)
   - the VITALS project page at jc-portfolio.codes/vitals/
   - Joshua's portfolio brief (Nov 18 2026)

   `sheet` numbers the five case studies (sheet 1 of 5 … 5 of 5).
   `slots` lists what is still missing; each renders as a marked box on the
   page and is collected in TODO.md so it can be filled in. */

const img = (src, alt, caption = '') => ({ src, alt, caption });

export default [
  {
    slug: 'vitals',
    sheet: 1,
    title: 'VITALS',
    subtitle: 'Offline medical diagnostic system',
    org: 'NASA HUNCH',
    team: 'Team TETHER',
    years: '2026 – 2027',
    role: 'Team lead and diagnostic engine developer',
    status: 'In progress',
    statusKind: 'progress',
    categories: ['ai', 'nasa', 'hardware'],
    stack: ['Llama 3.2 (3B)', 'Ollama', 'Knowledge base', 'Rules engine', 'NVIDIA Jetson Orin Nano'],
    summary:
      'An offline medical diagnostic assistant for crews far from Earth. A local language model does the reasoning, and a medical knowledge base grounds every answer.',
    outcome:
      'Leading Team TETHER through the 2026–27 NASA HUNCH Software & Technology challenge, with the engine, the public site and the review boards built.',
    case: {
      problem: [
        'A crew on the Moon can’t wait on a round trip to Houston every time someone feels wrong. Communication blackouts can last up to two weeks, so they need a diagnostic aid that runs on board with no connection to the ground.',
        'Symptom checkers built for Earth assume Earth. In deep space a stuffy nose on day 2 is fluid shift, not a cold, and joint pain after a spacewalk is decompression sickness until proven otherwise.',
      ],
      role: [
        'I’m the team lead, and I build the diagnostic engine. My teammates handle the medical research and rules, and the interface and user testing.',
      ],
      process: [
        'There’s no in-flight data to train on, so VITALS grounds a local model (Llama 3.2, 3B, served through Ollama) in 35 cited NASA spaceflight research pages instead. The model reads only those pages: it answers, and the knowledge base backs the answer.',
        'A deterministic rules engine sits after the model. It can always raise an alarm, and it makes sure no condition gets named unless it’s in the research. A “Wrong?” button lets the crew correct a misread.',
        'Sensor and camera inputs are left as open slots instead of being filled with plausible fake readings, so nothing in a demo pretends to be data it isn’t. The vitals, doctor notes and supplies tabs are in the app and marked planned.',
      ],
      steps: [
        ['Ask', 'Describe the symptoms in plain English.'],
        ['Scope', 'Is this a medical complaint or a plain reply?'],
        ['Read', 'Pull out the specific symptoms.'],
        ['Retrieve', 'Search the 35 cited spaceflight research pages.'],
        ['Reason', 'The local model reads only those pages.'],
        ['Check', 'The rules engine blocks invented conditions and can raise an alarm.'],
        ['Answer', 'Urgency first, then the likely condition and what to do.'],
      ],
      results: [
        ['35', 'spaceflight conditions covered'],
        ['262', 'automated tests passed'],
        ['18 / 19', 'must-escalate complaints'],
        ['6 / 6', 'basic missions passed'],
      ],
      outcome: [
        'The astronaut screen works today: one complaint in, urgency and next steps out, with the research it came from. Next on the hardware side is a Jetson Orin Nano server, Raspberry Pi displays, biometric sensors and voice input.',
        'The tri-fold board and brochure were printed for the Preliminary Design Review on October 21, 2026.',
        'VITALS is a student prototype for decision support. A doctor has the final say, and it is not a medical device.',
      ],
      learned: [],
    },
    photos: [
      img('vitals-astronaut-answer', 'VITALS astronaut screen showing an urgent alert, a likely diagnosis with its cited NASA sources, and next steps', 'The astronaut screen: one complaint in, urgency and next steps out, with the research it came from.'),
      img('vitals-login', 'VITALS login screen with a PIN field and a red emergency button', 'PIN login, with an emergency button that skips it.'),
      img('vitals-astronaut-vitals-planned', 'VITALS with the vitals tab open, each sensor marked as not connected', 'Vitals, doctor notes and supplies tabs are in the app, marked planned. No fake readings.'),
    ],
    links: [
      { label: 'VITALS project site', href: 'https://jc-portfolio.codes/vitals/' },
      { label: 'Source on GitHub', href: 'https://github.com/Blackphenixlord/lunar-medical-diagnostic' },
      { label: 'PDR brochure (PDF)', href: 'https://jc-portfolio.codes/vitals/downloads/VITALS-brochure.pdf' },
    ],
    internship: { href: '/experience/nasa-hunch/', label: 'NASA HUNCH' },
    slots: [
      { label: 'What I learned', note: 'A few lines in your words on what leading VITALS has taught you so far.' },
      { label: 'Competition result', note: 'Add the HUNCH result for 2026–27 once it’s announced.' },
    ],
  },
  {
    slug: 'inventory-chain-system',
    sheet: 2,
    title: 'Inventory Chain System',
    subtitle: 'Parts tracking for NASA HUNCH',
    org: 'NASA HUNCH',
    team: 'SciTech',
    years: '2025 – 2026',
    role: 'Full-stack builder and systems teammate',
    status: 'Houston finals',
    statusKind: 'done',
    categories: ['fullstack', 'nasa', 'hardware'],
    stack: ['Full-Stack', 'RFID hardware', 'Systems Design', 'NASA'],
    summary:
      'A full-stack inventory tracking workflow built for NASA’s Human Exploration & Operations division. It covers the UI, real-time data flow and multi-team collaboration.',
    outcome: 'Advanced to the Houston finals and presented directly to NASA representatives.',
    case: {
      problem: [
        'NASA teams have to keep track of parts and materials across a workspace. We built the system for that logistics problem: track parts with real-time updates and as little friction as possible.',
      ],
      role: [
        'I joined NASA HUNCH as a full-stack developer and systems collaborator, on a two-person team. I designed and built the software and hardware sides of the system. On the résumé that reads as hardware manager, stack developer and design assistant.',
      ],
      process: [
        'It’s an end-to-end tracking workflow: a custom UI, structured data flow, RFID hardware integration and tools for the team to work together.',
        'We presented to NASA representatives in Rounds 1 and 2, and the team was selected for the finals. The Final Design Report we submitted covers the system architecture, hardware integration, software design and team documentation.',
      ],
      steps: [
        ['Round 1', 'Presented to NASA representatives.'],
        ['Round 2', 'Presented again; the team was selected for finals.'],
        ['Final Design Report', 'Architecture, hardware integration, software design, team docs.'],
        ['Houston finals', 'Presented the system to NASA representatives and engineers.'],
      ],
      results: [
        ['Finals', 'NASA HUNCH, Houston'],
        ['2', 'trips to NASA in Houston'],
        ['2', 'presentation rounds before finals'],
      ],
      outcome: [
        'Our team advanced to the NASA HUNCH Houston finals, where we presented the Inventory Chain System directly to NASA representatives and engineers. It was a full-circle moment: build something real, then defend it in front of the people who inspired it.',
      ],
      learned: [
        'NASA HUNCH taught me that engineering is a team sport. I got better at explaining technical decisions to people who aren’t technical, and at writing code that real people depend on.',
        'Presenting at the finals showed me I can perform under pressure and defend my design choices. And shipping something real, even if it isn’t perfect, teaches more than any assignment.',
      ],
    },
    photos: [
      img('nasa2', 'Joshua with his teammate and a NASA representative in a blue flight suit at the HUNCH Houston finals', 'Houston finals'),
      img('nasa4', 'Presenting the Inventory Chain System at NASA HUNCH', 'Presenting the system'),
      img('nasa5', 'The NASA HUNCH build on display', ''),
      img('nasa6', 'The NASA HUNCH demo', ''),
    ],
    links: [
      { label: 'Final Design Report (PDF)', href: '/files/NASAHUNCHFDR2026JoshCollado.pdf' },
    ],
    internship: { href: '/experience/nasa-hunch/', label: 'NASA HUNCH' },
    slots: [
      { label: 'Tech stack', note: 'Which languages, frameworks, database and RFID hardware the system used.' },
      { label: 'A screenshot of the UI', note: 'One screen of the tracking interface, if you still have it.' },
    ],
  },
  {
    slug: 'vr-training-experience',
    sheet: 3,
    title: 'VR Training Experience',
    subtitle: 'With Los Alamos National Laboratory',
    org: 'Los Alamos National Laboratory',
    team: 'UTRGV',
    years: '2025 – 2026',
    role: 'XR developer and simulation collaborator',
    status: 'Delivered',
    statusKind: 'done',
    categories: ['vr', 'research'],
    stack: ['Unreal Engine', 'VR / XR', 'Simulation', 'Research'],
    summary:
      'A virtual reality training simulation for immersive, hands-on instruction in a research environment, built with scientists at one of the US government’s top national labs.',
    outcome: 'Earned an in-person visit to Los Alamos National Laboratory as the only student selected.',
    case: {
      problem: [
        'Through a UTRGV internship partnered with Los Alamos National Laboratory, I worked on a VR training simulation for immersive, hands-on instruction in a research environment.',
      ],
      role: [
        'I built it with a partner in Unreal Engine. On the résumé my role reads as project leader, stack developer and hardware manager.',
      ],
      process: [
        'I got to work in a real research environment. I had to move fast, adapt to technical feedback, and focus on building something useful, not just impressive.',
        'I gave a UTRGV research progress presentation for Los Alamos National Laboratory along the way.',
      ],
      steps: [],
      results: [
        ['1', 'student selected to visit the lab in New Mexico'],
      ],
      outcome: [
        'The experience was delivered, and I was the only student selected to visit the lab in New Mexico.',
      ],
      learned: [
        'It pushed me to communicate better, solve problems under pressure, and trust my skills at a higher level. The visit was a turning point: it made career paths that felt abstract feel real and close.',
      ],
    },
    photos: [
      img('lanl2', 'The Los Alamos National Laboratory sign on a lobby wall', 'Los Alamos National Laboratory'),
      img('lanl3', 'Joshua at the Bradbury Science Museum in Los Alamos', 'Bradbury Science Museum, Los Alamos'),
      img('lanl', 'UTRGV LANL program', ''),
    ],
    links: [],
    internship: { href: '/experience/utrgv/', label: 'UTRGV' },
    slots: [
      { label: 'What the training teaches', note: 'What a trainee actually practices in the headset (as much as you’re allowed to say).' },
      { label: 'A screenshot or clip', note: 'One in-headset frame of the experience, if it can be shared.' },
    ],
  },
  {
    slug: 'progresso-civic-platform',
    sheet: 4,
    title: 'City of Progresso',
    subtitle: 'Civic platform',
    org: 'RECON Technologies',
    team: 'Remote team',
    years: '2026 – 2027',
    role: 'Code Lead, Security Developer & Design Assistant',
    status: 'Shipped',
    statusKind: 'done',
    categories: ['web', 'security'],
    stack: ['Web Dev', 'Security', 'Civic Tech'],
    summary:
      'A secure digital platform giving Progresso residents one place for city information, public services and official records.',
    outcome:
      'Brought a small South Texas city into the digital era: modern, secure and publicly accessible.',
    case: {
      problem: [
        'Progresso is a small South Texas city. Residents needed one reliable place online for city information, public services and official records, and because it’s government-facing, it had to be secure.',
      ],
      role: [
        'At RECON Technologies I had three overlapping roles on the development team: code lead, security developer and design assistant. I drove the engineering decisions, made sure the platform met security standards for public-facing civic infrastructure, and helped with the visual and UX direction.',
        'I worked remotely, with a distributed team.',
      ],
      process: [
        'We built the site from the ground up as a team, from architecture and security hardening to front-end design and final deployment.',
        'As security developer I handled best-practice security for a government-facing platform: public data, form submissions and records access all had to be handled safely. That meant secure routing, input validation and hardened deployment configurations.',
      ],
      steps: [],
      results: [],
      outcome: [
        'Progresso residents now have a modern, reliable way into their local government online. For a small city, a professional and secure site helps civic engagement and makes public services easier to reach.',
      ],
      learned: [
        'RECON taught me what professional software development actually looks like: deadlines, client expectations, security requirements, and code that has to work the first time. Good engineers think about the people who will use what they build and the systems it lives inside.',
        'Handling real government-level access controls gave me a respect for security I couldn’t have gotten in a classroom. I left knowing I can contribute on a real engineering team.',
      ],
    },
    photos: [],
    links: [],
    internship: { href: '/experience/recon/', label: 'RECON Technologies' },
    slots: [
      { label: 'Link to the live site', note: 'The City of Progresso URL, if it’s public.' },
      { label: 'A screenshot', note: 'The home page or a services page.' },
    ],
  },
  {
    slug: 'hallpass',
    sheet: 5,
    title: 'Hall Pass',
    subtitle: 'Classroom passes and attendance',
    org: 'Veterans Memorial',
    years: '2026',
    role: 'Designer and developer',
    status: 'Approved by principal',
    statusKind: 'done',
    categories: ['fullstack', 'automation'],
    stack: ['Electron', 'React', 'TypeScript', 'SQLite'],
    summary:
      'A Windows desktop app for classroom hall passes, attendance and statistics. Students scan their school ID at a kiosk to sign out and back in; teachers get a PIN-protected dashboard. It all runs offline.',
    outcome: 'Pitched to the principal at Veterans Memorial and approved for use.',
    case: {
      problem: [
        'Hall passes, attendance and the stats behind them need to be tracked in a classroom, and the tool has to keep working with no internet.',
      ],
      role: [
        'Design and development were mine. I built it with Claude Code.',
      ],
      process: [
        'It’s an offline Windows desktop app built with Electron, React, TypeScript and SQLite. Students scan their school ID at a kiosk to sign out and back in. Teachers unlock a PIN-protected dashboard with attendance, pass logs, reports and analytics.',
      ],
      steps: [],
      results: [],
      outcome: [
        'I pitched it to the principal at Veterans Memorial, and it was approved for use.',
      ],
      learned: [],
    },
    photos: [],
    links: [],
    internship: null,
    slots: [
      { label: 'The problem, in your words', note: 'What was going wrong with hall passes before this app?' },
      { label: 'Screenshots', note: 'The kiosk screen and the teacher dashboard.' },
      { label: 'Repo link', note: 'github.com/Blackphenixlord/hallpass is private right now. Make it public to link it, or leave it unlinked.' },
      { label: 'What I learned', note: 'A few lines on pitching it to a principal.' },
    ],
  },

  /* Short entries: same fields, no case study yet. */
  {
    slug: 'vla-3d-printing',
    title: 'VLA-Enabled 3D Printing',
    org: 'UTRGV Externship',
    years: '2026 – 2027',
    role: 'Software lead, vision and control',
    status: 'In progress',
    statusKind: 'progress',
    categories: ['ai', 'hardware', 'research'],
    stack: ['Machine Vision', 'Vision-Language-Action', 'Voron 2.4', 'G-code'],
    summary:
      'A large-format, Voron-based 3D printer with a camera and an ML supervisor that watches each layer, compares it against the G-code, catches defects as they form and decides how to respond.',
    outcome:
      'Scoped the full software plan (control loop, defect responses, training data) and a phased build that proves itself on a small printer before moving to the Voron.',
    internship: { href: '/experience/utrgv/', label: 'UTRGV' },
  },
  {
    slug: 'cyber-camp-lab',
    title: 'Cybersecurity Camp Lab',
    org: 'UTRGV',
    years: '2026 – 2027',
    role: 'Infrastructure builder',
    status: 'In progress',
    statusKind: 'progress',
    categories: ['security', 'research'],
    stack: ['Cybersecurity', 'Linux', 'Virtual Machines', 'Docker'],
    summary:
      'The lab environment for a UTRGV cybersecurity camp: virtual machines and Docker containers that let campers run real terminal commands in a safe, hands-on setting.',
    outcome:
      'Building the infrastructure campers will use to practice real cybersecurity work instead of just reading about it.',
    internship: { href: '/experience/utrgv/', label: 'UTRGV' },
  },
  {
    slug: 'project-evie',
    title: 'Project Evie',
    org: 'Personal',
    years: '2026 – 2027',
    role: 'Product designer and AI systems developer',
    status: 'In progress',
    statusKind: 'progress',
    categories: ['ai', 'automation'],
    stack: ['AI', 'Android', 'Automation', 'Cross-Platform'],
    summary:
      'A personal AI assistant that bridges Android and Windows into one automation layer, controlling apps, routines and devices from a single interface.',
    outcome: 'Laying the foundation for a fully AI-powered home control and productivity system.',
    internship: null,
  },
  {
    slug: 'screen-deck',
    title: 'Screen Deck',
    org: 'Personal',
    years: '2026',
    role: 'Designer and developer',
    status: 'In progress',
    statusKind: 'progress',
    categories: ['automation'],
    stack: ['PowerShell', 'WPF', 'Windows', 'Touch UI'],
    summary:
      'A Stream Deck-style touch launcher for a spare touchscreen: tabbed button grids, per-app volume sliders, a soundboard, calendar, notes and live home-lab stats.',
    outcome: 'Runs every day on my desk as the control surface for my PC, games and home lab.',
    internship: null,
  },
];
