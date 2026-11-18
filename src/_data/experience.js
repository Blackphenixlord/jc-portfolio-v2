/* The four programs behind the work, in reading order. Text comes from the
   internship and testimonial pages on the old site. Each renders at
   /experience/<slug>/ and links to the next. */

export default [
  {
    slug: 'nasa-hunch',
    name: 'NASA HUNCH',
    long: 'Helping Engineers Utilize NASA Competition Hardware',
    years: '2025 – 2027',
    role: 'Team Lead on VITALS, Full-Stack Builder',
    tags: ['Houston finals', 'NASA', 'Full-Stack'],
    summary:
      'Built an inventory tracking system that advanced to NASA’s Houston finals. Now leading Team TETHER on VITALS, an offline AI medical diagnostic system.',
    sections: [
      {
        h: 'My role',
        p: [
          'I joined the NASA HUNCH program as a full-stack developer and systems collaborator. My focus was designing and building the software and hardware components of our Inventory Chain System, built to solve real logistics problems faced by NASA teams.',
        ],
      },
      {
        h: 'What I built',
        p: [
          'An end-to-end inventory tracking workflow combining a custom UI, structured data flow, RFID hardware integration and team collaboration tools. It tracks parts and materials across a workspace with real-time updates and minimal friction.',
        ],
      },
      {
        h: 'Houston finals',
        p: [
          'Our team advanced to the NASA HUNCH Houston finals, where we presented the Inventory Chain System directly to NASA representatives and engineers. The project took me to NASA in Houston twice.',
        ],
      },
      {
        h: 'Now building: VITALS',
        p: [
          'This year I’m back as team lead. Team TETHER is competing in the Software & Technology challenge with VITALS, a medical diagnostic system for crews far from Earth. I build the engine: a local language model that reasons through symptoms, grounded by a medical knowledge base, built to run offline on an NVIDIA Jetson.',
        ],
      },
      {
        h: 'What I learned',
        p: [
          'NASA HUNCH taught me that engineering is a team sport. I grew as a communicator, learning to explain technical decisions to people who aren’t technical, and as a developer who writes code real people depend on. Presenting at the finals showed me I can perform under pressure and defend my design choices with confidence. Shipping something real, even if it isn’t perfect, builds more skill than any assignment.',
        ],
      },
    ],
    projects: ['vitals', 'inventory-chain-system'],
    photos: [
      { src: 'nasa', alt: 'NASA HUNCH project' },
      { src: 'nasa3', alt: 'NASA HUNCH team with a NASA representative' },
      { src: 'nasa7', alt: 'NASA HUNCH experience' },
      { src: 'nasa13', alt: 'NASA HUNCH experience' },
      { src: 'nasa10', alt: 'NASA HUNCH experience' },
      { src: 'nasa8', alt: 'NASA HUNCH experience' },
    ],
    doc: {
      label: 'Final Design Report (PDF)',
      href: '/files/NASAHUNCHFDR2026JoshCollado.pdf',
      note: 'The Final Design Report submitted to NASA for the 2026 HUNCH competition: system architecture, hardware integration, software design and team documentation.',
    },
  },
  {
    slug: 'utrgv',
    name: 'UTRGV',
    long: 'University of Texas Rio Grande Valley, dual enrollment and externship',
    years: '2025 – Present',
    role: 'Dual Enrollment Student & Externship Software Lead',
    tags: ['Dual Enrollment', 'Computer Science', 'Externship', 'Los Alamos'],
    summary:
      'Dual enrollment in engineering and computer science through the Science Academy, an externship building the software for an AI-supervised 3D printer, the lab infrastructure for a UTRGV cybersecurity camp, and the internship that took me to Los Alamos.',
    sections: [
      {
        h: 'Dual enrollment',
        p: [
          'Through the Science Academy I take university-level engineering and computer science courses at UTRGV while still in high school: college classes in the morning, high school in the afternoon. I’m earning college credit in real university classes alongside my diploma.',
          'The courses span engineering fundamentals, programming, systems design and applied computer science, and I use them directly in my internships and projects.',
        ],
      },
      {
        h: 'Externship: VLA-enabled 3D printing',
        p: [
          'Through a UTRGV externship I’m leading the software side of a large-format, Voron-based 3D printer with a camera and an ML supervisor. The system watches every layer, compares it against the G-code, flags defects as they form and decides how to respond. I wrote the software plan and I’m building it in phases, starting on a small test printer before moving to the Voron.',
        ],
      },
      {
        h: 'Cybersecurity camp lab',
        p: [
          'I’m building the lab infrastructure for a UTRGV cybersecurity camp: virtual machines and Docker containers so campers can run real terminal commands safely.',
        ],
      },
      {
        h: 'Los Alamos National Laboratory',
        p: [
          'Through a UTRGV internship that partnered with Los Alamos National Laboratory, I worked on a VR training experience and got to operate in a real research environment. I had to move fast, adapt to technical feedback and focus on building something useful, not just impressive. That pushed me to communicate better, solve problems under pressure and trust my skills at a higher level.',
        ],
      },
      {
        h: 'What I learned',
        p: [
          'Dual enrollment pushed me to work at a college level while still in high school, and I found out I could handle it. Sitting next to students years older taught me to advocate for myself, ask better questions and own my learning. The visit to Los Alamos was a turning point: it made career paths that felt abstract feel real and close. I came back knowing what kind of engineer I want to be.',
        ],
      },
    ],
    projects: ['vr-training-experience', 'vla-3d-printing', 'cyber-camp-lab'],
    photos: [
      { src: 'STUDENTBYSTUDENT', alt: 'Joshua holding a Student by Student certificate' },
      { src: 'STUDENTBYSTUDENT2', alt: 'UTRGV Science Academy students' },
      { src: 'lanl4', alt: 'Los Alamos National Laboratory visit' },
    ],
  },
  {
    slug: 'recon',
    name: 'RECON Technologies',
    long: 'Web developer on a civic digital platform',
    years: '2026 – 2027',
    role: 'Web Developer: Code Lead, Security Developer & Design Assistant',
    tags: ['Team Lead', 'Security', 'Remote'],
    summary:
      'Built a secure digital platform for the City of Progresso, giving the public access to city information, services and records.',
    sections: [
      {
        h: 'My role',
        p: [
          'I had three overlapping roles on the development team: code lead, security developer and design assistant. I drove the engineering decisions, made sure the platform met security standards for public-facing civic infrastructure, and contributed to the visual and UX direction.',
        ],
      },
      {
        h: 'Secure public infrastructure',
        p: [
          'As security developer I implemented best-practice security for a government-facing platform, so public data, form submissions and records access were handled safely. That included secure routing, input validation and hardened deployment configurations.',
        ],
      },
      {
        h: 'In my words',
        p: [
          'I worked remotely to help build a city website for Progresso and focused on code quality, security and usability. I got real experience working like a professional developer: collaborating with a distributed team, solving practical problems and making sure features were reliable for real users. It taught me how much clean execution and responsibility matter when software affects a whole community.',
        ],
      },
    ],
    projects: ['progresso-civic-platform'],
    photos: [],
  },
  {
    slug: 'nerdvana',
    name: 'Nerdvana',
    long: 'Nerdvana Educational Center: STEM education and community impact',
    years: '2024 – 2025',
    role: 'STEM Educator & Tech Developer',
    tags: ['STEM', 'Community', 'Education'],
    summary:
      'Co-created an interactive STEM sandbox for elementary students, bringing hands-on coding and engineering to the classroom.',
    sections: [
      {
        h: 'My role',
        p: [
          'At Nerdvana I wore two hats: educator and builder. I worked directly with elementary school students to introduce them to coding, engineering thinking and problem-solving, and I developed the digital tools and interactive content used in those sessions. My focus was making the sandbox and its software.',
        ],
      },
      {
        h: 'Interactive STEM sandbox',
        p: [
          'I co-developed a level sandbox environment with the CEO, along with a curriculum and digital materials that made engineering and computer science approachable for elementary students. It mixed hands-on activities with software-based exploration.',
        ],
      },
      {
        h: 'Community-level change',
        p: [
          'The work reached students in South Texas who otherwise had little exposure to STEM careers and technology. We met kids where they were and made learning fun. The goal was to plant seeds for the next generation of engineers and developers from our community.',
        ],
      },
      {
        h: 'What I learned',
        p: [
          'Teaching is the fastest way to find the gaps in your own knowledge. Every lesson forced me to break coding logic, robotics mechanics and hardware wiring down into something a 10-year-old could grasp, and that sharpened my own understanding more than any textbook. I also found out I really like mentoring: watching a student’s face light up when something clicks is one of the best things I’ve had in tech.',
          'It also made me better at building educational tools, and showed me how software can make learning more interactive and accessible.',
        ],
      },
    ],
    projects: [],
    photos: [
      { src: 'nerdvana', alt: 'The Nerdvana STEM sandbox, a sand table lit with a projected topographic map' },
      { src: 'nerdvana-certificate', alt: 'Nerdvana Internship Certificate of Completion, Joshua Collado, 2025–2026', caption: 'Certificate of Completion, Nerdvana Internship, 2025–2026' },
    ],
  },
];
