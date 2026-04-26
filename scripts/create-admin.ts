// Script to create an admin user
// Run with: npx tsx scripts/create-admin.ts

import { createHash } from 'crypto';

// Simple password hashing (in production, use bcrypt)
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// Example usage:
// const adminEmail = 'admin@yourdomain.com';
// const adminPassword = 'your-secure-password';
// const passwordHash = hashPassword(adminPassword);
// 
// Then run this SQL:
// INSERT INTO users (email, password_hash, name, role) 
// VALUES (adminEmail, passwordHash, 'Admin User', 'admin');

console.log(`
To create an admin user, run this SQL in your D1 database:

1. Hash your password (use the hashPassword function above)
2. Run:
   INSERT INTO users (email, password_hash, name, role) 
   VALUES ('admin@yourdomain.com', 'hashed_password_here', 'Admin User', 'admin');

Or use this script with actual credentials.
`);

