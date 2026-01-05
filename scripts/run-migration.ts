/**
 * Database Migration Runner
 * Tạo tables và seed initial data vào NeonDB
 */
import { neon } from '@neondatabase/serverless';
import * as fs from 'fs';
import * as path from 'path';

const DATABASE_URL = 'postgresql://neondb_owner:npg_FxuKOEG3i9YV@ep-cool-darkness-a148vh1m-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

async function runMigration() {
  console.log('🚀 Starting database migration...\n');

  const sql = neon(DATABASE_URL);

  try {
    // Test connection
    console.log('📡 Testing connection...');
    await sql`SELECT 1`;
    console.log('✅ Connected\n');

    // Step 1: Create schema
    console.log('📝 Creating database schema...');
    const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf-8');
    
    // Execute schema (split by statement)
    const schemaStatements = schemaSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (let i = 0; i < schemaStatements.length; i++) {
      const stmt = schemaStatements[i];
      try {
        await sql(stmt);
        process.stdout.write(`\r  Progress: ${i + 1}/${schemaStatements.length} statements`);
      } catch (error: any) {
        if (!error.message.includes('already exists')) {
          console.error(`\n⚠️  Error in statement ${i + 1}:`, error.message);
        }
      }
    }
    console.log('\n✅ Schema created\n');

    // Step 2: Seed data
    console.log('🌱 Seeding initial data...');
    const seedPath = path.join(process.cwd(), 'database', 'seed.sql');
    const seedSQL = fs.readFileSync(seedPath, 'utf-8');
    
    const seedStatements = seedSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    for (let i = 0; i < seedStatements.length; i++) {
      const stmt = seedStatements[i];
      try {
        await sql(stmt);
        process.stdout.write(`\r  Progress: ${i + 1}/${seedStatements.length} inserts`);
      } catch (error: any) {
        if (!error.message.includes('duplicate key')) {
          console.warn(`\n⚠️  Seed warning at ${i + 1}:`, error.message);
        }
      }
    }
    console.log('\n✅ Data seeded\n');

    // Step 3: Verify
    console.log('🔍 Verifying migration...');
    const counts = await sql`
      SELECT 
        'projects' as table_name, COUNT(*)::int as count FROM projects
      UNION ALL
      SELECT 'funds', COUNT(*)::int FROM funds
      UNION ALL
      SELECT 'news', COUNT(*)::int FROM news
      UNION ALL
      SELECT 'donations', COUNT(*)::int FROM donations
      UNION ALL
      SELECT 'volunteers', COUNT(*)::int FROM volunteers
      UNION ALL
      SELECT 'notices', COUNT(*)::int FROM notices
    `;

    console.log('\n📊 Record counts:');
    counts.forEach(row => {
      console.log(`  - ${row.table_name}: ${row.count} records`);
    });

    console.log('\n✨ Migration completed successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
