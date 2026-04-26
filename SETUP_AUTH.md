# Authentication & Dashboard Setup Guide

## Creating an Admin User

Since we're using a custom authentication system (compatible with Cloudflare Workers), you need to create an admin user in the D1 database.

### Step 1: Hash Your Password

You'll need to hash your password. For now, we're using SHA-256. In production, you should use bcrypt.

You can hash a password using Node.js:

```javascript
const crypto = require('crypto');
const password = 'your-secure-password';
const hash = crypto.createHash('sha256').update(password).digest('hex');
console.log(hash);
```

Or use an online SHA-256 hash generator.

### Step 2: Insert Admin User

Run this SQL in your D1 database:

```sql
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@yourdomain.com', 'your_hashed_password_here', 'Admin User', 'admin');
```

### Step 3: Test Login

1. Navigate to `/dashboard/login`
2. Enter your email and password
3. You should be redirected to `/dashboard`

## Email Configuration

### MailChannels Setup

MailChannels is built into Cloudflare Workers and doesn't require an API key. The domain is configured as **salescowboy.com.ng**.

**Email Configuration:**
- Admin email: `admin@salescowboy.com.ng` (configured in wrangler.toml)
- Sender email: `noreply@salescowboy.com.ng`

**To set up email routing:**
1. Go to Cloudflare Dashboard
2. Navigate to Email Routing for salescowboy.com.ng
3. Set up email forwarding/routing as needed
4. Verify the domain is properly configured for email sending

**Custom Domain Setup:**
1. Go to Cloudflare Dashboard > Pages > salescowboy-site
2. Navigate to Custom domains
3. Add `salescowboy.com.ng` and `www.salescowboy.com.ng`
4. Update DNS records as instructed by Cloudflare

## Database Migration

Run the updated schema to add users and sessions tables:

```bash
# Local database
yarn db:migrate:local

# Production database (when ready)
yarn db:migrate
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **Password Hashing**: The current implementation uses SHA-256, which is not secure for passwords. For production:
   - Implement bcrypt or Argon2
   - Use a proper password hashing library
   - Consider using Cloudflare's Workers KV for session storage

2. **Session Tokens**: Currently stored in D1. Consider:
   - Using shorter session expiration times
   - Implementing refresh tokens
   - Storing sessions in Workers KV for better performance

3. **API Security**: 
   - Add rate limiting to prevent abuse
   - Implement CORS properly (currently set to '*')
   - Add request validation

4. **HTTPS**: Always use HTTPS in production (Cloudflare Pages provides this automatically)

## Environment Variables

For production, you may want to add these to `wrangler.toml`:

```toml
[[env.production.vars]]
ADMIN_EMAIL = "admin@yourdomain.com"
SENDER_EMAIL = "noreply@yourdomain.com"
```

Then update the functions to read from `env.ADMIN_EMAIL` and `env.SENDER_EMAIL`.

