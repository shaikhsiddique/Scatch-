const express = require("express");
const {userRegister_controller,userLogin_controller} = require("../controllers/auth-controller");
const router = express.Router();


router.post("/register",  (req, res) => {
  userRegister_controller(req,res);
});

router.post('/login',(req,res)=>{
  userLogin_controller(req,res);
})



module.exports = router;
