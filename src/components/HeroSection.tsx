import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Typewriter from '@/components/Typewriter';
import { ChevronDown } from 'lucide-react';
import ResumePreview from './ResumePreview';
import '../styles/hero-animations.css';

interface HeroSectionProps {
  profile: {
    name: string;
    title: string;
    imageUrl: string;
    resumeUrl?: string;
  };
  company: {
    name: string;
    url: string;
  };
  onViewWork: () => void;
  onContact: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  company,
  onViewWork,
  onContact,
}) => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#14FFEC]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[#43E97B]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-[#38F9D7]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="hero-content"
        >
          {/* Profile Image */}
          <motion.div
            className="profile-image-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              delay: 0.2,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            whileHover={{ 
              scale: 1.05,
              rotate: [0, -5, 5, -5, 0],
              transition: { duration: 0.5 }
            }}
          >
            <motion.img
              src={profile.imageUrl}
              alt="Profile"
              className="profile-image"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.name}
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div 
            className="h-16 flex items-center justify-center my-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typewriter 
              words={['FULL STACK DEVELOPER', 'AI ENTHUSIAST', 'TECHNICAL MENTOR']} 
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
              loop={true}
            />
          </motion.div>

          {/* Badges */}
          <motion.div 
            className="flex flex-wrap gap-2 justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge className="skill-badge bg-[#14FFEC]/20 text-[#14FFEC] border-[#14FFEC]/30">
              AI & Data Science
            </Badge>
            <Badge className="skill-badge bg-[#43E97B]/20 text-[#43E97B] border-[#43E97B]/30">
              Full‑Stack
            </Badge>
            <Badge className="skill-badge bg-[#38F9D7]/20 text-[#38F9D7] border-[#38F9D7]/30">
              Design
            </Badge>
            <motion.a 
              href={company.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="skill-badge bg-white/10 border-white/20 text-white hover:bg-white/20">
                COO @ {company.name}
              </Badge>
            </motion.a>
          </motion.div>

          {/* Title */}
          <motion.p 
            className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {profile.title}
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onViewWork}
                className="hero-button primary px-8 py-6 text-lg"
              >
                View My Work
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onContact}
                variant="outline"
                className="hero-button outline px-8 py-6 text-lg"
              >
                Get In Touch
              </Button>
            </motion.div>
            
            {profile.resumeUrl && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ResumePreview 
                  page1="/resume/page1.jpg" 
                  page2="/resume/page2.jpg" 
                  resumeUrl={profile.resumeUrl} 
                  className="w-full"
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <ChevronDown className="w-8 h-8 text-white/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
