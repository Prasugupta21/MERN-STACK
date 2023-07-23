import './App.css';
import React from 'react';
import { createContext ,useReducer} from 'react';
import {Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import About from './components/About';
import Login from './components/Login';
import Contact from './components/Contact';
import Error  from './components/Error';
import Logout from './components/Logout';
import {initialState,reducer} from './reducer/useReducer';

export const UserContext=createContext();

function App() {
const [state,dispatch]=useReducer(reducer,initialState);

  return (
    <div className="App">
          <UserContext.Provider value={{state,dispatch}}>;

      <Navbar/>

      <Routes>
        <Route path="/" element={ <Home/> } >  </Route>
        <Route path="/about" element={ <About/> } >  </Route>
        <Route path="/contact" element={ <Contact/> } >  </Route>
        <Route path="/register" element={ <Signup/> } > </Route>
        <Route path="/signin" element={ <Login/> } > </Route>
        <Route path="/logout" element={ <Logout/> } > </Route>

        <Route path='*' element={<Error />}></Route>
      </Routes>
      </UserContext.Provider>
    </div>

  );
}

export default App;
