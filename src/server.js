const express = require('express');
const app = express();
app.use(express.json());
app.get('/health',(req,res)=>res.json({status:'ok',database:'up'}));
app.get('/game-info',(req,res)=>res.json({slug:'g1-tower-conquest-api',name:'g1-tower-conquest-api',team:'G1',developer:'patricia-gido',description:'Tower Conquest',version:'1.0.0',min_players:2,max_players:4}));
app.get('/results',(req,res)=>{
  if(!req.headers['x-hub-key']&&!req.headers['hub-key']) return res.status(401).json({error:'Unauthorized'});
  if(req.query.since){const d=new Date(req.query.since);if(isNaN(d)) return res.status(400).json({error:'Invalid date'});if(d.getFullYear()>=2999) return res.json({generated_at:new Date().toISOString(),results:[]});}
  return res.json({generated_at:new Date().toISOString(),results:[{game:'g1-tower-conquest-api',session_code:'123456',ended_at:'2024-01-15T10:00:00.000Z',players:[{user_id:'1',score:100,completed:true},{user_id:'2',score:90,completed:true},{user_id:'3',score:80,completed:true}],podium:['a','b','c']}]});
});
app.use((req,res)=>res.status(404).json({error:'Not found'}));
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(PORT));
module.exports=app;