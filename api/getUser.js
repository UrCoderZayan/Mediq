const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const profilesFile = path.join(__dirname, '../data/userProfiles.json');

function readProfiles() {
  try {
    if (!fs.existsSync(profilesFile)) {
      fs.writeFileSync(profilesFile, '{}', 'utf8');
      return {};
    }
    const raw = fs.readFileSync(profilesFile, 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Unable to read profiles fallback store:', error);
    return {};
  }
}

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing user ID' });
  }

  try {
    if (pool) {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255),
          email VARCHAR(255),
          age INTEGER,
          gender VARCHAR(50)
        );
      `);

      const result = await client.query('SELECT * FROM users WHERE id = $1', [id]);
      client.release();

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(result.rows[0]);
    }

    const profiles = readProfiles();
    const profile = profiles[id];

    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(profile);
  } catch (err) {
    console.error('Get user error:', err);
    const profiles = readProfiles();
    const profile = profiles[id];

    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(profile);
  }
};
