# TechSolve - Technology Solutions Website

> **AI, automation, and modern software systems built to scale businesses efficiently.**

TechSolve is a modern, high-performance website built with Next.js that showcases comprehensive technology solutions and services. It features service portfolios, team showcases, blog resources, and a robust contact system with Contentful CMS integration.

## 🚀 Features

- **Service Showcase** - Display and manage multiple technology services with detailed descriptions
- **Team Directory** - Beautiful team member profiles with dynamic routing
- **Blog System** - Content management through Contentful with rich text support
- **Contact Form** - Email-integrated contact system with rate limiting and validation
- **Responsive Design** - Mobile-first approach using Bootstrap 5 for consistent UI
- **SEO Optimized** - Meta tags, schema markup, and automatic sitemap generation
- **Interactive Components** - Swiper carousels for banners, services, and galleries
- **CMS Integration** - Contentful headless CMS for dynamic content management
- **Geo-targeting** - IP-based geolocation for analytics and personalization
- **Analytics** - Vercel Analytics integration for performance monitoring

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.2.4](https://nextjs.org) - React server components & SSR
- **Language**: [TypeScript 5](https://www.typescriptlang.org) - Type-safe development
- **Styling**: [Bootstrap 5](https://getbootstrap.com) - Responsive CSS framework
- **CMS**: [Contentful](https://www.contentful.com) - Headless content management
- **UI Components**: 
  - [Swiper](https://swiperjs.com) - Modern carousel/slider library
  - [React 19](https://react.dev) - Latest React features
- **Email**: [Nodemailer](https://nodemailer.com) - Email delivery
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring
- **Code Quality**: [ESLint 9](https://eslint.org) + [Biome](https://biomejs.dev) - Linting & formatting
- **SEO**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap) - Automatic sitemap generation

## 📋 Prerequisites

- Node.js 18+ (or npm/yarn/pnpm/bun)
- Contentful account with space and API credentials
- Gmail account with app password for contact emails

## 🏃 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd ariel-solutions-website
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the project root:

```env
# Contentful CMS Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Email Configuration (Gmail App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your_app_password_here
```

For email setup, follow [Gmail App Passwords Guide](https://support.google.com/accounts/answer/185833).

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The site auto-refreshes as you edit files.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Home page with dynamic content
│   │   ├── api/
│   │   │   └── contact/            # Contact form API endpoint
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation component
│   │   │   ├── Footer.tsx          # Footer component
│   │   │   ├── SchemaMarkup.tsx    # SEO schema markup
│   │   │   └── swipers/            # Carousel components
│   │   ├── data/
│   │   │   └── data.ts             # Static site configuration
│   │   ├── lib/
│   │   │   ├── contentful/         # Contentful CMS clients & utilities
│   │   │   ├── geoip.ts            # Geolocation service
│   │   │   ├── ratelimit.ts        # Rate limiting for APIs
│   │   │   └── bootstrap/          # Client-side initialization
│   │   ├── pages/
│   │   │   ├── services/           # Services listing & details
│   │   │   ├── blogs/              # Blog listing & articles
│   │   │   ├── contact/            # Contact page
│   │   │   ├── people/             # Team member profiles
│   │   │   └── privacy-policy/     # Privacy policy
│   │   └── types/                  # TypeScript type definitions
│   └── ...
├── public/
│   ├── robots.txt                  # SEO robots configuration
│   └── sitemap*.xml                # Auto-generated sitemaps
├── next.config.ts                  # Next.js configuration
├── biome.json                       # Code formatting & linting
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies & scripts
```

## 📜 Available Scripts

| Command | Description |
|---------|------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Production build with optimization |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run postbuild` | Auto-generate sitemaps (runs after build) |

## 🔧 Configuration Files

- **next.config.ts** - Image optimization and remote domain settings
- **tsconfig.json** - TypeScript compiler options
- **biome.json** - Code formatting and linting rules
- **next-sitemap.config.js** - SEO sitemap configuration

## 🌐 Key Pages & Routes

| Route | Description |
|-------|------------|
| `/` | Home page with banners, featured blogs, about, and team |
| `/services` | Services portfolio and listing |
| `/services/[slug]` | Individual service detail page |
| `/blogs` | Blog article listing |
| `/blogs/[slug]` | Individual blog article |
| `/people/[slug]` | Team member profile |
| `/contact` | Contact form with email integration |
| `/privacy-policy` | Privacy policy page |

## 📝 Contentful Content Types

The site uses Contentful for managing:
- **Services** - Technology services with descriptions and galleries
- **Blogs** - Articles with rich text formatting and metadata
- **Banners** - Homepage hero banners and promotions
- **About Us** - Company information and mission
- **Team Members** - Staff profiles with bios and images

## 🔐 API Routes

### `POST /api/contact`

Handles contact form submissions with:
- **Rate limiting** to prevent spam
- **Email validation** and sanitization
- **Automatic email delivery** via Gmail SMTP
- **Error handling** with user-friendly responses

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```

## 🚀 Deployment

### Deploy on Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard before deployment.

### Manual Deployment

Build the application:
```bash
npm run build
npm start
```

Deploy the `.next` folder and `public` directory to your server.

## 📊 Performance & SEO

- **Auto-generated Sitemaps** - Helps search engines discover all pages
- **Schema Markup** - Structured data for rich search results
- **Image Optimization** - Automatic WebP conversion and lazy loading
- **Vercel Analytics** - Real-world performance metrics
- **Responsive Design** - Mobile-friendly across all devices

## 🐛 Troubleshooting

### Issue: "Cannot find Contentful credentials"
- Verify `.env.local` has `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`
- Restart dev server after updating env variables

### Issue: "Email not sending"
- Ensure Gmail App Password is correctly set in `EMAIL_PASS`
- Enable "Less secure app access" if using regular Gmail password
- Check spam folder for test emails

### Issue: "Swiper components not initializing"
- Verify Bootstrap and Swiper are properly imported in layout
- Check browser console for JavaScript errors

## 📖 Documentation Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Contentful CMS Guide](https://www.contentful.com/developers/documentation/)
- [Bootstrap 5 Components](https://getbootstrap.com/docs/5.0/components/)
- [Swiper Documentation](https://swiperjs.com/react)

## 📄 License

See [LICENSE](LICENSE) file for details.

## 👥 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📞 Support

For questions or issues, please reach out through the contact form at `/contact` or open an issue in the repository.

---

**Built with ❤️ by TechSolve Team**
