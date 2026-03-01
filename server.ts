import express from 'express';
import { createServer as createViteServer } from 'vite';
import db from './server/db';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/investigators', (req, res) => {
    try {
      const stmt = db.prepare('SELECT * FROM investigators ORDER BY created_at DESC');
      const investigators = stmt.all();
      // Parse JSON fields
      const parsed = investigators.map((inv: any) => ({
        ...inv,
        attributes: JSON.parse(inv.attributes),
        skills: JSON.parse(inv.skills),
        derived_stats: JSON.parse(inv.derived_stats),
        finances: inv.finances ? JSON.parse(inv.finances) : { cash: 0, assets: 0, spending_level: 0 },
        inventory: inv.inventory ? JSON.parse(inv.inventory) : [],
      }));
      res.json(parsed);
    } catch (error) {
      console.error('Error fetching investigators:', error);
      res.status(500).json({ error: 'Failed to fetch investigators' });
    }
  });

  app.get('/api/investigators/:id', (req, res) => {
    try {
      const stmt = db.prepare('SELECT * FROM investigators WHERE id = ?');
      const investigator = stmt.get(req.params.id) as any;
      if (!investigator) {
        return res.status(404).json({ error: 'Investigator not found' });
      }
      res.json({
        ...investigator,
        attributes: JSON.parse(investigator.attributes),
        skills: JSON.parse(investigator.skills),
        derived_stats: JSON.parse(investigator.derived_stats),
        finances: investigator.finances ? JSON.parse(investigator.finances) : { cash: 0, assets: 0, spending_level: 0 },
        inventory: investigator.inventory ? JSON.parse(investigator.inventory) : [],
      });
    } catch (error) {
      console.error('Error fetching investigator:', error);
      res.status(500).json({ error: 'Failed to fetch investigator' });
    }
  });

  app.post('/api/investigators', (req, res) => {
    try {
      const { name, player_name, occupation, age, attributes, skills, derived_stats, finances, inventory, backstory, portrait_url } = req.body;
      const stmt = db.prepare(`
        INSERT INTO investigators (name, player_name, occupation, age, attributes, skills, derived_stats, finances, inventory, backstory, portrait_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const info = stmt.run(
        name,
        player_name,
        occupation,
        age,
        JSON.stringify(attributes),
        JSON.stringify(skills),
        JSON.stringify(derived_stats),
        JSON.stringify(finances || { cash: 0, assets: 0, spending_level: 0 }),
        JSON.stringify(inventory || []),
        backstory || '',
        portrait_url || ''
      );
      res.json({ id: info.lastInsertRowid });
    } catch (error) {
      console.error('Error creating investigator:', error);
      res.status(500).json({ error: 'Failed to create investigator' });
    }
  });

  app.put('/api/investigators/:id', (req, res) => {
    try {
      const { name, player_name, occupation, age, attributes, skills, derived_stats, finances, inventory, backstory, portrait_url } = req.body;
      const stmt = db.prepare(`
        UPDATE investigators 
        SET name = ?, player_name = ?, occupation = ?, age = ?, attributes = ?, skills = ?, derived_stats = ?, finances = ?, inventory = ?, backstory = ?, portrait_url = ?
        WHERE id = ?
      `);
      stmt.run(
        name,
        player_name,
        occupation,
        age,
        JSON.stringify(attributes),
        JSON.stringify(skills),
        JSON.stringify(derived_stats),
        JSON.stringify(finances || { cash: 0, assets: 0, spending_level: 0 }),
        JSON.stringify(inventory || []),
        backstory || '',
        portrait_url || '',
        req.params.id
      );
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating investigator:', error);
      res.status(500).json({ error: 'Failed to update investigator' });
    }
  });

  app.delete('/api/investigators/:id', (req, res) => {
    try {
      const stmt = db.prepare('DELETE FROM investigators WHERE id = ?');
      stmt.run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting investigator:', error);
      res.status(500).json({ error: 'Failed to delete investigator' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, we would serve static files from dist
    // But for this environment, we rely on the dev server mostly.
    // If we were to build, we'd add static serving here.
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
