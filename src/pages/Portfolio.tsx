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
  X
} from "lucide-react";
import { toast } from "sonner";

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

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "Web Development",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "2",
    title: "AI Chat Application",
    description: "Real-time chat application powered by AI with natural language processing. Built with modern web technologies and WebSocket connections.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    technologies: ["React", "TypeScript", "OpenAI API", "Socket.io", "Express"],
    category: "AI/ML",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features. Built with React Native.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    category: "Mobile Development",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "4",
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for data visualization and analytics. Features real-time charts, filtering, and export capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    technologies: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
    category: "Data Science",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true
  },
  {
    id: "5",
    title: "Blockchain Voting System",
    description: "Decentralized voting platform built on Ethereum blockchain ensuring transparency and security in digital elections.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum", "IPFS"],
    category: "Blockchain",
    githubUrl: "https://github.com",
    featured: false
  },
  {
    id: "6",
    title: "Design System Library",
    description: "Comprehensive design system and component library for consistent UI/UX across multiple applications.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    technologies: ["React", "Storybook", "Figma", "TypeScript", "CSS-in-JS"],
    category: "Design",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false
  }
];

const skills: Skill[] = [
  { name: "React", level: 95, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "TypeScript", level: 90, category: "Frontend", icon: <Code className="w-5 h-5" /> },
  { name: "Node.js", level: 85, category: "Backend", icon: <Database className="w-5 h-5" /> },
  { name: "Python", level: 80, category: "Backend", icon: <Database className="w-5 h-5" /> },
  { name: "UI/UX Design", level: 75, category: "Design", icon: <Palette className="w-5 h-5" /> },
  { name: "MongoDB", level: 85, category: "Database", icon: <Database className="w-5 h-5" /> },
  { name: "AWS", level: 70, category: "Cloud", icon: <Globe className="w-5 h-5" /> },
  { name: "Docker", level: 75, category: "DevOps", icon: <Globe className="w-5 h-5" /> }
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

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
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

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! I'll get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 opacity-30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
          animate={{
            background: [
              "linear-gradient(45deg, #ff0080, #0080ff, #00ff80)",
              "linear-gradient(135deg, #00ff80, #ff0080, #0080ff)",
              "linear-gradient(225deg, #0080ff, #00ff80, #ff0080)",
              "linear-gradient(315deg, #ff0080, #0080ff, #00ff80)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

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
              className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent"
            >
              Portfolio
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["hero", "about", "projects", "skills", "contact"].map((section) => (
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
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 p-1"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-full h-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Alex Johnson
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Full-Stack Developer & UI/UX Designer crafting digital experiences that blend creativity with functionality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-8 py-3 rounded-full"
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
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/80 mb-8 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions 
                that make a difference. My journey began with a curiosity for how things work, which led me to 
                explore the intersection of design and technology.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Code className="w-12 h-12 text-pink-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Development</h3>
                  <p className="text-white/70">
                    Building scalable applications with modern technologies and best practices.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Palette className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
                  <p className="text-white/70">
                    Creating intuitive user experiences with attention to detail and aesthetics.
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <Globe className="w-12 h-12 text-blue-400 mb-4 mx-auto" />
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

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
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
                    className="absolute top-full mt-2 left-0 right-0 bg-black/80 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden"
                  >
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
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`group ${project.featured ? "lg:col-span-2" : ""}`}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-pink-500/80 text-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/30 text-white/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" className="bg-gradient-to-r from-pink-500 to-blue-500">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
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
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
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
                    className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white py-3"
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
                    <Mail className="w-6 h-6 text-pink-400 mr-4" />
                    <span className="text-white/80">alex.johnson@email.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-pink-400 mr-4" />
                    <span className="text-white/80">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-pink-400 mr-4" />
                    <span className="text-white/80">San Francisco, CA</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Follow Me</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
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
            © 2024 Alex Johnson. Built with React, TypeScript, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
}
