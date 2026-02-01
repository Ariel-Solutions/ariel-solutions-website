'use client'

import { useState, useEffect, useCallback, useMemo, FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Alert
} from 'react-bootstrap';

import {
  ChevronRight,
  Briefcase,
  BookOpen,
  ArrowUpRight,
  Linkedin,
  Github,
  Mail,
  AlertCircle,
  LucideIcon
} from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  link: string;
}

interface BlogPost {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  slug: string;
}

interface SocialLink {
  name: string;
  icon: LucideIcon;
  url: string;
  ariaLabel: string;
}

type CategoryType = 'All' | 'Web Development' | 'UI / UX' | 'Software';

const CATEGORIES: readonly CategoryType[] = ['All', 'Web Development', 'UI / UX', 'Software'] as const;
const SCROLL_THRESHOLD = 20;
const ANIMATION_DELAY = 50;

const PORTFOLIO_ITEMS: readonly PortfolioItem[] = [
  {
    id: 1,
    title: "Restaurant QR Menu",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1600147131759-880e94a6185f?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Creating all kind of QR-based digital menu systems for restaurants to improve customer experience and order management.",
    link: "/portfolio/restaurant-qr-menu"
  },
  {
    id: 2,
    title: "Website Design & Development",
    category: "UI / UX",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Custom website solutions for businesses to showcase services, manage content like blogs, and maintain an online presence easily.",
    link: "/portfolio/business-website-cms"
  },
  {
    id: 3,
    title: "Management Systems",
    category: "Software",
    image: "https://images.unsplash.com/photo-1728044849291-69f90d443aea?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Developing all kinds of management systems such as school management (classes, teachers, students, subjects, grades) and restaourant management (menu, tables, sessions) for efficient administration.",
    link: "/portfolio/custom-management-systems"
  }

] as const;

const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 1,
    date: "Oct 24, 2023",
    title: "Why Headless CMS is the Future of Web Content",
    excerpt: "Exploring the decoupled architecture that gives developers total creative freedom.",
    readTime: "5 min read",
    slug: "/blog/headless-cms-future"
  },
  {
    id: 2,
    date: "Nov 12, 2023",
    title: "Mastering Tailwind CSS for Rapid Prototyping",
    excerpt: "How utility-first CSS changed the way I build interfaces for Ariel Solutions.",
    readTime: "8 min read",
    slug: "/blog/mastering-tailwind"
  }
] as const;

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/company/arielsolutions',
    ariaLabel: 'Visit our LinkedIn profile'
  },
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/ariel-solutions',
    ariaLabel: 'Visit our GitHub repository'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:arielsolutions2026@gmail.com',
    ariaLabel: 'Send us an email'
  }
] as const;

const useScrollDetection = (threshold: number = SCROLL_THRESHOLD): boolean => {
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > threshold);
      }, ANIMATION_DELAY);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return scrolled;
};

const useClientSide = (): boolean => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

interface PortfolioCardProps {
  item: PortfolioItem;
}

interface BlogCardProps {
  post: BlogPost;
}

interface SocialLinkProps {
  social: SocialLink;
}

const PortfolioCard: FC<PortfolioCardProps> = ({ item }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleCardClick = useCallback((): void => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'portfolio_click', {
        item_title: item.title,
        item_category: item.category
      });
    }
  }, [item.title, item.category]);

  const handleImageError = useCallback((): void => {
    setImageError(true);
  }, []);

  return (
    <div className="portfolio-card" onClick={handleCardClick} role="article">
      <Link href={item.link} className="text-decoration-none">
        <div className="portfolio-img-wrapper mb-3 shadow-sm position-relative">
          {!imageError ? (
            <Image
              src={item.image}
              alt={`${item.title} project screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-fit-cover"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-light">
              <AlertCircle size={48} className="text-muted" />
            </div>
          )}
        </div>
        <Badge className="badge-red mb-2">{item.category}</Badge>
        <h4 className="fw-bold d-flex justify-content-between align-items-center text-blue-custom">
          {item.title}
          <ArrowUpRight size={18} aria-hidden="true" />
        </h4>
        <p className="text-dark small opacity-75">{item.description}</p>
      </Link>
    </div>
  );
};

const BlogCard: FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="blog-card">
      <div className="d-flex align-items-center gap-2 text-red-custom mb-3 small fw-bold">
        <time dateTime={post.date}>{post.date}</time>
        <span className="opacity-25 text-dark" aria-hidden="true">•</span>
        <span className="text-dark opacity-50">{post.readTime}</span>
      </div>
      <h3 className="fw-bold mb-3 h4 text-blue-custom">{post.title}</h3>
      <p className="text-dark opacity-75 mb-4">{post.excerpt}</p>
      <Link
        href={post.slug}
        className="p-0 text-red-custom fw-bold text-decoration-none d-inline-flex align-items-center gap-2"
      >
        Read Article <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
};

const SocialLink: FC<SocialLinkProps> = ({ social }) => {
  const Icon = social.icon;

  return (
    <a
      href={social.url}
      className="social-link"
      aria-label={social.ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon size={18} aria-hidden="true" />
    </a>
  );
};

// --- Main App Component ---
const App: FC = () => {
  const scrolled = useScrollDetection();
  const isClient = useClientSide();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [navExpanded, setNavExpanded] = useState<boolean>(false);

  // Filter portfolio items based on selected category
  const filteredPortfolio = useMemo<PortfolioItem[]>(() => {
    if (selectedCategory === 'All') return [...PORTFOLIO_ITEMS];
    return PORTFOLIO_ITEMS.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  // Handle smooth scroll to section
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLElement>, sectionId: string): void => {
    e.preventDefault();
    const element = document.getElementById(sectionId);

    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setNavExpanded(false);
    }
  }, []);

  const handleContactClick = useCallback((): void => {
    window.location.href = 'mailto:contact@arielsolutions.com';
  }, []);

  const handleCategoryChange = useCallback((category: CategoryType): void => {
    setSelectedCategory(category);
  }, []);

  const handleNavToggle = useCallback((): void => {
    setNavExpanded(prev => !prev);
  }, []);

  return (
    <div className='container'>
      <Navbar
        expand="lg"
        fixed="top"
        expanded={navExpanded}
        onToggle={handleNavToggle}
        className={`navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            href="/"
            style={{ color: '#dc2626', letterSpacing: '-1px' }}
            className=" fw-bold fs-1 text-gradient-next">
            Ariel Solutions
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation menu" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-lg-4">
              <Nav.Link
                href="#experience"
                className="fw-medium text-blue-custom"
                onClick={(e) => scrollToSection(e, 'experience')}>
                Experience
              </Nav.Link>
              <Nav.Link
                href="#blog"
                className="fw-medium text-blue-custom"
                onClick={(e) => scrollToSection(e, 'blog')}
              >
                Blog
              </Nav.Link>
              <Nav.Link
                href="#about"
                className="fw-medium text-blue-custom"
                onClick={(e) => scrollToSection(e, 'about')}
              >
                About
              </Nav.Link>
              <Button
                className="btn-primary-custom ms-lg-2"
                onClick={handleContactClick}
                aria-label="Contact us"
              >
                Contact Me
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="hero-section" role="banner">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: 1.1, color: '#000000' }}>
                Creating Digital <span className="text-gradient">Solutions</span> at <span className="text-gradient-next">Ariel</span>
              </h1>
              <p className="lead text-secondary mb-5">
                Building innovative digital experiences that transform businesses and delight users through cutting-edge technology and thoughtful design.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button
                  className="btn-primary-custom d-flex align-items-center gap-2"
                  onClick={(e) => scrollToSection(e, 'experience')}
                  aria-label="View our solutions"
                >
                  Solutions <ChevronRight size={18} aria-hidden="true" />
                </Button>
                <Button
                  className="btn-primary-custom px-4 py-3 border-2 fw-bold"
                  style={{ borderRadius: '12px', borderColor: '#2563eb' }}
                  onClick={(e) => scrollToSection(e, 'blog')}
                  aria-label="Read our blog"
                >
                  The Blog <ChevronRight size={18} aria-hidden="true" />
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="position-relative">
                <div
                  className="position-absolute w-100 h-100 rounded-5 opacity-25"
                  style={{
                    top: '-20px',
                    left: '-20px',
                    background: 'linear-gradient(45deg, #dc2626, #22c55e)',
                    filter: 'blur(60px)',
                    zIndex: 0
                  }}
                  aria-hidden="true"
                />
                <div className="position-relative" style={{ zIndex: 1 }}>
                  <Image
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
                    alt="Modern technology workspace with laptop and coding environment"
                    width={1200}
                    height={800}
                    className="img-fluid rounded-5 shadow-lg"
                    style={{ border: '4px solid #ffffff' }}
                    priority
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section id="experience" className="py-5 bg-white">
        <Container className="py-5">
          <Row className="mb-5 align-items-end">
            <Col md={8}>
              <h2 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: '#000000' }}>
                <Briefcase color="#22c55e" aria-hidden="true" /> Web Solutions
              </h2>
              <p className="text-secondary">
                Selected software and solutions that define the Ariel Solutions standard.
              </p>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <div
                className="btn-group p-1 bg-light rounded-pill"
                role="group"
                aria-label="Filter portfolio by category"
              >
                {CATEGORIES.map(cat => (
                  <Button
                    key={cat}
                    variant={cat === selectedCategory ? 'danger' : 'light'}
                    className={`rounded-pill px-4 btn-sm ${cat === selectedCategory ? '' : 'text-dark'}`}
                    style={cat === selectedCategory ? { backgroundColor: '#dc2626', border: 'none' } : {}}
                    onClick={() => handleCategoryChange(cat)}
                    aria-pressed={cat === selectedCategory}
                    aria-label={`Filter by ${cat}`}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
          <Row className="g-4">
            {filteredPortfolio.length > 0 ? (
              filteredPortfolio.map(item => (
                <Col md={6} lg={4} key={item.id}>
                  <PortfolioCard item={item} />
                </Col>
              ))
            ) : (
              <Col>
                <Alert variant="info">
                  No projects found in this category. Please select another category.
                </Alert>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <section id="blog" className="py-5 border-top border-bottom bg-white">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3 d-flex align-items-center justify-content-center gap-2" style={{ color: '#000000' }}>
              <BookOpen color="#dc2626" aria-hidden="true" /> Blog
            </h2>
            <p className="text-secondary">Thoughts on development, design, and digital solutions.</p>
          </div>
          <Row className="g-4">
            {BLOG_POSTS.map(post => (
              <Col md={6} key={post.id}>
                <BlogCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <footer className="py-5 bg-white border-top" role="contentinfo">
        <Container>
          <Row className="gy-4 align-items-center">
            <Col md={6}>
              <div className="fw-bold fs-4 mb-3" style={{ color: '#dc2626' }}>
                Ariel Solutions
              </div>
              <p className="text-dark small opacity-75" style={{ maxWidth: '300px' }}>
                Creating bespoke digital solutions for visionary brands. Let's build something exceptional together.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <nav aria-label="Social media links">
                <div className="d-flex gap-3 justify-content-md-end mb-3">
                  {SOCIAL_LINKS.map(social => (
                    <SocialLink key={social.name} social={social} />
                  ))}
                </div>
              </nav>
              <p className="small text-dark opacity-50">
                © {isClient ? new Date().getFullYear() : '2024'} Ariel Solutions. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default App;
