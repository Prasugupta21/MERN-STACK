import React,{useState} from 'react';
import { NavLink,useNavigate} from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState({name:'',email:'',password:'',cpassword:''});
  

 
  const handleInput=({ target: { value, name } })=>{
    console.log(name,value);


  setUser({...user,[name]:value});

  
  }
  const postData=async (e)=>{
e.preventDefault();
const {name,email,password,cpassword}=user;
var response=await fetch('/register',{method:'POST',
headers:{
  
   'Content-Type' : 'application/json' 

},
body:JSON.stringify({
  name,email,password,cpassword
})
})
const data=await response.json();
if(response.status===422 || !data){
  window.alert('Invalid Registration');
}
else{
  window.alert(' Registration Successful');
navigate('/signin');
}
  }
  return (
    <>

      <div className="custom-container">
        <div className="custom-card">
          <div className="card_title">
            <h1>Create Account</h1>
          </div>
          <div className="form">
            <form method="post">

            
            
                <input  type="text" name="name" id="name" placeholder="UserName"  value={user.name} onChange={handleInput} />


             <input  type="email" name="email" placeholder="Email" id="email" value={user.email} onChange={handleInput} />

              <input  type="password" name="password" placeholder="Password" id="password" value={user.password} onChange={handleInput} />
              <input  type="password" name="cpassword" placeholder="Confirm Password" id="cpassword"  value={user.cpassword} onChange={handleInput}/>
              <button onClick={postData}>Sign Up</button>
            </form>
          </div>
          <div className="mt-3">
            <span>Already have an account? <NavLink to="/signin" style={{ textDecoration: 'none' }}>Sign In</NavLink></span>

          </div>
        </div>
      </div>



    </>
  )
}

export default Signup;