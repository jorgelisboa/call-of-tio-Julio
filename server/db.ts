import Database from 'better-sqlite3';

const db = new Database('investigators.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS investigators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    player_name TEXT,
    occupation TEXT,
    age INTEGER,
    attributes TEXT, -- JSON
    skills TEXT, -- JSON
    derived_stats TEXT, -- JSON
    finances TEXT, -- JSON
    inventory TEXT, -- JSON
    backstory TEXT,
    portrait_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Migration for existing tables
try {
  db.exec('ALTER TABLE investigators ADD COLUMN finances TEXT');
} catch (e) {
  // Column likely already exists
}

try {
  db.exec('ALTER TABLE investigators ADD COLUMN inventory TEXT');
} catch (e) {
  // Column likely already exists
}

export default db;
