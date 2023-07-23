import React,{useState,useEffect} from 'react';
const Home = () => {
  const [userName,setUserName]=useState('');
  const [show,setShow]=useState(false);
    const userHomePage=async()=>{
      try {
        const res=await fetch('/contact',{
          method:'GET',
          headers:{
            'Content-Type' : 'application/json',
  
          },
  
       
        });
        const data=await res.json();
        console.log(data);
        setUserName(data.name);
        setShow(true);
  
  
      } catch (error) {
        console.log(error);
    
      }
    }
    useEffect(()=>{
      userHomePage();
    },[]);
  return (
 
<div className="home-page">
<div className="home-div">
  <p className="pt-5">WELCOME</p>
  <h2>{userName}</h2>
        <h2 className='fs-2'>{show ?'Happy to see you back':'We are the MERN Developer'}</h2>
  </div>

  </div>
      
  
  )
}

export default Home;