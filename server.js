const express = require('express');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const dataDirectory = path.join(__dirname, 'data');
const messagesFile = path.join(dataDirectory, 'messages.json');
const projectsFile = path.join(dataDirectory, 'projects.json');
const publicDirectory = path.join(__dirname, 'public');

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.static(publicDirectory, { extensions: ['html'] }));

const profile = {
  name: 'Umaira Sadaf',
  title: 'Full-Stack Web Developer | AI-Focused Software Engineer | Computer Science Student',
  education: 'BS Computer Science — 6th Semester',
  institution: 'Government Graduate College, Vehari',
  cgpa: '3.84 / 4.00',
  email: 'sadaffarid069@gmail.com',
  professionalEmail: 'humerasadaf59@gmail.com',
  phone: '03176480080',
  location: 'Pakistan',
  portfolio: 'https://humerasadaf59-lab.github.io',
  github: 'https://github.com/humerasadaf59-lab',
  linkedin: 'https://www.linkedin.com/in/umaira-sadaf-163aaa2a9',
  objective: 'Computer Science student and full-stack web developer building practical software with modern JavaScript, React, Node.js, Python/Django and AI technologies. I combine hands-on product development with AI fluency, marketing research and machine-learning fundamentals to build useful, polished and deployable web experiences.',
  availability: 'Open to full-stack web development, software engineering, AI-enabled web applications and internship opportunities.',
  skills: [
    'JavaScript, React and Node.js',
    'HTML5, CSS3 and responsive UI',
    'Python and Django',
    'REST APIs and full-stack architecture',
    'Next.js, TypeScript and Tailwind CSS',
    'C++ / OOP / Data Structures',
    'AI Fluency, LLMs and prompt engineering',
    'Machine Learning fundamentals',
    'Git, GitHub and Vercel deployment',
    'AI Marketing, SEO and technical communication'
  ],
  services: [
    'Full-Stack Website Development',
    'Responsive Frontend Development',
    'Node.js / Express Backend APIs',
    'Python / Django Web Applications',
    'AI-Powered Web Applications',
    'AI Fluency and AI Marketing Support',
    'REST API Integration',
    'Programming and Automation Projects'
  ],
  experience: [
    {
      role: 'AI Marketing Intern',
      organization: 'FlyRank AI Internship Program',
      period: 'Jul 2026 – Present',
      details: [
        'Completing the General AI Fluency / AI Marketing track and applying LLM tools to research and content workflows.',
        'Working on AI-assisted marketing research, content evaluation and practical AI fluency exercises.',
        'Building machine-learning fundamentals for future AI and analytics use cases.',
        'Portfolio work includes the Research Scout Agent documentation and workflow.'
      ]
    },
    {
      role: 'Full Stack Web Development Intern',
      organization: 'CodeAlpha',
      period: 'Sep 2026 – Present',
      details: [
        'Building and deploying practical full-stack projects as part of the CodeAlpha internship portfolio.',
        'Delivered a real-time collaboration application and a social platform with hosted demos.',
        'Applied responsive UI, API integration, Git/GitHub workflows and cloud deployment practices.'
      ]
    },
    {
      role: 'Intern',
      organization: 'InternGrow.official',
      period: 'Aug 2026 – Present',
      details: [
        'Completed hands-on C++ development tasks including a banking engine, secure authentication system and automated semester CGPA planner.',
        'Applied object-oriented programming, data structures, validation and problem-solving to practical assignments.'
      ]
    },
    {
      role: 'Team Lead',
      organization: 'HACKTHONYPERU — Tecnología e Innovación',
      period: 'Aug 2026 – Present',
      details: [
        'Led a team building an urban heat island analysis tool using temperature data and the FortGuard Temperature API.',
        'Delivered a Streamlit-based demo and actionable recommendations for heat-vulnerable areas.'
      ]
    },
    {
      role: 'Hackathon Builder',
      organization: 'Independent / Hackathon Projects',
      period: '2026',
      details: [
        'Built ArchCoach, an AI mock system-design interviewer with voice interaction, architecture whiteboard workflows and structured feedback.',
        'Built RingGuard AI, an AI security command center that classifies simulated home-security events and creates daily insights.',
        'Built BijliGuard for Vehari to turn community outage reports into useful load-shedding intelligence and predictions.'
      ]
    }
  ],
  certifications: [
    'HP Certified — AI Business Professional (HP LIFE)',
    'Saylor Academy — Software Engineering Certificate',
    'Anthropic — Claude 101',
    'Anthropic — Claude Platform',
    'Anthropic — Claude Cowork',
    'Anthropic — Agent Skills',
    'Anthropic — Claude on Google Cloud'
  ]
};

function ensureDataFiles() {
  if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory, { recursive: true });
  if (!fs.existsSync(messagesFile)) fs.writeFileSync(messagesFile, '[]', 'utf8');
  if (!fs.existsSync(projectsFile)) fs.writeFileSync(projectsFile, '[]', 'utf8');
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

ensureDataFiles();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'umaira-sadaf-portfolio', timestamp: new Date().toISOString() });
});

app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.get('/api/projects', (req, res) => {
  const projects = readJson(projectsFile);
  res.json(projects);
});

app.get('/api/stats', (req, res) => {
  const projects = readJson(projectsFile);
  res.json({
    projects: projects.length,
    liveDemos: projects.filter(project => project.demo).length,
    githubProjects: projects.filter(project => project.github).length,
    internships: profile.experience.length,
    certifications: profile.certifications.length
  });
});

app.post('/api/contact', (req, res) => {
  const name = String(req.body.name || '').trim();
  const email = String(req.body.email || '').trim().toLowerCase();
  const message = String(req.body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email and message are required.' });
  }

  if (name.length > 80 || email.length > 160 || message.length > 3000) {
    return res.status(400).json({ success: false, message: 'Please keep your message within the allowed length.' });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  try {
    const messages = readJson(messagesFile);
    messages.push(record);
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf8');
    return res.status(201).json({ success: true, message: 'Thank you! Your message has been received.' });
  } catch (error) {
    console.error('Contact persistence unavailable:', error.message);
    return res.status(503).json({
      success: false,
      message: 'The form storage is unavailable on this deployment. Please use the email link instead.'
    });
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Umaira's portfolio is running at http://localhost:${PORT}`);
});
