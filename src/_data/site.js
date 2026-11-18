/* Everything the pages share. Contact details are the ones already public
   on jc-portfolio.codes. `url` is where this build is served; `preview`
   keeps search engines off it until it replaces the live site. */
const preview = process.env.SITE_PREVIEW !== '0';

export default {
  url: process.env.SITE_URL || 'https://jc-portfolio.codes/jc-portfolio-v2',
  preview,
  name: 'Joshua Collado',
  formalName: 'Josue Collado',
  email: 'joshuacollado636@gmail.com',
  phone: '956-254-7815',
  location: 'South Texas',
  github: 'https://github.com/Blackphenixlord',
  githubLabel: 'github.com/Blackphenixlord',
  linkedin: 'https://linkedin.com/in/joshua-collado',
  linkedinLabel: 'linkedin.com/in/joshua-collado',
  liveSite: 'https://jc-portfolio.codes',
  themeColor: '#0B6E6E',
  buildYear: new Date().getFullYear(),

  /* Contact form. Fill ONE in and the form sends for real:
     - contactAccessKey: a Web3Forms access key (https://web3forms.com).
     - contactEndpoint: any service that accepts a form POST and answers JSON.
     Both empty: the form writes the message out on the page so the visitor
     can send it from their own mail app or copy it. */
  contactAccessKey: '',
  contactEndpoint: '',

  nav: [
    { key: 'work', label: 'Work', href: '/work/' },
    { key: 'experience', label: 'Experience', href: '/experience/' },
    { key: 'about', label: 'About', href: '/about/' },
    { key: 'resume', label: 'Résumé', href: '/resume/' },
    { key: 'contact', label: 'Contact', href: '/contact/' },
  ],

  categoryLabels: {
    web: 'Web',
    security: 'Security',
    fullstack: 'Full-Stack',
    nasa: 'NASA',
    hardware: 'Hardware',
    vr: 'VR / XR',
    research: 'Research',
    ai: 'AI',
    automation: 'Automation',
  },

  /* Hidden things. Listed in the footer so nobody has to guess. */
  eggs: [
    { how: 'Type “rick roll” in the Ctrl+K search', what: 'you asked for it' },
    { how: '↑ ↑ ↓ ↓ ← → ← → B A', what: 'blueprint mode' },
    { how: 'Click the JC logo five times', what: 'a stamp of approval' },
  ],
};
