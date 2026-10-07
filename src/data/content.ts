import type { PlanetSlug } from "./planets";

export const NAV_LINKS = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const HERO = {
  welcome: "Welcome to my portfolio",
  name: ["Remas Nafea", "Alsulami"],
  role: "Full-Stack Software Engineer",
  desc: "The important thing is not to stop questioning.",
  cta: { label: "Explore my work", href: "https://github.com/Rema230Al?tab=repositories" },
};

export const ABOUT = {
  chapter: "Chapter-02",
  title: "About Me",
  desc: "I'm a Software Engineering student (2023–2027) who builds full-stack products end to end — from backend logic to the interfaces people actually touch. I've shipped three full-stack projects spanning healthcare, OCR, and real-time systems, each one teaching me something different about how the pieces actually fit together under real use. I care less about how a project looks in a demo, and more about whether it holds up when someone depends on it.",
  timeline: [
    { label: "Started My Study", year: "2023", subtitle: "Computer Science & Software Engineering" },
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
  category: string;
  title: string;
  tags: string[];
  desc: string;
  github: string;
  website?: string;
  image: string;
  planet: PlanetSlug;
};

export const PROJECTS = {
  chapter: "Chapter-04",
  title: "Projects",
  desc: "Some of the things I’ve built.",
  items: [
    {
      category: "Full Stack / Healthcare",
      title: "Medixa Platform",
      tags: ["HTML · CSS · JS", "Node.js", "Tesseract.js (OCR)", "MySQL", "NodeMailer", "Postman", "WebSockets"],
      desc: "A full-stack healthcare web platform that helps users detect dangerous drug interactions instantly. Users can scan their medications using OCR instead of typing them manually, view a clear interaction table, and connect directly with a pharmacist through real-time chat powered by WebSockets. The platform also sends automated email notifications using NodeMailer.",
      github: "https://github.com/Rema230Al/Medixa",
      website: "https://medixa.onrender.com/",
      image: "/assets/Project2.png",
      planet: "neptune",
    },
    {
      category: "Full Stack",
      title: "ReceiptVault",
      tags: ["HTML · CSS · JS", "Node.js", "Express", "JWT auth", "Tesseract.js (OCR)", "MongoDB", "Postman"],
      desc: "ReceiptVault — a full-stack web app that lets users scan receipts, automatically extract key details (store, date, total) using OCR, and manage them in a personal digital archive.",
      github: "https://github.com/Rema230Al/galleria-art",
      website: "https://receiptvault-7iwg.onrender.com/",
      image: "/assets/mockP3.png",
      planet: "mars",
    },
    {
      category: "WebXR / Augmented Reality",
      title: "Atelier",
      tags: ["HTML · CSS · JS", "Node.js", "Express", "MongoDB", "NodeMailer", "WebXR", "REST API", "Postman"],
      desc: "A full-stack web platform connecting artists and buyers, enabling users to browse, purchase, and request custom artwork. Features include user authentication, a personal wishlist, and a commission system with server-side email handling using NodeMailer — along with a WebAR feature that lets buyers visualize artworks in their real space before purchasing",
      github: "https://github.com/Rema230Al/Atelier",
      image: "/assets/Atelier.png",
      planet: "saturn",
    },
  ] satisfies ProjectItem[],
};

export const CONTACT = {
  chapter: "Chapter-05",
  title: "Contact",
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
