import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  GraduationCap,
  Award,
  Briefcase,
  ExternalLink,
  ChevronUp,
  Moon,
  Sun,
  Menu,
  X,
  User,
  Send,
  Database,
  Globe,
  Server,
  Cpu,
  Layers,
  FileCode,
  Settings,
  Star,
  BookOpen,
  Target,
  Sparkles,
  Home,
  FolderOpen,
  Phone,
} from 'lucide-react';

// Theme Context
const ThemeContext = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-20 right-4 z-50 p-3 rounded-full glass-card hover:scale-110 transition-transform"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-primary-600" />}
      </button>
      {children}
    </div>
  );
};

// Floating Particles Background
const ParticlesBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 10 + 5,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

// Navigation
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'glass-card py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-2xl font-display font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            DK
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-dark-700 dark:text-dark-300"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-30 glass-card p-4 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-dark-700 dark:text-dark-300 hover:bg-primary-500/10 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Scroll Progress Bar
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (window.scrollY / totalHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-dark-200 dark:bg-dark-800 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Building Modern Web Applications and AI-Powered Solutions";
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        setIsTypingDone(true);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-dark-50 to-secondary-500/20 dark:from-primary-950/40 dark:via-dark-950 dark:to-dark-900" />

      {/* Floating Shapes */}
      <div className="floating-shape w-72 h-72 bg-primary-500/20 top-20 -left-20" />
      <div className="floating-shape w-96 h-96 bg-secondary-500/20 bottom-20 -right-20" style={{ animationDelay: '3s' }} />
      <div className="floating-shape w-64 h-64 bg-accent-500/20 top-1/2 left-1/3" style={{ animationDelay: '5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-1 rounded-full bg-dark-50 dark:bg-dark-950 overflow-hidden">
                <img
                  src="/WhatsApp_Image_2026-06-22_at_5.47.38_PM copy copy copy.jpeg"
                  alt="Dhanesh Kambala"
                  className="w-full h-full object-cover object-top rounded-full"
                />
              </div>

              {/* Floating Icons */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 p-3 glass-card rounded-xl"
              >
                <Code2 className="w-6 h-6 text-primary-500" />
              </motion.div>
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 p-3 glass-card rounded-xl"
              >
                <Sparkles className="w-6 h-6 text-secondary-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-dark-600 dark:text-dark-400 mb-6">
                <GraduationCap className="inline w-4 h-4 mr-2" />
                B.Tech CSE Student
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
            >
              Hi, I'm{' '}
              <span className="gradient-text">Dhanesh Kambala</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-6"
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-dark-600 dark:text-dark-400 max-w-2xl mb-4 min-h-[60px]"
            >
              {displayText}
              {!isTypingDone && <span className="animate-pulse">|</span>}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base text-dark-500 dark:text-dark-400 max-w-2xl mb-8"
            >
              Passionate Full Stack Developer and Computer Science Engineering student with expertise in web development, problem solving, and modern technologies. I enjoy creating innovative software solutions and continuously improving my technical skills.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                View Projects
              </button>
              <a
                href="/Dhanesh_Kambala_Resume.docx"
                download
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 rounded-xl font-semibold bg-accent-500 text-white hover:bg-accent-600 transition-all hover:scale-105"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: 'https://github.com/dhaneshdilip18-cloud', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/dhanesh-kambala-3b4987418', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:dhaneshdilip18@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="p-4 glass-card hover:bg-primary-500/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 text-dark-600 dark:text-dark-400" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            Get to know me better and my journey in tech
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              I am a Computer Science Engineering student at Miracle Educational Society Group of Institutions
              with a passion for Full Stack Development and Artificial Intelligence. I enjoy developing
              user-friendly applications, solving real-world problems, and learning emerging technologies.
            </p>
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              My goal is to become a highly skilled software engineer capable of building impactful digital
              products that make a difference in people's lives.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Target, label: 'Problem Solver', color: 'text-primary-500' },
                { icon: Code2, label: 'Clean Coder', color: 'text-secondary-500' },
                { icon: Sparkles, label: 'Innovator', color: 'text-accent-500' },
                { icon: BookOpen, label: 'Quick Learner', color: 'text-green-500' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 p-4 glass-card"
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: '3+', label: 'Years Learning', icon: GraduationCap },
              { number: '5+', label: 'Technologies', icon: Code2 },
              { number: '3+', label: 'Projects Built', icon: Briefcase },
              { number: '100%', label: 'Dedication', icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="sticky-note sticky-yellow text-dark-800"
              >
                <stat.icon className="w-8 h-8 mb-3 text-dark-700" />
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm font-medium text-dark-700">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Education Timeline Section
const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const educationData = [
    {
      degree: 'B.Tech - Computer Science Engineering',
      institution: 'Miracle Educational Society Group of Institutions',
      period: '2024 - Present',
      description: 'Pursuing Bachelor of Technology in Computer Science Engineering with focus on Full Stack Development and AI.',
      icon: GraduationCap,
      color: 'from-primary-500 to-primary-600',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Sri Gayatri Junior College',
      period: '2022 - 2024',
      description: 'Completed higher secondary education with Mathematics, Physics, and Chemistry as core subjects.',
      icon: BookOpen,
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      degree: 'SSC',
      institution: 'Sri Vivekananda Vidya Nikethan',
      period: 'Completed',
      description: 'Completed Secondary Education with excellent academic performance.',
      icon: Award,
      color: 'from-accent-500 to-accent-600',
    },
  ];

  return (
    <section id="education" className="py-20 relative bg-dark-100/50 dark:bg-dark-900/50" ref={ref}>
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            My academic journey and qualifications
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-accent-500 transform md:-translate-x-1/2" />

          {educationData.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className={`relative pl-12 md:pl-0 mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-2 md:left-1/2 top-0 w-5 h-5 rounded-full border-4 border-white dark:border-dark-900 bg-primary-500 shadow-lg shadow-primary-500/50 transform md:-translate-x-1/2 z-10" />

              <div className={`glass-card p-6 card-3d ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} text-white`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{item.period}</span>
                </div>
                <h3 className="text-xl font-bold mt-3 text-dark-800 dark:text-dark-200">{item.degree}</h3>
                <p className="text-dark-600 dark:text-dark-400 font-medium mt-1">{item.institution}</p>
                <p className="text-sm text-dark-500 dark:text-dark-500 mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({});

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Globe,
      color: 'from-primary-500 to-primary-600',
      skills: [
        { name: 'HTML5', level: 90 },
        { name: 'CSS3', level: 85 },
        { name: 'JavaScript', level: 80 },
        { name: 'React.js', level: 75 },
        { name: 'Tailwind CSS', level: 80 },
      ],
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-secondary-500 to-secondary-600',
      skills: [
        { name: 'Node.js', level: 70 },
        { name: 'Express.js', level: 65 },
      ],
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-accent-500 to-accent-600',
      skills: [
        { name: 'MongoDB', level: 70 },
        { name: 'MySQL', level: 65 },
      ],
    },
    {
      title: 'Languages',
      icon: FileCode,
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Python', level: 80 },
        { name: 'Java', level: 70 },
        { name: 'C', level: 65 },
      ],
    },
    {
      title: 'Tools',
      icon: Settings,
      color: 'from-pink-500 to-pink-600',
      skills: [
        { name: 'Git', level: 80 },
        { name: 'GitHub', level: 85 },
        { name: 'VS Code', level: 90 },
        { name: 'Postman', level: 75 },
      ],
    },
  ];

  useEffect(() => {
    if (isInView) {
      skillCategories.forEach((category) => {
        category.skills.forEach((skill) => {
          setTimeout(() => {
            setAnimatedSkills((prev) => ({ ...prev, [skill.name]: skill.level }));
          }, 200);
        });
      });
    }
  }, [isInView]);

  return (
    <section id="skills" className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies and tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 card-3d"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-dark-800 dark:text-dark-200">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-dark-700 dark:text-dark-300">{skill.name}</span>
                      <span className="text-sm text-dark-500 dark:text-dark-500">{animatedSkills[skill.name] || 0}%</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${animatedSkills[skill.name] || 0}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'AI-Based Text Summarization System',
      description: 'Developed an intelligent text summarization application that automatically generates concise summaries from lengthy articles, documents, and textual content using Natural Language Processing techniques.',
      features: [
        'Automatic text summarization',
        'NLP-based content analysis',
        'User-friendly interface',
        'Fast summary generation',
        'Accurate extraction of key information',
        'Large document support',
      ],
      technologies: ['Python', 'NLP', 'NLTK', 'Flask', 'HTML', 'CSS', 'JavaScript'],
      outcome: 'Reduced reading time by generating concise summaries while maintaining the important context and information from the original text.',
      category: 'ai',
      highlight: true,
      github: 'https://github.com/dhaneshdilip18-cloud',
      demo: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'Personal portfolio showcasing skills, projects, achievements, and professional experience with modern UI/UX design.',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion'],
      category: 'web',
      github: 'https://github.com/dhaneshdilip18-cloud',
      demo: '#',
    },
    {
      title: 'Student Management System',
      description: 'System for managing student records, attendance, and academic information efficiently with database integration.',
      technologies: ['Python', 'MySQL'],
      category: 'software',
      github: 'https://github.com/dhaneshdilip18-cloud',
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'web', label: 'Web Development' },
    { id: 'software', label: 'Software' },
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 relative bg-dark-100/50 dark:bg-dark-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Some of my recent work and achievements
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === item.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'glass-card text-dark-600 dark:text-dark-400 hover:bg-primary-500/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`glass-card overflow-hidden group ${
                  project.highlight ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-primary-600 dark:text-primary-400 opacity-50" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-800 dark:text-dark-200 mb-2">{project.title}</h3>
                  <p className="text-dark-600 dark:text-dark-400 mb-4">{project.description}</p>

                  {project.features && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-dark-700 dark:text-dark-300 mb-2">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400">
                            <Sparkles className="w-3 h-3 text-secondary-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.outcome && (
                    <p className="text-sm text-dark-500 dark:text-dark-500 mb-4 italic">"{project.outcome}"</p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-800 dark:bg-dark-700 text-white hover:bg-dark-700 dark:hover:bg-dark-600 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const certifications = [
    { title: 'Python Programming Certification', icon: FileCode, color: 'sticky-yellow' },
    { title: 'Full Stack Development Certification', icon: Layers, color: 'sticky-blue' },
    { title: 'Web Development Certification', icon: Globe, color: 'sticky-pink' },
    { title: 'Database Management Systems Certification', icon: Database, color: 'sticky-green' },
  ];

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Professional certifications and achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className={`sticky-note ${cert.color} text-dark-800`}
            >
              <cert.icon className="w-10 h-10 mb-4 text-dark-700" />
              <h3 className="font-bold text-dark-800">{cert.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Section
const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const achievements = [
    { title: 'Academic Learning', description: 'Consistent academic growth and learning', icon: BookOpen },
    { title: 'Project Development', description: 'Successfully built multiple projects', icon: Briefcase },
    { title: 'Coding Practice', description: 'Regular competitive programming practice', icon: Code2 },
    { title: 'Technical Skill Growth', description: 'Continuous skill improvement', icon: Cpu },
    { title: 'Problem Solving', description: 'Strong analytical and problem-solving abilities', icon: Target },
  ];

  return (
    <section className="py-20 relative bg-dark-100/50 dark:bg-dark-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Milestones and accomplishments in my journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card p-6 text-center card-3d"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-dark-800 dark:text-dark-200 mb-2">{achievement.title}</h3>
              <p className="text-sm text-dark-600 dark:text-dark-400">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Resume Section
const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="resume" className="py-20 relative" ref={ref}>
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 text-center relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <FileCode className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-dark-800 dark:text-dark-200">
              Download My Resume
            </h2>

            <p className="text-lg text-dark-600 dark:text-dark-400 mb-8 max-w-xl mx-auto">
              View my qualifications, projects, technical skills, and achievements in a comprehensive document.
            </p>

            <motion.a
              href="/Dhanesh_Kambala_Resume.docx"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 relative bg-dark-100/50 dark:bg-dark-900/50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Let's connect and discuss opportunities
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mt-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-dark-800 dark:text-dark-200">Contact Information</h3>

              <div className="space-y-4">
                <a
                  href="mailto:dhaneshdilip18@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-500/10 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500 transition-colors">
                    <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500 dark:text-dark-500">Email</p>
                    <p className="font-medium text-dark-800 dark:text-dark-200">dhaneshdilip18@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://github.com/dhaneshdilip18-cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-500/10 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500 transition-colors">
                    <Github className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500 dark:text-dark-500">GitHub</p>
                    <p className="font-medium text-dark-800 dark:text-dark-200">dhaneshdilip18-cloud</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/dhanesh-kambala-3b4987418"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary-500/10 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500 transition-colors">
                    <Linkedin className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-500 dark:text-dark-500">LinkedIn</p>
                    <p className="font-medium text-dark-800 dark:text-dark-200">Dhanesh Kambala</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-dark-800 dark:text-dark-200">Send a Message</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-800 dark:text-dark-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-800 dark:text-dark-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-dark-800 dark:text-dark-200"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-dark-100 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all resize-none text-dark-800 dark:text-dark-200"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl transition-all disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : submitted ? (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="relative py-12 bg-dark-900 dark:bg-dark-950 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">Dhanesh Kambala</h3>
            <p className="text-dark-400 mb-4">Full Stack Developer</p>
            <p className="text-sm text-dark-500">Building innovative web applications and AI-powered solutions.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-dark-400 hover:text-primary-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: 'https://github.com/dhaneshdilip18-cloud' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/dhanesh-kambala-3b4987418' },
                { icon: Mail, href: 'mailto:dhaneshdilip18@gmail.com' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-dark-800 hover:bg-primary-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} Dhanesh Kambala. All rights reserved.
          </p>
          <p className="text-sm text-dark-500">
            Built with React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600 transition-colors z-40"
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

// Main App
function App() {
  return (
    <ThemeContext>
      <div className="relative min-h-screen">
        <ScrollProgress />
        <ParticlesBackground />
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificationsSection />
          <AchievementsSection />
          <ResumeSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeContext>
  );
}

export default App;
