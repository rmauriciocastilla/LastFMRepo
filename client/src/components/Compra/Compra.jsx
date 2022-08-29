import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { updateCompra } from '../../redux/actions';
import './Compra.css';

export const Compra = ({artist,track,status,id}) => {
    const dispatch = useDispatch();
    const role = useSelector(s=>s.role)
    return (
        <div className={`compra ${status}`}>
            <h2>Artista: {artist}</h2>
            <h2>Canción: {track}</h2>
            <h2>Estado de compra: {status}</h2>
            {status==='pending' && role==='admin' && <button onClick={()=>dispatch(updateCompra(id,'success'))} className='success button-options'>Confirm</button>}
            {status==='pending' && role==='admin' && <button onClick={()=>dispatch(updateCompra(id,'cancel'))} className='cancel button-options'>Cancel</button>}
        </div>
    )
}
