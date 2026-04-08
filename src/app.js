import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuario_routes.js';
import jogosRoutes from './routes/jogos_routes.js';
import playerRoutes from './routes/player_routes.js';
import rankingsRoutes from './routes/rankingsRoutes.js';
import partidasRoutes from './routes/partidas_routes.js'; 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/jogos', jogosRoutes);
app.use('/players', playerRoutes);
app.use('/rankings', rankingsRoutes); 
app.use('/partidas', partidasRoutes); 

app.get('/', (req, res) => {
  res.json({ msg: "API rodando" });
});

export default app;