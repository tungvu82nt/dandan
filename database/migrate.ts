/**
 * Database Migration Script
 * Chạy script này để tạo tables và seed initial data vào NeonDB
 */
import { sql, testConnection } from './db';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
  console.log('🚀 Starting database migration...\n');

  // Test connection
  console.log('📡 Testing database connection...');
  const connected = await testConnection();
  if (!connected) {
    console.error('❌ Migration failed: Cannot connect to database');
    process.exit(1);
  }

  try {
    // Read and execute schema.sql
    console.log('\n📝 Creating database schema...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
      try {
        await sql(statement);
      } catch (error: any) {
        // Ignore "already exists" errors
        if (!error.message.includes('already exists')) {
          throw error;
        }
      }
    }
    console.log('✅ Schema created successfully');

    // Read and execute seed.sql
    console.log('\n🌱 Seeding initial data...');
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf-8');
    
    const seedStatements = seedSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of seedStatements) {
      try {
        await sql(statement);
      } catch (error: any) {
        console.warn(`⚠️  Seed warning: ${error.message}`);
      }
    }
    console.log('✅ Data seeded successfully');

    // Verify data
    console.log('\n🔍 Verifying migration...');
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const newsCount = await sql`SELECT COUNT(*) as count FROM news`;
    const noticeCount = await sql`SELECT COUNT(*) as count FROM notices`;

    console.log(`  - Projects: ${projectCount[0].count} records`);
    console.log(`  - News: ${newsCount[0].count} records`);
    console.log(`  - Notices: ${noticeCount[0].count} records`);

    console.log('\n✨ Migration completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
runMigration();
