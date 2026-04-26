# Cloudflare Workers + D1 Database Setup

## Why We Can Use Workers + D1

**Good news!** You CAN use Cloudflare Workers + D1 database with this setup. We're using:
- **Static Next.js export** for the frontend (faster, no server-side rendering needed)
- **Cloudflare Functions** (which are Workers) for API endpoints that access D1

This is actually a great architecture because:
- ✅ Frontend is fully static (super fast)
- ✅ API endpoints run as Cloudflare Workers (edge computing)
- ✅ D1 database is accessible from Workers
- ✅ No Windows compatibility issues

## Setting Up D1 Database

### Step 1: Create the Database

```bash
yarn db:create
```

This will output something like:
```
✅ Successfully created DB 'salescowboy-db' in region WEUR
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via snapshots to R2.

[[d1_databases]]
binding = "DB"
database_name = "salescowboy-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Step 2: Update wrangler.toml

Copy the `database_id` from Step 1 and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "salescowboy-db"
database_id = "your-actual-database-id-here"
```

### Step 3: Run Database Migrations

```bash
# For production database
yarn db:migrate

# For local development/testing
yarn db:migrate:local
```

### Step 4: Test the Database

```bash
# Query production database
yarn db:query "SELECT * FROM contacts"

# Query local database
yarn db:query:local "SELECT * FROM contacts"
```

## Using D1 in Cloudflare Functions

Your functions are in `functions/api/example.ts`. They automatically have access to D1 via `env.DB`.

### Example: Reading from D1

```typescript
export async function onRequest(context: EventContext<Env, any, any>) {
  const { env } = context;
  
  // Query the database
  const result = await env.DB.prepare('SELECT * FROM contacts').all();
  
  return new Response(JSON.stringify(result.results));
}
```

### Example: Writing to D1

```typescript
export async function onRequest(context: EventContext<Env, any, any>) {
  const { request, env } = context;
  const body = await request.json();
  
  // Insert into database
  await env.DB.prepare(
    'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)'
  )
    .bind(body.name, body.email, body.message)
    .run();
  
  return new Response(JSON.stringify({ success: true }));
}
```

## API Routes Available

With this setup, your API will be available at:
- `https://your-site.pages.dev/api/example` (GET, POST)

The function automatically handles:
- GET requests: Returns all contacts
- POST requests: Creates a new contact
- CORS headers for cross-origin requests

## Local Development with D1

To test with a local D1 database:

```bash
# Start local dev server with D1
npx wrangler pages dev out --d1=DB=salescowboy-db
```

## Production Deployment

When you deploy to Cloudflare Pages:
1. The static site is served from `out/`
2. Functions in `functions/` automatically become Workers
3. D1 database binding is configured via `wrangler.toml`

## Alternative: Full Next.js with API Routes

If you want to use Next.js API routes (instead of Cloudflare Functions), you have options:

### Option A: Use OpenNext (Recommended)
```bash
yarn add -D @opennextjs/cloudflare
```

### Option B: Fix @cloudflare/next-on-pages Windows Issue
- Use WSL (Windows Subsystem for Linux)
- Or run on a different OS for builds

But for most use cases, **Cloudflare Functions work great** and are simpler!

