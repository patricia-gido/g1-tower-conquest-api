const r=require('express').Router();
r.get('/',(req,res)=>res.json({status:'ok',database:'up'}));
module.exports=r;