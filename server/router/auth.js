const express=require("express");
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const router=express.Router();
const Authenticate = require('../middlewares/auth');

router.get('/',(req,res)=>{
    res.send("hello world");

});

// using promises 
// router.post('/register',(req,res)=>{
//     // console.log(req.body);
//     // res.send('register');

//     const {name,email,password,cpassword}=req.body;

//     if(!name || !email || !password || !cpassword){
//         return res.status(422).json({error:'Please fill the all fields'})
//     }
//     User.findOne({email:email}).then((user)=>{
//          if(user){
//             return res.status(422).json({error:'Email already Exits'});

//          }
//          const newUser=new User({name,email,password,cpassword});
//          newUser.save().then(()=>{
//             return res.status(201).json({message:'User registered Successfully'});

//          }).catch(err=>{
//             return res.status(500).json({error:'Failed to registered '});

//          })
//     }).catch(err=>{
//         console.log(err);
//     })

// });

//using asynchronous 

router.post('/register',async (req,res)=>{


    const {name,email,password,cpassword}=req.body;

    if(!name || !email || !password || !cpassword){
        return res.status(422).json({error:'Please fill the all fields'});
    }

    
    try {
     const user=  await User.findOne({email:email});
            if(user){
               return res.status(422).json({error:'Email already Exits'});
            } else if(password !=cpassword){
                return res.status(422).json({error:'Password are not Matching '});
            }

            
                const newUser=new User({name,email,password,cpassword});


                //
              await newUser.save();
          
                return res.status(201).json({message:'User registered Successfully'});
           
            
          
      
   
    
       
    } catch (error) {
        console.log(error);
    }
    });


// login

router.post('/signin',async(req,res)=>{

try {
    
  const {email,password}  =req.body;
  if(!email || !password){
    return res.status(400).json({error:"Please fill the data"});
  }
  const user=await  User.findOne({email:email});
//   console.log(user);
if(user){
    const isMatch=await bcrypt.compare(password,user.password);
   const token=await user.generateAuthtoken();
 //jwt token storation in cookie
 
 res.cookie("token",token,{
    expires:new Date(Date.now() + 25892000000),
    httpOnly:true

 });
  if(!isMatch){
    return res.status(400).json({error:"Invalid Credentials "});

  }else{
    return res.status(200).json({message:"user Signed In "});

  }
}else{
    return res.status(400).json({error:"Invalid Credentials "});

}
  

} catch (error) {
    console.log(error);
}
});
router.get('/register',(req,res)=>{
    res.send('register');
});
router.get('/about',Authenticate,(req,res)=>{
  res.send(req.rootUser);
});
router.get('/contact',Authenticate,(req,res)=>{
  res.send(req.rootUser);
});
router.post('/contactme',Authenticate,async (req,res)=>{
  try {
    const {name,email,msg}=req.body;
    if(!name || !email || !msg){
      console.log('error in contact form ');
      return res.json({error:'Please Fill the contact Form'});
}
const userContact=await User.findOne({_id:req.userID});
await userContact.save();
if(userContact){
  await userContact.addMessage(name,email,msg);
  
 return res.status(201).json({message:"User Contact Successfully"});
}

  } catch (error) {
    console.log(error);
  }
});
router.get('/logout',(req,res)=>{

  res.clearCookie('token',{path:'/'});
  res.status(200).send('user Loged out');

});

module.exports=router;