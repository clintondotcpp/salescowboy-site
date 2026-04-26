// Script to create an admin user
// Run with: node scripts/create-admin.js
// Or use: npx tsx scripts/create-admin.ts (if you have tsx installed)

const crypto = require('crypto');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Example usage - replace with your actual credentials
const adminEmail = 'admin@yourdomain.com'; // Change this
const adminPassword = 'your-secure-password'; // Change this
const adminName = 'Admin User';

const passwordHash = hashPassword(adminPassword);

console.log('\n=== Admin User Creation ===\n');
console.log('Email:', adminEmail);
console.log('Password Hash:', passwordHash);
console.log('\nRun this SQL in your D1 database:\n');
console.log(`INSERT INTO users (email, password_hash, name, role) 
VALUES ('${adminEmail}', '${passwordHash}', '${adminName}', 'admin');\n`);

console.log('Or use wrangler to execute:');
console.log(`npx wrangler d1 execute salescowboy-db --command "INSERT INTO users (email, password_hash, name, role) VALUES ('${adminEmail}', '${passwordHash}', '${adminName}', 'admin');"`);

