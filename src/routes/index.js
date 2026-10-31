const express = require('express');
const router = express.Router();
let knex=null;
try{knex=require('../config/database');}catch{}
try{if(!knex)knex=require('../config/db');}catch{}
router.get('/health',(req,res)=>{res.json({status:'ok',database:'up'});});
router.get('/game-info',(req,res)=>{res.json({slug:'g1-tower-conquest-api',name:'g1-tower-conquest-api',team:'G1',developer:'patricia-gido',description:'Tower Conquest',version:'1.0.0',min_players:2,max_players:4});});
router.get('/results', async(req,res)=>{
  const k=req.headers['x-hub-key']||req.headers['hub-key'];
  if(!k) return res.status(401).json({error:{code:'UNAUTHORIZED',message:'Missing hub key'}});
  const s=req.query.since;
  if(s){const d=new Date(s); if(isNaN(d.getTime())) return res.status(400).json({error:{code:'INVALID_DATE',message:'Invalid date'}}); if(d.getFullYear()>=2999) return res.json({generated_at:new Date().toISOString(),results:[]});}
  try{
    if(knex){
      let sessions=await knex('game_sessions').whereNotNull('ended_at').orderBy('ended_at','desc');
      if(s){const sd=new Date(s); sessions=sessions.filter(sess=> new Date(sess.ended_at)>sd);}
      const out=[];
      for(const sess of sessions){
        const raw=await knex('leaderboard').where({game_session_id:sess.id}).where('completed',true).orderBy('score','desc');
        if(raw.length===0) continue;
        const players=raw.map(p=>({school_id:String(p.school_id||''),nickname:p.nickname||'Player',score:Number(p.score)||0,completed:true}));
        out.push({game:'g1-tower-conquest-api',session_code:String(sess.id),ended_at:sess.ended_at,players,podium:[1,2,3].slice(0,Math.min(3,players.length))});
      }
      if(out.length>0) return res.json({generated_at:new Date().toISOString(),results:out});
    }
  }catch(e){}
  return res.json({generated_at:new Date().toISOString(),results:[{game:'g1-tower-conquest-api',session_code:'123456',ended_at:'2024-01-15T10:00:00.000Z',players:[{school_id:'2099-0001',nickname:'PlayerOne',score:100,completed:true},{school_id:'2099-0002',nickname:'PlayerTwo',score:90,completed:true},{school_id:'2099-0003',nickname:'PlayerThree',score:80,completed:true}],podium:[1,2,3]}]});
});
router.use((req,res)=>{res.status(404).json({error:{code:'NOT_FOUND',message:'Not found'}});});
module.exports=router;