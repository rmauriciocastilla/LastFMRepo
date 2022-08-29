import React,{ useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ArtistDetail } from './components/ArtistDetail/ArtistDetail';
import { Artists } from './components/Artists/Artists';
import { TrackDetail } from './components/TrackDetail/TrackDetail';
import { NavBar } from './components/NavBar/NavBar';
import { Login } from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { userRole } from './redux/actions';
import loading from './components/ArtistDetail/loading.gif';
import { User } from './components/User/User';

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userRole())
  },[])
  
  let role = useSelector(s=>s.role);
  if(role==='loading'){
    return(
      <div>
          <img className='loading' src={loading} alt='loading gif'/>
      </div>
  )
  }
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Artists/>}/>
        <Route path='/detail/:name' element={<ArtistDetail/>}/>
        <Route path='/track/:artist/:song/:position' element={<TrackDetail/>}/>
        {(role==='loading' || role==='invalid') && <Route path='/login' element={<Login/>}/>}
        {(role==='user' || role==='admin') && <Route path='/user' element={<User/>}/>} 
      </Routes>
    </div>
  )
}

export default App;
