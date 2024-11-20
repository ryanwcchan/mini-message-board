const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text) VALUES 
('Welcome to the Message Board!'),
('Feel free to post a message.');
`;

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL, // Use environment variable
    ssl: { rejectUnauthorized: false }, // Required for Render
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Database seeded!");
}

main();
