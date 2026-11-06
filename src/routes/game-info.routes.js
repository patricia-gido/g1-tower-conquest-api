const r=require('express').Router();
r.get('/',(req,res)=>res.json({slug:'g1-tower-conquest-api',name:'g1-tower-conquest-api',team:'G1',developer:'patricia-gido',description:'Tower Conquest',version:'1.0.0',min_players:2,max_players:4}));
module.exports=r;