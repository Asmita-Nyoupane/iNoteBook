const express = require("express");
const router=express.Router();
router.get('/',(rep,res)=>{
    obj={
        name:"asmita",
        age: 78
    };
    res.json(obj)
})

module.exports=router;
