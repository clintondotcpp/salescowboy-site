# SalesCowboy Marketing Site

A modern marketing website built with Next.js, React, TypeScript, and Tailwind CSS, designed to deploy on Cloudflare Pages with D1 database support.

## Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Cloudflare Pages** - Hosting platform
- **Cloudflare D1** - SQLite database (optional)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Cloudflare account (for deployment)

### Installation

```bash
# Install dependencies
yarn install

# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# Build for production
yarn build

# Build for Cloudflare Pages
yarn build:cloudflare
```

## Cloudflare Pages Deployment

### Initial Setup

1. **Install Wrangler CLI** (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**:
   ```bash
   npx wrangler login
   ```

### Deploy to Cloudflare Pages

```bash
# Build static site
yarn build

# Deploy to Cloudflare Pages
yarn deploy
```

Or use Cloudflare Pages dashboard:
1. Connect your GitHub repository
2. Set build command: `yarn build`
3. Set output directory: `out`
4. Deploy!

**Custom Domain Setup:**
- Domain: **salescowboy.com.ng**
- Configure in Cloudflare Pages dashboard:
  1. Go to Pages > salescowboy-site > Custom domains
  2. Add `salescowboy.com.ng` and `www.salescowboy.com.ng`
  3. Follow DNS setup instructions

### D1 Database Setup ✅

**Database is already configured!** The D1 database is set up and ready to use.

**Architecture:**
- ✅ **Static Next.js frontend** (super fast, served from CDN)
- ✅ **Cloudflare Functions** (Workers) handle API requests
- ✅ **D1 Database** accessible via `DB` binding in Functions

**Available Scripts:**
```bash
yarn db:create          # Create a new D1 database
yarn db:migrate         # Run migrations on production DB
yarn db:migrate:local   # Run migrations on local DB
yarn db:query           # Query production database
yarn db:query:local     # Query local database
```

**Using D1 in Functions:**
- Functions in `functions/api/` automatically have access to `env.DB`
- See `functions/api/example.ts` for a complete example
- The database is already configured in `wrangler.toml`

### Contact Management Dashboard

The project includes a full contact management dashboard with authentication.

**Features:**
- ✅ Contact form submissions saved to D1 database
- ✅ Email notifications via MailChannels when contacts are submitted
- ✅ Protected dashboard at `/dashboard` for managing contacts
- ✅ Authentication system using Cloudflare Functions
- ✅ Status management (new, contacted, qualified, closed)
- ✅ Pagination and filtering

**Setting Up Admin User:**

1. Run the admin creation script:
   ```bash
   yarn admin:create
   ```

2. Follow the instructions to create your admin user in the database

3. Login at `/dashboard/login`

**See `SETUP_AUTH.md` for detailed setup instructions.**

### Local Development with Cloudflare

```bash
# Preview Cloudflare build locally
yarn preview
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes (can use D1)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── not-found.tsx      # 404 page
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui components
│   │   └── ...           # Custom components
│   ├── assets/           # Static assets (images, etc.)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   └── index.css         # Global styles
├── public/               # Public static files
├── next.config.ts        # Next.js configuration
├── wrangler.toml         # Cloudflare configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production (standard Next.js)
- `yarn build:cloudflare` - Build for Cloudflare Pages
- `yarn preview` - Preview Cloudflare build locally
- `yarn deploy` - Build and deploy to Cloudflare Pages
- `yarn lint` - Run ESLint

## Features

- ✅ Next.js App Router
- ✅ TypeScript support
- ✅ Tailwind CSS with custom theme
- ✅ shadcn/ui components
- ✅ Cloudflare Pages ready
- ✅ D1 database integration ready
- ✅ Optimized images with Next.js Image
- ✅ SEO optimized with metadata API

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add any environment variables here
```

For Cloudflare Pages, set environment variables in the Cloudflare dashboard or `wrangler.toml`.

## License

Private - SalesCowboy Marketing
# salescowboy-site
