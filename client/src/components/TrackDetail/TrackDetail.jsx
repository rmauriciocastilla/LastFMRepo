import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import {getTrackDetail,buySong} from '../../redux/actions';
import loading from '../ArtistDetail/loading.gif';
import './TrackDetail.css';

export const TrackDetail = () => {
  const {artist,song,position} = useParams();
  const [modal,setModal] = useState(false);
  const [payment,setPayment] = useState({
    name: '',
    card: '',
    expiration: '',
    cvv: '',
    artist: artist,
    song: song
  })

  const [error,setError] = useState({
    name: '',
    card: '',
    expiration: '',
    cvv: ''
  })

  const dispatch = useDispatch();
  let trackDetail = useSelector(s=>s.trackDetail)
  let role = useSelector(s=>s.role)
  useEffect(()=>{
    dispatch(getTrackDetail(artist,song,position))
  },[dispatch,artist,song,position])
  
  const handleChange = (e)=>{
    e.preventDefault();
    setPayment({
      ...payment,
      [e.target.name]:e.target.value
    })
    handleError(e)
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(error.name || error.card || error.expiration || error.cvv){
      console.log('No envie nada');
      return;
    }
    console.log({
      ...payment,
      name: payment.name.trim(),
      card: payment.card.trim(),
      expiration: payment.expiration.trim(),
      cvv: payment.cvv.trim()
    });
    setPayment({
      name: '',
      card: '',
      expiration: '',
      cvv: '',
      artist: artist,
      song: song
    })
    setModal(false)
    dispatch(buySong(artist,song))
  }

  const handleError = (e)=>{
    const name = e.target.name;
    const value = e.target.value.trim();
    switch(name){
      case 'name':
        if(!value.length){
          setError({
            ...error,
            name: 'El campo es obligatorio'
          })
          return;
        }
        if(!/^[a-zA-Z\s]*$/.test(value)){
          setError({
            ...error,
            name: 'Solo letras'
          })
          return;
        }
        setError({
          ...error,
          name: ''
        })
        return;
      case 'card':
        if(!value.length){
          setError({
            ...error,
            card: 'El campo es obligatorio'
          })
          return;
        }
        if(!Number.isInteger(+value)){
          setError({
            ...error,
            card: 'Solo numeros'
          })
          return;
        }
        if(value.length !== 16){
          setError({
            ...error,
            card: 'Deben ser 16 numeros'
          })
          return;
        }
        setError({
          ...error,
          card: ''
        })
        return;
      case 'expiration':
        if(!value.length){
          setError({
            ...error,
            expiration: 'El campo es obligatorio'
          })
          return;
        }
        if(!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)){
          setError({
            ...error,
            expiration: 'Escriba el formato MM/YY Ej: 06/24'
          })
          return;
        }
        setError({
          ...error,
          expiration: ''
        })
        return;
      default:
        if(!value.length){
          setError({
            ...error,
            cvv: 'El campo es obligatorio'
          })
          return;
        }
        if(!Number.isInteger(+value)){
          setError({
            ...error,
            cvv: 'Solo numeros'
          })
          return;
        }
        if(!/^[0-9]{3,4}$/.test(parseInt(value))){
          setError({
            ...error,
            cvv: 'Codigo de 3 ó 4 digitos'
          })
          return;
        }
        setError({
          ...error,
          cvv: ''
        })
        return;
    }
  }



  if(typeof trackDetail === 'object'){
    if(!trackDetail.name){
      return (
        <div>
          <img className='loading' src={loading} alt='loading gif'/>
        </div>
      )
    }

    return (
      
      <div>
        {
          modal && <div id='modal' className='modal'>
          <div className="modal-content">
            <span className="close" onClick={()=>{
              setModal(false);
              setPayment({
                name: '',
                card: '',
                expiration: '',
                cvv: '',
                artist: artist,
                song: song
              })
              setError({
                name: '',
                card: '',
                expiration: '',
                cvv: ''
              })
              }}>x
            </span>
            <h2 className='content-center'>Pago por tarjeta</h2>
            <form onSubmit={handleSubmit} className='content-center'>
              <div className='flex-box'>
                <label>Nombre completo</label>
                <input
                  className={error.name && 'error-input'}
                  type='text' 
                  name='name' 
                  placeholder='Juan Perez' 
                  value={payment.name}
                  onChange={handleChange}
                  required
                />
                {error.name && <p className='error-p'>{error.name}</p>}
              </div>
              <div className='flex-box'>
                <label>Numero de tarjeta</label>
                <input
                  className={error.card && 'error-input'}
                  type='text' 
                  name='card' 
                  placeholder='1234-1234-1234-1234'
                  maxlength="16"
                  value={payment.card}
                  onChange={handleChange}
                  required
                />
                {error.card && <p className='error-p'>{error.card}</p>}
              </div>
              <div className='flex-box'>
                <label>Fecha de exp. (mm/yy)</label>
                <input
                  className={error.expiration && 'error-input'}
                  type='text' 
                  name='expiration'
                  maxlength="5"
                  placeholder='Month/Year' 
                  value={payment.expiration}
                  onChange={handleChange}
                  required
                />
                {error.expiration && <p className='error-p'>{error.expiration}</p>}
              </div>
              <div className='flex-box'>
                <label>CVV</label>
                <input 
                  className={error.cvv && 'error-input'}
                  type='text' 
                  name='cvv' 
                  placeholder='CVV'
                  maxlength="4"
                  value={payment.cvv}
                  onChange={handleChange}
                  required
                />
                {error.cvv && <p className='error-p'>{error.cvv}</p>}
              </div>
              <input className={(error.name || error.card || error.expiration || error.cvv)?'error-submit':'submit'} type='submit' value='Comprar'/>
            </form>

          </div>
        </div>
        }
        <Link to={`/detail/${artist}`} className='links-back back'>Atras</Link>
        { role==='user' && <div className='buy-song' id='buy' onClick={()=>setModal(true)}>
          Comprar<i className="fa-solid fa-basket-shopping"></i>
        </div>}
        
        <h2 className='track-title'>#{position} {trackDetail.name}</h2>
        <div>
          <div className='track-details'>
            <div>
              <h3>Artista</h3>
              <h3>{trackDetail.artist.name}</h3>
            </div>
            {trackDetail.album && <div>
              <h3>Album</h3>
              <h3>{trackDetail.album.title}</h3>
            </div>}
            <div>
              <h3>Oyentes</h3>
              <h3>{trackDetail.listeners.split('').reverse().map((e,i)=>i%3===0&&i!==0?(e+'.'):e).reverse()}</h3>
            </div>
            <div>
              <h3>Reproducciones</h3>
              <h3>{trackDetail.playcount.split('').reverse().map((e,i)=>i%3===0&&i!==0?(e+'.'):e).reverse()}</h3>
            </div>
            {trackDetail.wiki && <div>
              <h3>Lanzamiento</h3>
              <h3>{trackDetail.wiki.published}</h3>
            </div>}
          </div>
          {trackDetail.wiki && <div className='track-content-text'>
            <h2>Resumen:</h2> 
            <p dangerouslySetInnerHTML={{ __html: trackDetail.wiki.summary }}></p>
          </div>}
        </div>
      </div>
    )
  }
  return (
    <div>{trackDetail}</div>
  )
}
