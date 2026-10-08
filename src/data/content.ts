import type { PlanetSlug } from "./planets";

export const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Beyond", id: "beyond" },
  { label: "Contact", id: "contact" },
];

export const HERO = {
  welcome: "Welcome to my portfolio",
  name: ["Remas ", "Alsulami"],
  role: "Full-Stack Software Engineer",
  desc: "The important thing is not to stop questioning.",
  cta: { label: "Explore my work", href: "https://github.com/Rema230Al?tab=repositories" },
};

export const ABOUT = {
  chapter: "Chapter-02",
  title: "About Me",
  desc: "I'm a Software Engineering student at the University of Jeddah, graduating in 2027. I enjoy building web applications from the ground up, working across both frontend and backend.Through projects involving OCR, real-time communication, and database-driven systems, I've gained hands-on experience turning ideas into working applications. I'm especially interested in backend development and understanding how different parts of a system come together",
  timeline: [
    { label: "Started My Study", year: "2023", subtitle: "Software Engineering" },
    { label: "Expected Graduation", year: "2027", subtitle: "Bachelor’s Degree — Class of 2027" },
  ],
};

export const SKILLS = {
  chapter: "Chapter-03",
  title: "Skills",
  desc: "Technologies and tools I work with to bring ideas to life",
  groups: [
    { title: "Development", items: ["HTML & CSS", "JavaScript", "Python", "Java"] },
    {
      title: "Technologies",
      items: ["Tesseract.js", "Node.js", "Express.js", "WebXR", "WebSockets", "REST APIs", "SQL & MongoDB"],
    },
    { title: "Workflow & Tools", items: ["VS Code", "Figma", "Git & GitHub", "Postman", "Agile & Scrum"] },
  ],
};

export type ProjectItem = {
  id: string; // anchor, e.g. #medixa
  award?: string; // badge linking to Beyond the Code
  category: string;
  title: string;
  tags: string[];
  desc: string;
  github: string;
  website?: string;
  image: { src: string; width: number; height: number };
  planet: PlanetSlug;
};

export const PROJECTS = {
  chapter: "Chapter-04",
  title: "Projects",
  desc: "Some of the things I’ve built.",
  items: [
    {
      id: "medixa",
      award: "Best Project Award",
      category: "Full Stack / Healthcare",
      title: "Medixa Platform",
      tags: ["HTML · CSS · JS", "Node.js", "Tesseract.js (OCR)", "MySQL", "NodeMailer", "Postman", "WebSockets"],
      desc: "A full-stack healthcare web platform that helps users detect dangerous drug interactions instantly. Users can scan their medications using OCR instead of typing them manually, view a clear interaction table, and connect directly with a pharmacist through real-time chat powered by WebSockets. The platform also sends automated email notifications using NodeMailer.",
      github: "https://github.com/Rema230Al/Medixa",
      website: "https://medixa.onrender.com/",
      image: { src: "/assets/Project2.webp", width: 939, height: 652 },
      planet: "neptune",
    },
    {
      id: "receiptvault",
      category: "Full Stack",
      title: "ReceiptVault",
      tags: ["HTML · CSS · JS", "Node.js", "Express", "JWT auth", "Tesseract.js (OCR)", "MongoDB", "Postman"],
      desc: "ReceiptVault — a full-stack web app that lets users scan receipts, automatically extract key details (store, date, total) using OCR, and manage them in a personal digital archive.",
      github: "https://github.com/Rema230Al/galleria-art",
      website: "https://receiptvault-7iwg.onrender.com/",
      image: { src: "/assets/mockP3.webp", width: 941, height: 673 },
      planet: "mars",
    },
    {
      id: "atelier",
      category: "WebXR / Augmented Reality",
      title: "Atelier",
      tags: ["HTML · CSS · JS", "Node.js", "Express", "MongoDB", "NodeMailer", "WebXR", "REST API", "Postman"],
      desc: "A full-stack web platform connecting artists and buyers, enabling users to browse, purchase, and request custom artwork. Features include user authentication, a personal wishlist, and a commission system with server-side email handling using NodeMailer — along with a WebAR feature that lets buyers visualize artworks in their real space before purchasing",
      github: "https://github.com/Rema230Al/Atelier",
      image: { src: "/assets/Atelier.webp", width: 1080, height: 695 },
      planet: "saturn",
    },
  ] satisfies ProjectItem[],
};

type Link = { label: string; href: string };
type Media = { src: string; width: number; height: number; alt: string; caption?: string; link?: Link };

export type BeyondItem = {
  label: string;
  title: string;
  text: string;
  link?: Link;
  stats?: string[];
  thumb?: Media; // small, opens in a lightbox
  shots?: Media[]; // shown side by side
};

export const BEYOND = {
  chapter: "Chapter-05",
  title: "Beyond the Code",
  items: [
    {
      label: "Award · May 2026",
      title: "Best Project Award — Medixa",
      text: "Our team's healthcare platform, built for our web development course, received the Best Project certificate from the Department Chair.",
      link: { label: "View project ↑", href: "#medixa" },
      thumb: { src: "/assets/medixa-certificate.webp", width: 1170, height: 843, alt: "Best Project certificate for Medixa" },
    },
    {
      label: "Leadership · 2026–2027",
      title: "Programming Track Co-Leader — Tuwaiq Club, UJ",
      text: "I work with the track lead to plan activities around what our members actually want to learn. To understand them better, I built an interactive survey instead of a standard form, and all 29 members responded. I later adapted it for the 3D Printing Track with its own theme.",
      stats: ["29/29 responded", "2 tracks"],
      shots: [
        {
          src: "/assets/survey-programming.webp",
          width: 1200,
          height: 641,
          alt: "Programming Track survey screenshot",
          caption: "Programming Track",
          link: { label: "Try the survey ↗", href: "https://6c643436.tuwaiq-init.pages.dev/" },
        },
        {
          src: "/assets/survey-3d.webp",
          width: 1200,
          height: 637,
          alt: "3D Printing Track survey screenshot",
          caption: "3D Printing Track",
          link: { label: "Try the survey ↗", href: "https://preview.tuwaiq-3d-track.pages.dev/" },
        },
      ],
    },
  ] satisfies BeyondItem[],
};

export const CONTACT = {
  chapter: "Chapter-06",
  title: "Let's build something",
  desc: "Have a project, opportunity, or idea? I'd love to hear about it",
  links: [
    {
      label: "Email",
      value: "remasalsulami962@gmail.com",
      sub: "Response within 24 hrs",
      href: "mailto:remasalsulami962@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.remas-alsulami",
      href: "https://www.linkedin.com/in/remas-alsulami-859569380/",
    },
    { label: "GitHub", value: "github.remas-alsulami", href: "https://github.com/Rema230Al" },
    {
      label: "Resume",
      value: "Available as PDF",
      sub: "Download →",
      href: "/assets/Remas_Nafea_Alsulami_CV.pdf",
    },
  ],
};

export const FOOTER = "© 2026 Remas Nafea Alsulami";
