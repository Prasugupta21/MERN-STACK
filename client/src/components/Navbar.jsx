import React ,{useContext}from 'react'
import { NavLink } from 'react-router-dom';
import logo from'../images/logo.svg';
import { UserContext } from '../App';

const Navbar = () => {
  const {state,dispatch}=useContext(UserContext);

  const RenderMenu=()=>{
if(state){
  return(
    <>
<li className="nav-item">
<a className="nav-link active" aria-current="page" href="/">Home</a>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/about">About</NavLink>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/contact"> Contact</NavLink>
</li>

<li className="nav-item">
<NavLink  className="nav-link" to="/logout">Logout</NavLink>
</li>
    </>
  )
}else{
  return(
    <>
<li className="nav-item">
<a className="nav-link active" aria-current="page" href="/">Home</a>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/about">About</NavLink>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/contact"> Contact</NavLink>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/signin">Login</NavLink>
</li>
<li className="nav-item">
<NavLink  className="nav-link" to="/register">Registration</NavLink>
</li>
    </>


  )
}
  }
  return (
   <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink className="navbar-brand"  to="#">
        
        <img src={logo} className="d-inline-block align-text-top" alt="logo" width="50" height="40" /> 
        
        </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
      <RenderMenu />
      </ul>
     
    </div>
  </div>
</nav>
   </div>
  )
}

export default Navbar;

