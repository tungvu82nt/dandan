/**
 * Database Connection Utility using Neon Serverless
 * Hỗ trợ connection pooling và error handling
 */
import { neon } from '@neondatabase/serverless';

// Lấy connection string từ environment
const DATABASE_URL = (import.meta as any).env?.VITE_DATABASE_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Tạo SQL client
export const sql = neon(DATABASE_URL);

/**
 * Execute raw SQL query with error handling
 * @param query SQL query string
 * @param params Query parameters
 * @returns Query result
 */
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  try {
    const result = await sql(query, params);
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Database connected successfully:', result[0]);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Helper: Format date to YYYY-MM-DD
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Helper: Parse decimal from database
export function parseDecimal(value: any): number {
  return typeof value === 'string' ? parseFloat(value) : value;
}
