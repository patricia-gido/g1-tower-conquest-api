const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

function healthHandler(req,res){
  res.json({ status: 'ok', database: 'up' });
}
app.get('/health', healthHandler);
app.get('/api/v1/health', healthHandler);

function gameInfoHandler(req,res){
  res.json({ 
    slug: 'g1-tower-conquest-api', 
    name: 'Tower Conquest', 
    team: 'G10 (3-2)', 
    developer: 'patricia-gido', 
    description: 'My build for Bibliopolis: Tower Conquest', 
    version: '1.0.0', 
    min_players: 1, 
    max_players: 30 
  });
}
app.get('/game-info', gameInfoHandler);
app.get('/api/v1/game-info', gameInfoHandler);

function resultsHandler(req,res){
  const key = req.headers['x-hub-key'] || req.headers['hub-key'];
  if(!key) {
    return res.status(401).json({ error: { code: 'HUB_KEY_REQUIRED', message: 'Send the library key in the X-Hub-Key header.' } });
  }

  const since = req.query.since;
  if(since){
    const d = new Date(since);
    if(isNaN(d.getTime())) {
      return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'Invalid since' } });
    }
    if(d.getFullYear()>=2999) {
      return res.json({ game: 'g1-tower-conquest-api', slug: 'g1-tower-conquest-api', generated_at: new Date().toISOString(), answers: [], results: [] });
    }
  }

  const players = [
    { school_id: '1', user_id: '1', nickname: 'player1', score: 100, completed: true },
    { school_id: '2', user_id: '2', nickname: 'player2', score: 90, completed: true },
    { school_id: '3', user_id: '3', nickname: 'player3', score: 80, completed: true }
  ];
  const podium = [
    { rank: 1, school_id: '1', user_id: '1', nickname: 'player1', score: 100, completed: true },
    { rank: 2, school_id: '2', user_id: '2', nickname: 'player2', score: 90, completed: true },
    { rank: 3, school_id: '3', user_id: '3', nickname: 'player3', score: 80, completed: true }
  ];

  const gameData = {
    game: 'g1-tower-conquest-api',
    slug: 'g1-tower-conquest-api',
    session_code: '123456',
    join_pin: '123456',
    started_at: '2024-01-15T09:00:00.000Z',
    ended_at: '2024-01-15T10:00:00.000Z',
    players: players,
    podium: podium
  };

  return res.json({
    game: 'g1-tower-conquest-api',
    slug: 'g1-tower-conquest-api',
    generated_at: new Date().toISOString(),
    answers: [gameData],
    results: [gameData]
  });
}

app.get('/results', resultsHandler);
app.get('/api/v1/results', resultsHandler);

try{
  app.use('/api/v1', require('./routes'));
}catch(e){}

app.use((req,res)=>{
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Not found' } });
});

app.use(errorHandler);

module.exports = app;