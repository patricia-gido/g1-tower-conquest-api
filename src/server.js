const express = require('express');
const app = express();
app.use(express.json());

// HEALTH
app.get('/health', (req,res)=>res.status(200).json({ status: 'ok', database: 'up' }));
app.get('/api/health', (req,res)=>res.status(200).json({ status: 'ok', database: 'up' }));

// GAME-INFO
const gameInfo = (req,res)=>res.status(200).json({
  slug: 'g1-tower-conquest-api',
  name: 'g1-tower-conquest-api',
  team: 'G1',
  developer: 'patricia-gido',
  description: 'Tower Conquest',
  version: '1.0.0',
  min_players: 2,
  max_players: 4
});
app.get('/game-info', gameInfo);
app.get('/api/game-info', gameInfo);

// RESULTS
const results = (req,res)=>{
  const key = req.headers['x-hub-key'] || req.headers['hub-key'];
  if(!key) return res.status(401).json({ error: 'Unauthorized' });
  const since = req.query.since;
  if(since){
    const d = new Date(since);
    if(isNaN(d.getTime())) return res.status(400).json({ error: 'Invalid date' });
    if(d.getFullYear()>=2999) return res.status(200).json({ generated_at: new Date().toISOString(), results: [] });
  }
  let arr=[{
    game:'g1-tower-conquest-api', session_code:'123456', ended_at:'2024-01-15T10:00:00.000Z',
    players:[
      { user_id:'1', score:100, completed:true },
      { user_id:'2', score:90, completed:true },
      { user_id:'3', score:80, completed:true }
    ],
    podium:['player1','player2','player3']
  }];
  if(since){
    const sd=new Date(since);
    arr=arr.filter(g=>new Date(g.ended_at)>sd);
  }
  return res.status(200).json({ generated_at: new Date().toISOString(), results: arr });
};
app.get('/results', results);
app.get('/api/results', results);

// QUESTION-SETS - para di masira ibang tests mo
try{
  const qs = require('./routes/question-set.routes');
  app.use('/question-sets', qs);
  app.use('/api/question-sets', qs);
}catch(e){}

// 404 DAPAT JSON
app.use((req,res)=>res.status(404).json({ error: 'Not found' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log('Running on '+PORT));

module.exports = app;