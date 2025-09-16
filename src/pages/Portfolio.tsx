import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Github, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin,
  Twitter,
  Code,
  Palette,
  Database,
  Globe,
  ChevronDown,
  Filter,
  X,
  FileDown,
  Briefcase,
  Award
} from "lucide-react";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Particles from "@/components/Particles.tsx";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface Certification {
  title: string;
  issuer: string;
}

const profile = {
  name: "VEERACHINNU M",
  title: "AI & Data Science Student • COO & Technical Mentor",
  email: "veerachinnumanikandan1@gmail.com",
  phone: "+91 9159573303",
  location: "India",
  githubUrl: "https://github.com/Sri174",
  linkedinUrl: "https://www.linkedin.com/in/veerachinnu-manikandan-19a75826b/",
  twitterUrl: "https://twitter.com/",
  resumeUrl: "https://harmless-tapir-303.convex.cloud/api/storage/25d81795-4181-4a2d-801d-53676f028aa1",
  imageUrl: "https://ui-avatars.com/api/?name=VEERACHINNU+M&background=ff0080&color=ffffff&size=200"
};

const projects: Project[] = [
  {
    id: "p1",
    title: "Decentralized File Storage",
    description:
      "Blockchain-based decentralized file storage ensuring transparency and reliability for secure data access.",
    image:
      "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=800&h=500&fit=crop",
    technologies: ["Ethereum", "IPFS", "Web3.js", "React"],
    category: "Blockchain",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "p2",
    title: "Virtual AI Interior",
    description:
      "Web app that generates interior design ideas using generative AI with simple user prompts.",
    image:
      "https://i.pinimg.com/1200x/4c/46/ad/4c46adde0b8add716f5b20b4d315d0ac.jpg",
    technologies: ["Python", "FastAPI", "React", "OpenAI"],
    category: "AI/ML",
    githubUrl: "https://github.com/Sri174/Virtual_AI_Interior",
    liveUrl: "https://example.com",
    featured: false,
  },
  {
    id: "p3",
    title: "Z7i Website Frontend",
    description:
      "Responsive, user‑friendly frontend for Z7i website with modern web practices and accessibility.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://github.com",
    liveUrl: "https://z7i.in/",
    featured: false,
  },
  {
    id: "p4",
    title: "Futureself AI",
    description:
      "Inspires students by visualizing their future selves in dream professions using generative AI. Dual journeys (ages 5–10 and 11–17) with a personality quiz, camera/upload input, and a personalized, shareable result card.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/5a1fb435-76d6-4d84-bf09-3049c6347542",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Genkit", "Stable Diffusion XL"],
    category: "AI/ML",
    liveUrl: "https://mvafutureself.netlify.app/",
    featured: false,
  },
  {
    id: "p5",
    title: "Payroll Desktop App",
    description:
      "Payroll application built with Python (Tkinter) featuring employee management and report generation.",
    image:
      "https://images.unsplash.com/photo-1554224155-3a589877462f?w=800&h=500&fit=crop",
    technologies: ["Python", "Tkinter"],
    category: "Software",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "p6",
    title: "LMS Report Generator",
    description:
      "A complete report generation system for Learning Management Systems (LMS) that ingests Excel files, parses them into SQLite, applies business rules, and outputs payroll-ready analytics. Features include automated calculations, attendance summaries, detailed month-wise breakdowns, and CSV exports. Built with a Streamlit frontend for an intuitive experience.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/3c9bea19-6a57-4f75-aa2d-57b52406294f",
    technologies: [
      "Python",
      "Streamlit",
      "SQLite",
      "Pandas",
      "Openpyxl",
      "XlsxWriter"
    ],
    category: "Software",
    liveUrl: "https://lmsreportgenerator.streamlit.app/",
    featured: false,
  },
  {
    id: "p7",
    title: "Dreamscape Room Builder AI (Frontend)",
    description:
      "Interactive frontend for an AI-powered room builder that visualizes design variations and layouts.",
    image:
      "https://harmless-tapir-303.convex.cloud/api/storage/92725131-7d5b-4667-b5e1-0eb26de107ac",
    technologies: ["TypeScript", "React", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://github.com/Sri174/dreamscape-room-builder-ai",
    liveUrl: "https://dreamscape-room-builder-ai-rn7y.vercel.app/",
    featured: false,
  },
];

const skills: Skill[] = [
  { name: "Python", level: 85, category: "Backend", icon: <Code className="w-5 h-5" /> },
  { name: "React", level: 80, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "UI/UX Design", level: 75, category: "Design", icon: <Palette className="w-5 h-5" /> },
  { name: "Problem Solving", level: 85, category: "Core", icon: <Globe className="w-5 h-5" /> },
  { name: "Communication", level: 90, category: "Core", icon: <Globe className="w-5 h-5" /> },
  { name: "Frontend", level: 80, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "Debugging", level: 78, category: "Core", icon: <Database className="w-5 h-5" /> },
  { name: "Tableau", level: 65, category: "Data", icon: <Database className="w-5 h-5" /> },
  { name: "MS Office", level: 88, category: "Productivity", icon: <Globe className="w-5 h-5" /> },
  { name: "Management", level: 82, category: "Leadership", icon: <Globe className="w-5 h-5" /> },
];

const experiences: Experience[] = [
  {
    role: "Chief Operating Officer",
    company: "Skill Satron Technologies Pvt. Ltd.",
    period: "Jun 2025 – Present",
    description:
      "Co‑Founder leading operations and UI development; launched AI‑based products and drove delivery."
  },
  {
    role: "Technical Mentor",
    company: "Chronosphere, Burhanpur (Madhya Pradesh)",
    period: "Jul 2025 – Present",
    description:
      "Completed a 6‑month Technical Internship as Learning Management Engineer; optimized and supported LMS systems; also served as a Full‑Stack Development role intern contributing to frontend and backend web features."
  },
];

const certifications: Certification[] = [
  { title: "Generative AI", issuer: "Microsoft" },
  { title: "Oracle Cloud Infrastructure Foundations", issuer: "Oracle" },
  { title: "Data Analyst (RSDCA)", issuer: "RSDCA" },
  { title: "Prompt Design in Vertex AI (Badge)", issuer: "Google Cloud" },
  { title: "Journey to Cloud: Envisioning Your Solution", issuer: "IBM SkillBuild" },
  { title: "Career Essentials in Generative AI", issuer: "Microsoft & LinkedIn" },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [bgOffset, setBgOffset] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const xNorm = e.clientX / window.innerWidth - 0.5;
    const yNorm = e.clientY / window.innerHeight - 0.5;
    const x = Math.max(40, Math.min(60, 50 + xNorm * 8));
    const y = Math.max(40, Math.min(60, 50 + yNorm * 6));
    setBgOffset({ x, y });
  };

  const sendContact = useAction(api.contact_actions.sendEmailAndSave);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "experience", "projects", "resume", "skills", "certifications", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendContact({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      });
      toast.success("Message sent! I'll get back to you soon.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Robot background with parallax */}
      <div
        className="fixed inset-0 -z-20"
        style={{
          backgroundImage: 'url("https://i.pinimg.com/736x/c2/e7/5e/c2e75ef38ca2482ca20ba70fc5d8b236.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${bgOffset.x}% ${bgOffset.y}%`,
        }}
      />

      {/* Animated Background Mesh - Enhanced AI Theme */}
      <div className="fixed inset-0">
        {/* Animated gradient base */}
        <motion.div
          className="absolute inset-0 opacity-45"
          animate={{
            background: [
              "linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899)",
              "linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)",
              "linear-gradient(225deg, #67e8f9, #818cf8, #fb7185)",
              "linear-gradient(315deg, #06b6d4, #8b5cf6, #ec4899)",
            ],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
        {/* Soft blur for glass-morphism depth */}
        <div className="absolute inset-0 backdrop-blur-3xl" />

        {/* Subtle neon grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px, 60px 60px",
            backgroundPosition: "0 0, 0 0",
          }}
        />

        {/* Radial neural glow hotspots */}
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            backgroundImage:
              "radial-gradient(600px 300px at 10% 20%, rgba(34,211,238,0.25), transparent 60%), radial-gradient(500px 250px at 80% 30%, rgba(168,85,247,0.25), transparent 60%), radial-gradient(700px 350px at 30% 80%, rgba(236,72,153,0.22), transparent 60%)",
          }}
        />
      </div>

      {/* AI Particles layers */}
      <Particles className="opacity-25" density={0.05} color="180, 220, 255" linkDistance={110} maxSpeed={0.22} />
      <Particles className="opacity-2 0" density={0.035} color="236, 72, 153" linkDistance={100} maxSpeed={0.18} />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["hero", "about", "experience", "projects", "resume", "skills", "certifications", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-pink-400"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-[85vh] flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 p-1"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <img
                  src={profile.imageUrl}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              {profile.name}
            </h1>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              <Badge className="bg-cyan-500/20 text-cyan-200 border-cyan-400/30">AI & Data Science</Badge>
              <Badge className="bg-indigo-500/20 text-indigo-200 border-indigo-400/30">Full‑Stack</Badge>
              <Badge className="bg-pink-500/20 text-pink-200 border-pink-400/30">Design</Badge>
            </div>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              {profile.title}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white px-8 py-3 rounded-full"
              >
                View My Work
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full"
              >
                Get In Touch
              </Button>
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                </a>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                Motivated AI & Data Science student with leadership experience as
                Co‑Founder & COO at a startup and Technical Mentor. Passionate about
                building usable products, debugging, and collaborating to ship quality
                software. Eager to apply AI and full‑stack skills to real‑world projects.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Code className="w-12 h-12 text-cyan-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Development</h3>
                  <p className="text-white/70">
                    Building scalable applications with modern technologies and best practices.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Palette className="w-12 h-12 text-sky-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
                  <p className="text-white/70">
                    Creating intuitive user experiences with attention to detail and aesthetics.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Globe className="w-12 h-12 text-indigo-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-white/70">
                    Staying ahead of trends and implementing cutting-edge solutions.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Work Experience
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Roles I've held and what I worked on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role + exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                      <p className="text-white/70">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-sm text-white/60">{exp.period}</span>
                </div>
                <p className="text-white/80 mt-4">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              A showcase of my recent work spanning web development, mobile apps, and innovative digital solutions.
            </p>
            
            {/* Filter Controls */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-6"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedCategory}
                  {isFilterOpen ? <X className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                </Button>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-56 bg-black/80 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden shadow-lg"
                  >
                    <div className="max-h-64 overflow-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors ${
                            selectedCategory === category ? "bg-white/20 text-pink-400" : "text-white"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden h-full flex flex-col">
                  {/* Image with slightly taller uniform aspect ratio */}
                  <div className="relative aspect-[16/12] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-cyan-500/80 text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/30 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    {/* Actions pinned to bottom for consistent height */}
                    <div className="flex gap-2 mt-auto pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Resume
            </h2>
            <p className="text-lg text-white/80">
              Browse highlights and download the full resume.
            </p>
          </motion.div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="basis-full">
                    <motion.img
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      src="https://harmless-tapir-303.convex.cloud/api/storage/25d81795-4181-4a2d-801d-53676f028aa1"
                      alt="Resume page 1"
                      className="w-full rounded-lg object-contain max-h-[70vh]"
                    />
                  </CarouselItem>
                  <CarouselItem className="basis-full">
                    <motion.img
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      src="https://harmless-tapir-303.convex.cloud/api/storage/0fb2810a-a7a7-462e-85e5-4e46021a4510"
                      alt="Resume page 2"
                      className="w-full rounded-lg object-contain max-h-[70vh]"
                    />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            <div className="flex justify-center mt-6">
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-6 rounded-full"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              A comprehensive toolkit of technologies and skills I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <div className="text-pink-400 mr-3">{skill.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-white/70 mb-1">
                    <span>{skill.category}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="pt-12 pb-6 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Certifications
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Recognitions and courses I've completed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c, idx) => (
              <motion.div
                key={c.title + c.issuer}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -6, rotate: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_0_1px_rgba(34,197,235,0.25)]"
              >
                {/* subtle gradient glow */}
                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/25 to-indigo-500/25 blur-2xl" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{c.title}</h3>
                      <p className="text-xs text-white/60">Awarded</p>
                    </div>
                  </div>

                  <Badge variant="outline" className="border-white/30 text-white/80">
                    {c.issuer}
                  </Badge>
                </div>

                {/* animated accent underline */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-6 pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div>
                    <Input
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white py-3"
                  >
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-cyan-400 mr-4" />
                    <span className="text-white/80">{profile.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-6 h-6 text-white" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}