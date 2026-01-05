/**
 * API Service Layer
 * Trung gian giữa frontend và database
 * Sử dụng NeonDB serverless driver
 */
import { sql } from '../database/db';
import type { Project, Fund, NewsItem, DonationRecord, Volunteer, NoticeItem } from '../types';

// =============================================
// CACHE UTILS
// =============================================
const CACHE_TTL = 60 * 1000; // 1 minute
const cache = {
  data: {} as Record<string, { timestamp: number; payload: any }>,
  get<T>(key: string): T | null {
    const entry = this.data[key];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      delete this.data[key];
      return null;
    }
    return entry.payload as T;
  },
  set(key: string, payload: any) {
    this.data[key] = { timestamp: Date.now(), payload };
  },
  invalidate(key: string) {
    // Invalidate specific key or prefix
    Object.keys(this.data).forEach(k => {
      if (k.startsWith(key)) delete this.data[k];
    });
  }
};

// =============================================
// PROJECTS API
// =============================================
export const ProjectsAPI = {
  /**
   * Lấy tất cả projects
   */
  async getAll(): Promise<Project[]> {
    const cached = cache.get<Project[]>('projects');
    if (cached) return cached;

    const result = await sql`
      SELECT 
        id, title, image, raised, target, donors, 
        valid_date as "validDate", category, description, content, status,
        created_at as "createdAt", updated_at as "updatedAt"
      FROM projects 
      ORDER BY created_at DESC
    `;
    const projects = result.map(row => ({
      ...row,
      raised: parseFloat(row.raised as any),
      target: typeof row.target === 'string' ? parseFloat(row.target) : row.target,
    })) as Project[];

    cache.set('projects', projects);
    return projects;
  },

  /**
   * Lấy project theo ID
   */
  async getById(id: string): Promise<Project | null> {
    const result = await sql`
      SELECT 
        id, title, image, raised, target, donors,
        valid_date as "validDate", category, description, content, status
      FROM projects 
      WHERE id = ${id}
    `;
    if (result.length === 0) return null;
    const row = result[0];
    return {
      ...row,
      raised: parseFloat(row.raised as any),
      target: typeof row.target === 'string' ? parseFloat(row.target) : row.target,
    } as Project;
  },

  /**
   * Tạo project mới
   */
  async create(data: Omit<Project, 'id'>): Promise<Project> {
    const result = await sql`
      INSERT INTO projects (title, image, raised, target, donors, valid_date, category, description, content, status)
      VALUES (
        ${data.title}, ${data.image}, ${data.raised}, ${data.target}, ${data.donors},
        ${data.validDate}, ${data.category}, ${data.description}, ${data.content}, ${data.status}
      )
      RETURNING *
    `;
    cache.invalidate('projects');
    return result[0] as Project;
  },

  /**
   * Cập nhật project
   */
  async update(id: string, data: Partial<Project>): Promise<Project> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        updates.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    });

    const query = `
      UPDATE projects 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
    values.push(id);

    const result = await sql(query, values);
    cache.invalidate('projects');
    return result[0] as Project;
  },

  /**
   * Xóa project
   */
  async delete(id: string): Promise<void> {
    await sql`DELETE FROM projects WHERE id = ${id}`;
    cache.invalidate('projects');
  }
};

// =============================================
// FUNDS API
// =============================================
export const FundsAPI = {
  async getAll(): Promise<Fund[]> {
    const result = await sql`
      SELECT 
        id, title, image, sponsor, raised, times,
        created_date as "date"
      FROM funds 
      ORDER BY created_at DESC
    `;
    return result.map(row => ({
      ...row,
      raised: parseFloat(row.raised as any),
    })) as Fund[];
  },

  async getById(id: string): Promise<Fund | null> {
    const result = await sql`SELECT * FROM funds WHERE id = ${id}`;
    return result.length > 0 ? (result[0] as Fund) : null;
  },

  async create(data: Omit<Fund, 'id'>): Promise<Fund> {
    const result = await sql`
      INSERT INTO funds (title, image, sponsor, raised, times, created_date)
      VALUES (${data.title}, ${data.image}, ${data.sponsor}, ${data.raised}, ${data.times}, ${data.date})
      RETURNING *
    `;
    return result[0] as Fund;
  },
};

// =============================================
// NEWS API
// =============================================
export const NewsAPI = {
  async getAll(category?: string): Promise<NewsItem[]> {
    const cacheKey = category ? `news_${category}` : 'news_all';
    const cached = cache.get<NewsItem[]>(cacheKey);
    if (cached) return cached;

    const result = category
      ? await sql`
          SELECT 
            id, title, publish_date as "date", image, summary, content, source, category
          FROM news 
          WHERE category = ${category}
          ORDER BY publish_date DESC
        `
      : await sql`
          SELECT 
            id, title, publish_date as "date", image, summary, content, source, category
          FROM news 
          ORDER BY publish_date DESC
        `;

    const news = result as NewsItem[];
    cache.set(cacheKey, news);
    return news;
  },

  async getById(id: string): Promise<NewsItem | null> {
    const result = await sql`
      SELECT 
        id, title, publish_date as "date", image, summary, content, source, category
      FROM news 
      WHERE id = ${id}
    `;
    return result.length > 0 ? (result[0] as NewsItem) : null;
  },

  async create(data: Omit<NewsItem, 'id'>): Promise<NewsItem> {
    const result = await sql`
      INSERT INTO news (title, publish_date, image, summary, content, source, category)
      VALUES (${data.title}, ${data.date}, ${data.image}, ${data.summary}, ${data.content}, ${data.source}, ${data.category})
      RETURNING *
    `;
    cache.invalidate('news');
    return result[0] as NewsItem;
  },
};

// =============================================
// DONATIONS API
// =============================================
export const DonationsAPI = {
  async getAll(limit: number = 100): Promise<DonationRecord[]> {
    const result = await sql`
      SELECT 
        id, donor_name as "donor", amount, project_title as "projectTitle",
        pay_type as "payType", channel, donation_date as "date"
      FROM donations 
      ORDER BY donation_date DESC, created_at DESC
      LIMIT ${limit}
    `;
    return result.map(row => ({
      ...row,
      amount: parseFloat(row.amount as any),
    })) as DonationRecord[];
  },

  async create(data: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
    const result = await sql`
      INSERT INTO donations (donor_name, amount, project_title, pay_type, channel, donation_date)
      VALUES (${data.donor}, ${data.amount}, ${data.projectTitle}, ${data.payType}, ${data.channel}, ${data.date})
      RETURNING id, donor_name as donor, amount, project_title as "projectTitle", pay_type as "payType", channel, donation_date as date
    `;
    return result[0] as DonationRecord;
  },

  async getTotalRaised(): Promise<number> {
    const result = await sql`SELECT COALESCE(SUM(amount), 0) as total FROM donations`;
    return parseFloat(result[0].total as any);
  },
};

// =============================================
// VOLUNTEERS API
// =============================================
export const VolunteersAPI = {
  async getAll(): Promise<Volunteer[]> {
    const result = await sql`
      SELECT 
        id, name, phone, email, area, interest, status,
        registration_date as "date"
      FROM volunteers 
      ORDER BY created_at DESC
    `;
    return result as Volunteer[];
  },

  async create(data: Omit<Volunteer, 'id'>): Promise<Volunteer> {
    const result = await sql`
      INSERT INTO volunteers (name, phone, email, area, interest, status, registration_date)
      VALUES (${data.name}, ${data.phone}, ${data.email}, ${data.area}, ${data.interest}, ${data.status}, ${data.date})
      RETURNING id, name, phone, email, area, interest, status, registration_date as date
    `;
    return result[0] as Volunteer;
  },

  async updateStatus(id: number, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    await sql`UPDATE volunteers SET status = ${status} WHERE id = ${id}`;
  },

  async delete(id: number): Promise<void> {
    await sql`DELETE FROM volunteers WHERE id = ${id}`;
  },
};

// =============================================
// NOTICES API
// =============================================
export const NoticesAPI = {
  async getActive(): Promise<NoticeItem[]> {
    const result = await sql`
      SELECT id, content, link, icon
      FROM notices 
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `;
    return result as NoticeItem[];
  },

  async getAll(): Promise<NoticeItem[]> {
    const result = await sql`
      SELECT id, content, link, icon
      FROM notices 
      ORDER BY display_order ASC
    `;
    return result as NoticeItem[];
  },

  async create(data: Omit<NoticeItem, 'id'>): Promise<NoticeItem> {
    const result = await sql`
      INSERT INTO notices (content, link, icon, is_active)
      VALUES (${data.content}, ${data.link}, ${data.icon || '📢'}, TRUE)
      RETURNING id, content, link, icon
    `;
    return result[0] as NoticeItem;
  },

  async update(id: string, data: Partial<NoticeItem>): Promise<void> {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.content) {
      updates.push(`content = $${paramIndex++}`);
      values.push(data.content);
    }
    if (data.link) {
      updates.push(`link = $${paramIndex++}`);
      values.push(data.link);
    }
    if (data.icon !== undefined) {
      updates.push(`icon = $${paramIndex++}`);
      values.push(data.icon);
    }

    if (updates.length > 0) {
      const query = `UPDATE notices SET ${updates.join(', ')} WHERE id = $${paramIndex}`;
      values.push(id);
      await sql(query, values);
    }
  },

  async delete(id: string): Promise<void> {
    await sql`DELETE FROM notices WHERE id = ${id}`;
  },
};

// =============================================
// AUTH API
// =============================================
export const AuthAPI = {
  async login(username: string, password: string): Promise<boolean> {
    // Note: In a real production app, passwords should be hashed (e.g., bcrypt).
    // Here we assume simple comparison for the prototype or existing simple hash.
    // WARNING: This exposes the query to the client side. Secure this with a backend in Phase 3.
    const result = await sql`
      SELECT id, username, password 
      FROM admin_users 
      WHERE username = ${username}
    `;

    if (result.length === 0) return false;

    const user = result[0];
    // Simple direct comparison for now as per "123456" requirement
    return user.password === password;
  }
};

// =============================================
// SITE CONFIG API
// =============================================
export const SiteConfigAPI = {
  async get(key: string): Promise<any> {
    const result = await sql`SELECT config_value FROM site_config WHERE config_key = ${key}`;
    return result.length > 0 ? result[0].config_value : null;
  },

  async set(key: string, value: any): Promise<void> {
    await sql`
      INSERT INTO site_config (config_key, config_value)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb)
      ON CONFLICT (config_key) 
      DO UPDATE SET config_value = ${JSON.stringify(value)}::jsonb, updated_at = CURRENT_TIMESTAMP
    `;
  },

  async getAll(): Promise<Record<string, any>> {
    const result = await sql`SELECT config_key, config_value FROM site_config`;
    const config: Record<string, any> = {};
    result.forEach(row => {
      config[row.config_key as string] = row.config_value;
    });
    return config;
  },
};
