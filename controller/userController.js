const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register=async (req,res)=>{
    const {name,email,password,repassword}=req.body;
    const errors={};
    const isvalied=true;
    if(isvalied){
        const salt= await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=new User({
            name:name,
            email:email,
            password:hashedpassword
        });
        newuser.save()
            .then(re=>{return res.json(re);})
            .catch(err=>{return res.status(401);});
    }else{
        return res.json(errors);
    }
}
exports.login=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(user&&(await bcrypt.compare(password,user.password))){
        const payload={name:user.name,id:user._id};
        const token=await jwt.sign(payload,'secret',{expiresIn:'3600'});
        return res.json('Bearer '+token);
    }
    
}
