import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
const About = () => {

const navigate=useNavigate();
const [userData,setUserData]=useState(null);

  const callAboutPage=async()=>{
    try {
      const res=await fetch('/about',{
        method:'GET',
        headers:{
          'Content-Type' : 'application/json',
         Accept:'application/json'

        },

        //dont need body here;
        credentials:'include'
      });
      const data=await res.json();
      console.log(data);
      setUserData(data);
      if(!res.status===200){
       throw new Error(res.error);
      }


    } catch (error) {
      console.log(error);
      navigate('/signin');
    }
  }
  useEffect(()=>{
    callAboutPage();
  },[])
  return (
    <>
    <section class="text-center about">
      <h1>About US</h1>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200" >
            <span class="fa fa-group"></span>
            <h2 className='about-heading'>User Id</h2>
            <p class="lead">{ userData? (userData._id) :(<></>)}</p>
          </div>
          <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
            <span class="fa fa-info"></span>
            <h2 className='about-heading'>Name </h2>
            <p class="lead">{userData?(userData.name):(<></>)} </p>
          </div>
          <div class="col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn" data-wow-offset="200">
            <span class="fa fa-file"></span>
            <h2 className='about-heading'>Email</h2>
            <p class="lead">{userData?(userData.email):(<></>)}</p>
          </div>
        
          
        </div>
        
      </div>
    </section>
    </>
  )
}

export default About;