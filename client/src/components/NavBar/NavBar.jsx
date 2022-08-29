import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';

export const NavBar = () => {
  let role=useSelector(s=>s.role);

  return (
    <nav className='container-navbar'>
        <Link to='/' className='title links'>🔥MiTop.FM</Link>
        <div className='container-options'>
            {(role==='user' || role==='admin') && <Link className='links' to='/user'><i className="fa-solid fa-user"></i>{role==='admin'?' Mis ventas':' Mis compras'}</Link>}
            {(role==='invalid' || role==='loading') && <Link className='links' to='/login'><i className="fa-solid fa-right-to-bracket"></i> Ingreso/Registro</Link>}
            {(role==='user' || role==='admin') && <button className='links' onClick={()=>{
              window.localStorage.removeItem('token');
              window.location.href='/'
            }}><i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar Sesión</button>}
        </div>
    </nav>
  )
}
