import React,{useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

 const Logout = () => {
    const {state,dispatch}=useContext(UserContext);

    const navigate=useNavigate();
    useEffect(()=>{
        fetch('/logout',{
            method:'GET',
            headers:{
                'Content-Type' : 'application/json',
               Accept:'application/json'
      
              },
      
              credentials:'include'
        }).then((res)=>{
            dispatch({type:'user',payload:false});

            navigate('/signin',{replace:true});
            if(!res.status===200){
                throw new Error(res.error);
               }
        }).catch((err)=>{
  console.log(err);
        })
    },[]);
  return (
    <div>Logout</div>
  )

}
export default Logout;