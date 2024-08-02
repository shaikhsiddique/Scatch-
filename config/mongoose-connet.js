const mongoose = require('mongoose');
const config = require('config');
const debug = require('debug')("devlopment: mongoose ");

mongoose.connect(`${config.get("MONGODB_URI")}/scatch`).then(()=>{
    debug("Connected")
    console.log("connected")
})
.catch((err)=>{
   debug(err);
})

module.exports= mongoose.connections;