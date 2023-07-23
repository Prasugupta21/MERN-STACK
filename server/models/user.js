const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



const userSchema=new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    cpassword :{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
        required:true 
            }
        }
    ],
    message:[
        {
            name :{
                type:String,
                required:true
            },
            email :{
                type:String,
                required:true
            },
            msg :{
                type:String,
                required:true
            }
        }
    ],
    data:{
        type:Date,
        default:Date.now
    }
   
});



// For Hashing Password
userSchema.pre("save",async function(next){
    
    if(this.isModified("password")){
        
          this.password=await bcrypt.hash(this.password,12);
          this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
});

//json web token generation

userSchema.methods.generateAuthtoken=async function(){
    try {
        //token generation
     const token=jwt.sign({_id:this._id},process.env.SECRET);
     //token store in DB
     this.tokens=[...this.tokens,{token:token}];
    
     await this.save();
    
return token;
    } catch (error) {
        console.log(error);
    }
}


//store messages
userSchema.methods.addMessage=async function(name,email,msg){
try {
   this.message =[...this.message,{name,email,msg}];
   await this.save();
   return this.message;
} catch (error) {
    console.log(error);
}
}

const User=mongoose.model('user',userSchema);
module.exports=User;
