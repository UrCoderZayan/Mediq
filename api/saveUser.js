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

function writeProfiles(profiles) {
  fs.writeFileSync(profilesFile, JSON.stringify(profiles, null, 2), 'utf8');
}

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : null;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, name, email, age, gender } = req.body;
  const safeName = (name && String(name).trim()) || (email && String(email).split('@')[0].trim()) || 'Google User';
  const safeAge = age !== undefined && age !== null && age !== '' ? Number(age) : null;
  const safeGender = gender && String(gender).trim() ? String(gender).trim() : null;

  if (!id) {
    return res.status(400).json({ error: 'Missing user id' });
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

      const query = `
        INSERT INTO users (id, name, email, age, gender)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE
        SET name = EXCLUDED.name,
            email = EXCLUDED.email,
            age = EXCLUDED.age,
            gender = EXCLUDED.gender;
      `;
      await client.query(query, [id, safeName, email || '', safeAge, safeGender]);
      client.release();
    } else {
      const profiles = readProfiles();
      profiles[id] = {
        id,
        name: safeName,
        email: email || '',
        age: safeAge,
        gender: safeGender
      };
      writeProfiles(profiles);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Save user error:', err);

    try {
      const profiles = readProfiles();
      profiles[id] = {
        id,
        name: safeName,
        email: email || '',
        age: safeAge,
        gender: safeGender
      };
      writeProfiles(profiles);
      return res.status(200).json({ success: true, fallback: true });
    } catch (fallbackError) {
      console.error('Fallback profile save failed:', fallbackError);
      return res.status(500).json({ error: 'Unable to save profile' });
    }
  }
};
