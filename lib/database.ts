import mysql, { type Pool, type RowDataPacket } from "mysql2/promise";

let pool: Pool | undefined;
let schemaReady: Promise<void> | undefined;

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function getDatabase() {
  if (!pool) {
    pool = mysql.createPool({
      host: required("DATABASE_HOST"),
      port: Number(process.env.DATABASE_PORT || 3306),
      user: required("DATABASE_USER"),
      password: required("DATABASE_PASSWORD"),
      database: required("DATABASE_NAME"),
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4",
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: true } : undefined,
    });
  }
  return pool;
}

export async function ensureSubmissionsTable() {
  if (!schemaReady) {
    schemaReady = getDatabase().query(`
      CREATE TABLE IF NOT EXISTS site_visit_submissions (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(180) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        email VARCHAR(190) NOT NULL,
        message TEXT NULL,
        payload JSON NOT NULL,
        source_page VARCHAR(255) NULL,
        email_sent TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => getDatabase().query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        name VARCHAR(180) NOT NULL,
        email VARCHAR(190) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        message TEXT NOT NULL,
        consent VARCHAR(30) NULL,
        payload JSON NOT NULL,
        source_page VARCHAR(255) NULL,
        email_sent TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)).then(() => getDatabase().query(`
      CREATE TABLE IF NOT EXISTS agent_registrations (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        company_name VARCHAR(180) NOT NULL,
        company_type VARCHAR(100) NOT NULL,
        owner_name VARCHAR(180) NOT NULL,
        contact_name VARCHAR(180) NULL,
        mobile VARCHAR(40) NOT NULL,
        office_address TEXT NOT NULL,
        manager VARCHAR(180) NOT NULL,
        rera_number VARCHAR(120) NOT NULL,
        agreement_1 VARCHAR(30) NULL,
        agreement_2 VARCHAR(30) NULL,
        agreement_3 VARCHAR(30) NULL,
        agreement_4 VARCHAR(30) NULL,
        agreement_5 VARCHAR(30) NULL,
        payload JSON NOT NULL,
        source_page VARCHAR(255) NULL,
        email_sent TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)).then(() => getDatabase().query(`
      CREATE TABLE IF NOT EXISTS application_settings (
        setting_key VARCHAR(100) NOT NULL,
        setting_value TEXT NOT NULL,
        is_secret TINYINT(1) NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)).then(() => undefined).catch((error) => {
      schemaReady = undefined;
      throw error;
    });
  }
  return schemaReady;
}

export type SubmissionRow = RowDataPacket & {
  id: number;
  form_type: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  payload: string | Record<string, string | boolean>;
  source_page: string | null;
  email_sent: number;
  created_at: Date;
};
