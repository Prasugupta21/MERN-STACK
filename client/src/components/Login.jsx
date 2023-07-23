import React,{useState,useContext} from 'react';
import { UserContext } from '../App';
import { NavLink,useNavigate } from 'react-router-dom';

const Login = () => {
const {state,dispatch}=useContext(UserContext)
  const navigate=useNavigate();
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');

 
const loginUser=async (e)=>{
  e.preventDefault();
  const res=await fetch('/signin',{
    method:'POST',
    headers:{
      'Content-Type' : 'application/json' ,
      
     
      

    },
    body:JSON.stringify({
      email,password
    })
  });
  const data= await res.json();
  if(res.status===400 || !data){
    window.alert('Invalid Credentials');
  }else{
    dispatch({type:'user',payload:true})
    window.alert('Login Successful');
    navigate('/');
  }
  

}

  return (
    <div>
<div className="custom-container">
      <div className="custom-card">
        <div className="card_title">
          <h1>Login </h1>
        </div>
        <div className="form">
        <form method="POST" >
          <input type="email" name="email"  id="email" value={email} placeholder='Email'  onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" name="password"  id="password" placeholder='Password' value={password}  onChange={(e)=> setPassword(e.target.value)}/>
          <button onClick={loginUser}>Login</button>
          </form>
        </div>
      <div className="mt-3">
      <span >Don't have an account? <NavLink to="/register" style={{textDecoration:'none'}}>Create Account</NavLink></span>

      </div>
      </div>
    </div>

      
</div>
  )
}

export default Login;