import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

/** * TACTICAL LOGIC: 
 * Since this file lives in _BACKUP_FILES, we use '../' 
 * to point the server back to the main Wya_Project root.
 */
app.use(express.static(path.join(__dirname, '../')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`
  🚀 WYA Dev Server Active
  🔗 Local: http://localhost:${PORT}
  📡 Intelligence ID: G-DQF0GRW2WG
  `);
});