require('dotenv').config();
const express=require("express");
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
require('./db/conn');
const authRoute=require('./router/auth');
app.use(authRoute);




app.get("/signin",(req,res)=>{
    res.send('signin')
});


app.listen(5000,(()=>{
    console.log(`port start on port 5000`);
}))