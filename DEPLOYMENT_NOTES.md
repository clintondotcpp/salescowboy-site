# Cloudflare Pages Deployment Notes

## Current Setup: Static Export

The project is configured for **static export** to work around Windows compatibility issues with `@cloudflare/next-on-pages`. This means:

- ✅ Frontend works perfectly
- ✅ Builds without Windows-specific issues
- ❌ Next.js API routes don't work (they're not included in static export)

## Using D1 Database

Since we're using static export, **Next.js API routes won't work**. Instead, use **Cloudflare Functions** for server-side functionality.

### Option 1: Cloudflare Functions (Recommended)

1. Create functions in the `functions/` directory
2. Functions can access D1 database via the `env` parameter
3. Example: `functions/api/example.ts`

### Option 2: Use @cloudflare/next-on-pages (When Needed)

If you need Next.js API routes, you can switch back to using `@cloudflare/next-on-pages`, but you'll need to:

1. **Use WSL (Windows Subsystem for Linux)** - The tool works better on Linux
2. Or **run on a different OS** (Mac/Linux)

To switch back:
1. Remove `output: 'export'` from `next.config.ts`
2. Re-add `@cloudflare/next-on-pages` to devDependencies
3. Update build scripts

## Building and Deploying

```bash
# Build static site
yarn build

# Preview locally
yarn preview

# Deploy to Cloudflare Pages
yarn deploy
```

## Setting Up D1 Database

1. Create database:
   ```bash
   npx wrangler d1 create salescowboy-db
   ```

2. Update `wrangler.toml` with your database ID

3. Use in Cloudflare Functions:
   ```typescript
   export async function onRequest(context) {
     const db = context.env.DB;
     const result = await db.prepare('SELECT * FROM users').all();
     return new Response(JSON.stringify(result));
   }
   ```

