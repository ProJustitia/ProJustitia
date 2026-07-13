export const site = {
  name: "Firman Fitrah Ramadhan",
  title: "Developer & Designer",
  rotatingTitles: [
    "Web Developer",
    "Robotics Engineer",
    "Sleep Deprivation Enthusiast",
  ],
  tagline: "I craft digital experiences at the intersection of code, craft, and curiosity.",
  email: "firmanfitrahramadhan38@gmail.com",
  location: "Jakarta, Indonesia",
  availability: "Open to opportunities",
  social: {
    github: "https://github.com/ProJustitia",
    linkedin: "https://www.linkedin.com/in/firman-fitrah-ramadhan/",
    instagram: "https://www.instagram.com/firmanftrah?igsh=ZTE5M255bGF5Njdw",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    headline: "Building things that feel inevitable.",
    paragraphs: [
      "I'm a developer who cares about the details — the micro-interactions, the typography, the way a page breathes. I believe good software should feel effortless, even when the engineering behind it isn't.",
    ],
    stats: [
      //  { value: "1", label: "Years experience" }, //for later use
      //  { value: "3", label: "Projects shipped" },
      //  { value: "∞", label: "Cups of coffee" },
    ],
  },
  projects: [
    {
      title: "OneFA Dashboard",
      description: "A centralized, real-time monitoring dashboard for Fulfillment and Assurance (FA) operations. Built with Laravel and Vue.js, it streamlines data visualization and accelerates feature releases through a fully automated Docker and Kubernetes (OKD) CI/CD pipeline..",
      tags: ["Laravel", "Vue.js"],
      year: "2025",
      featured: true,
    },
    {
      title: "Smart Digital Attendance System Based on Face Recognition and QR Code",
      description: "A multimodal attendance solution designed to eliminate fraud and manual data errors. It features real-time facial recognition for high security and QR code scanning for speed, operating entirely via standard webcams to reduce hardware costs..",
      tags: ["Flask", "JavaScript", "CSS"],
      year: "2025",
      href: "https://github.com/ProJustitia/Capstone-project",
      featured: true,
    },
  ],
  skills: [
    "Python",
    "React",
    "Vue.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "Astro",
    "Tailwind CSS",
    "Git",
    "Linux",
  ],
  experience: [
    {
      role: "Software Developer Intern",
      company: "PT Telkom Infrastruktur Indonesia",
      period: "Sept 2025 — Nov 2025",
      description: "Developed a centralized, real-time FA (Fulfillment, Assurance) Monitoring Dashboard to visualize operational data. The development process utilized Laravel (PHP), Vue.js, and PostgreSQL, ensuring optimal system performance for end-users within the Planning and Operations Directorate.",
    },
    {
      role: "Machine Learning Cohort Participant",
      company: "DBS Coding Camp",
      period: "Feb 2025 — Jul 2025",
      description: "Chosen as one of approximately 2,500 participants from a pool of over 63,000 applicants to study machine learning. The program also focuses on developing soft skills such as problem-solving, communication, and teamwork.",
    },
  ],
} as const;
