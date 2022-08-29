import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { getCompras } from '../../redux/actions';
import { Compra } from '../Compra/Compra';
import './User.css';

export const User = () => {
  const dispatch = useDispatch();
  let myCart = useSelector(s=>s.myCart);
  let role = useSelector(s=>s.role)
  useEffect(()=>{
    dispatch(getCompras())
  })

  if(role==='loading'){
    return(<div></div>)
  }
  if(typeof myCart === 'string' || !myCart.length){
    return(<div>
      <h2 className='title-landing'>{Array.isArray(myCart)?'No hay compras registradas':myCart}</h2>
    </div>)
  }
  return (
    <div>
        <h2 className='title-landing'>Mis {role==='admin'?'ventas':'compras'}</h2>
        <div className='myCompras'>
        {
          myCart.map(compra=>
          <Compra
          id={compra.id}
          artist={compra.artist}
          track={compra.track}
          status={compra.status}
          />)
        }
        </div>
    </div>
  )
}
