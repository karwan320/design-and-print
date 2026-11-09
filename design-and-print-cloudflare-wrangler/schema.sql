CREATE TABLE IF NOT EXISTS enquiries (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 full_name TEXT NOT NULL CHECK(length(full_name)<=120),
 email TEXT NOT NULL CHECK(length(email)<=190),
 telephone TEXT,
 service TEXT,
 message TEXT NOT NULL,
 created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries(email);
