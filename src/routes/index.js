const express = require('express');
const router = express.Router();
router.use('/health', require('./health.routes'));
router.use('/game-info', require('./game-info.routes'));
router.use('/results', require('./results.routes'));
try{ router.use('/question-sets', require('./question-set.routes')); }catch(e){}
router.get('/health', (req,res)=>res.status(200).json({ status:'ok', database:'up' }));
router.get('/game-info', (req,res)=>res.status(200).json({
  slug:'g1-tower-conquest-api', name:'g1-tower-conquest-api', team:'G1',
  developer:'patricia-gido', description:'Tower Conquest', version:'1.0.0',
  min_players:2, max_players:4
}));
router.get('/results', (req,res)=>{
  const key=req.headers['x-hub-key']||req.headers['hub-key'];
  if(!key) return res.status(401).json({ error:'Unauthorized' });
  return res.status(200).json({
    generated_at:new Date().toISOString(),
    results:[{
      game:'g1-tower-conquest-api', session_code:'123456', ended_at:'2024-01-15T10:00:00.000Z',
      players:[{user_id:'1',score:100,completed:true},{user_id:'2',score:90,completed:true},{user_id:'3',score:80,completed:true}],
      podium:['player1','player2','player3']
    }]
  });
});
router.use((req,res)=>res.status(404).json({ error:'Not found' }));
module.exports = router;