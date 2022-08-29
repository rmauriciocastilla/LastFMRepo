import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getArtists } from '../../redux/actions';
import { Artist } from '../Artist/Artist';
import './Artists.css';

export const Artists = () => {
  const dispatch = useDispatch();
  let artists = useSelector(s=>s.artists);

  useEffect(()=>{
    dispatch(getArtists())
  },[dispatch])
  
  if(Array.isArray(artists)){
    if(!artists.length){
      <div></div>
    }
    return (
      <div>
        <h2 className='title-landing'>¡Top 10 Artistas Mas Sonados!</h2>
        <div className='container-artists'>
          {artists.map((a,i)=>(
            <Artist
              position={i+1}
              key={a.mbid} 
              name={a.name} 
              playcount={a.playcount} 
              listeners={a.listeners}
              id={a.mbid}
              />
            ))
          }
        </div>

      </div>
    )
  }
  return (
    <div>
      {artists}
    </div>
  )
}
