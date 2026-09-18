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
      CREATE TABLE IF NOT EXISTS form_submissions (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        form_type VARCHAR(60) NOT NULL,
        name VARCHAR(180) NULL,
        email VARCHAR(190) NULL,
        phone VARCHAR(40) NULL,
        payload JSON NOT NULL,
        source_page VARCHAR(255) NULL,
        email_sent TINYINT(1) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        INDEX idx_form_type (form_type),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `).then(() => getDatabase().query(`
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
