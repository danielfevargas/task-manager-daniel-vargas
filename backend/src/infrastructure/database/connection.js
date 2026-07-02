import { DatabaseSync } from "node:sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "../../../database.db");

const db = new DatabaseSync(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        task_id TEXT PRIMARY KEY,
        title TEXT NOT NULL UNIQUE,
        description TEXT,
        due_date TEXT,
        priority TEXT NOT NULL,
        status TEXT NOT NULL,
        origin_framework TEXT,
        user_email TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
    );
`);

export default db;