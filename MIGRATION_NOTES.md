# Migration Notes: Vite to Next.js + Cloudflare Pages

This document summarizes the changes made to convert the project from Vite + React Router to Next.js with Cloudflare Pages support.

## Key Changes

### Project Structure
- ✅ Created `app/` directory with Next.js App Router structure
- ✅ Moved pages to `app/page.tsx` and `app/not-found.tsx`
- ✅ Created `app/layout.tsx` for root layout
- ✅ Created `app/providers.tsx` for client-side providers (React Query)
- ✅ Created `app/api/example/route.ts` as example API route with D1 database

### Configuration Files
- ✅ Updated `package.json`:
  - Removed Vite and React Router dependencies
  - Added Next.js 15 and Cloudflare dependencies
  - Updated build scripts for Cloudflare Pages
- ✅ Created `next.config.ts` for Next.js configuration
- ✅ Updated `tsconfig.json` for Next.js
- ✅ Updated `.gitignore` for Next.js and Cloudflare files
- ✅ Created `wrangler.toml` for Cloudflare Pages configuration
- ✅ Updated ESLint config for Next.js
- ✅ Created `.eslintrc.json` for Next.js ESLint

### Components
- ✅ Added `"use client"` directives to components using hooks:
  - `Header.tsx` - uses useState and useEffect
  - `Contact.tsx` - uses useState
- ✅ Updated image imports to use Next.js Image component:
  - `Header.tsx` - uses Next.js Image
  - `Footer.tsx` - uses Next.js Image
  - `About.tsx` - uses Next.js Image
- ✅ Updated background images to use public folder paths:
  - `Hero.tsx` - background image from `/assets/hero-bg.jpg`
  - `CTABanner.tsx` - background image from `/assets/sunset-cta.jpg`

### Assets
- ✅ Copied assets from `src/assets/` to `public/assets/` for Next.js static file serving

### Removed Files
- ❌ Deleted `vite.config.ts`
- ❌ Deleted `src/vite-env.d.ts`
- ❌ Deleted `index.html`
- ❌ Deleted `src/main.tsx`
- ❌ Deleted `src/App.tsx`
- ❌ Deleted `src/pages/Index.tsx`
- ❌ Deleted `src/pages/NotFound.tsx`
- ❌ Deleted `tsconfig.app.json`
- ❌ Deleted `tsconfig.node.json`

## Next Steps

1. **Install Dependencies**:
   ```bash
   yarn install
   ```

2. **Test Development Server**:
   ```bash
   yarn dev
   ```

3. **Build for Cloudflare**:
   ```bash
   yarn build:cloudflare
   ```

4. **Set Up D1 Database** (if needed):
   ```bash
   npx wrangler d1 create salescowboy-db
   ```
   Then update `wrangler.toml` with your database ID.

5. **Deploy to Cloudflare Pages**:
   ```bash
   yarn deploy
   ```

## Important Notes

- All components using client-side hooks (useState, useEffect, etc.) now have `"use client"` directives
- Images are served from the `public/` folder, not imported directly
- The app uses Next.js App Router, not Pages Router
- API routes can be created in `app/api/` directory
- D1 database binding will be available as `DB` in API routes when configured
- Tailwind config already includes both `app/` and `src/` directories

## Potential Issues to Watch

1. **Image Optimization**: Next.js Image component requires width/height. Check if all images have proper dimensions.
2. **Client Components**: Any component using browser APIs or hooks needs `"use client"` directive.
3. **API Routes**: When using D1, access via `request.env.DB` in API routes.
4. **Environment Variables**: Use `.env.local` for local development, set in Cloudflare dashboard for production.
