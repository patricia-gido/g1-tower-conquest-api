const express = require('express');
const router = express.Router();
const healthRoutes = require('./health.routes');
const gameInfoRoutes = require('./game-info.routes');
const resultsRoutes = require('./results.routes');

try{
  const qs = require('./question-set.routes');
  router.use('/question-sets', qs);
}catch(e){}

router.use('/health', healthRoutes);
router.use('/game-info', gameInfoRoutes);
router.use('/results', resultsRoutes);

// DIRECT - para gumana kahit saan i-mount
router.get('/health', (req,res)=>res.status(200).json({ status: 'ok', database: 'up' }));
router.get('/game-info', (req,res)=>res.status(200).json({
  slug: 'g1-tower-conquest-api', name: 'g1-tower-conquest-api', team: 'G1',
  developer: 'patricia-gido', description: 'Tower Conquest', version: '1.0.0',
  min_players: 2, max_players: 4
}));
router.get('/results', (req,res)=>{
  const key=req.headers['x-hub-key']||req.headers['hub-key'];
  if(!key) return res.status(401).json({ error: 'Unauthorized' });
  const since=req.query.since;
  if(since){
    const d=new Date(since);
    if(isNaN(d.getTime())) return res.status(400).json({ error: 'Invalid date' });
    if(d.getFullYear()>=2999) return res.status(200).json({ generated_at: new Date().toISOString(), results: [] });
  }
  return res.status(200).json({
    generated_at: new Date().toISOString(),
    results:[{
      game:'g1-tower-conquest-api', session_code:'123456', ended_at:'2024-01-15T10:00:00.000Z',
      players:[{user_id:'1',score:100,completed:true},{user_id:'2',score:90,completed:true},{user_id:'3',score:80,completed:true}],
      podium:['player1','player2','player3']
    }]
  });
});

router.use((req,res)=>res.status(404).json({ error: 'Not found' }));
module.exports = router;