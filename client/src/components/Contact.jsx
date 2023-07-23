import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({name:'',email:'',msg:''});
  
    const userContact=async()=>{
      try {
        const res=await fetch('/contact',{
          method:'GET',
          headers:{
            'Content-Type' : 'application/json',
  
          },
  
       
        });
        const data=await res.json();
        console.log(data);
        setUserData({...userData,name:data.name,email:data.email});
        if(!res.status===200){
         throw new Error(res.error);
        }
  
  
      } catch (error) {
        console.log(error);
        navigate('/signin');
      }
    }
    useEffect(()=>{
      userContact();
    },[]);
   


    const handleInput=async({target:{name,value}})=>{
   console.log(name,value);
      setUserData({...userData,[name]:value});
    }

//sending Data to Backend

const contactForm=async (e)=>{
e.preventDefault();
const {name,email,msg}=userData;
const res=await fetch('/contactme',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    name,email,msg
  })
});
const data=await res.json();
console.log("data is",data);
if(!data){
  console.log('Messgae not send');
}
else{
  alert('Message Sent');
  setUserData({...userData,msg:''})
}
}


    
  return (
    <>
<div class="container">
		<div class="section-contact">
			<div class="row justify-content-center">
				<div class="col-12 col-lg-10 col-xl-8">
					<div class="header-section text-center">
						<h2 class="title">Get In Touch
							<span class="dot"></span>
							<span class="big-title">CONTACT</span>
						</h2>
						<p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consectetur commodo risus, nec pellentesque turpis efficitur non.</p>
						
					</div>
				</div>
			</div>
			<div class="form-contact">
       
				<form method='POST'>
					<div class="row">
						<div class="col-md-6">
							<div class="single-input">
								<i class="fas fa-user"></i>
								<input type="text" name="name" placeholder="ENTER YOUR NAME"  value={userData.name} onChange={handleInput}/>
							</div>
						</div>
						<div class="col-md-6">
							<div class="single-input">
								<i class="fas fa-envelope"></i>
								<input type="email" name="email" placeholder="ENTER YOUR EMAIL"  value={userData.email} onChange={handleInput}/>
							</div>
						</div>
					

						<div class="col-12">
							<div class="single-input">
								<i class="fas fa-comment-dots"></i>
								<textarea placeholder="ENTER YOUR MESSAGE" onChange={handleInput} name='msg' value={userData.msg}></textarea>
							</div>
						</div>
						<div class="col-12">
							<div class="submit-input text-center">
								<input type="submit" onClick={contactForm}  value="SUBMIT NOW"/> 
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

    </>
  )
}

export default Contact;