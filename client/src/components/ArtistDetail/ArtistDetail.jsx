import React,{useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { getArtistDetail, getArtists, clearDetail } from '../../redux/actions';
import { Track } from '../Track/Track';
import loading from './loading.gif';
import './ArtistDetail.css';

export const ArtistDetail = () => {
    const name = useParams().name;
    const dispatch = useDispatch();
    let artistTracks = useSelector(s=>s.artistTracks);
    let artists = useSelector(s=>s.artists);
    useEffect(()=>{
        dispatch(getArtists())
        dispatch(getArtistDetail(name))
        return ()=>{
            dispatch(clearDetail())
        }
    },[dispatch,name])
    if(Array.isArray(artistTracks) && Array.isArray(artists)){
        if(artistTracks.length && artists.length){
            if(artists.find(a=>a.name===artistTracks[0].artist.name)){
                return(
                    <div>
                        <Link to='/' className='links-back back'>Atras</Link>
                        <h2 className='title-landing'>#{artists.findIndex(a=>a.name===artistTracks[0].artist.name)+1} {name}</h2>
                        <h2 className='title-artist'>¡Las mas escuchadas!</h2>
                        <div className='container-artists'>        
                            {artistTracks.map((tr,i)=>(
                                <Track
                                    artist={name}
                                    position={i+1}
                                    key={i} 
                                    name={tr.name} 
                                    playcount={tr.playcount} 
                                    listeners={tr.listeners}
                                    id={i}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            }
            return(
                <div>UPS, {name} NO ESTA EN EL TOP 10</div>
            )
        }
        return(
            <div>
                <img className='loading' src={loading} alt='loading gif'/>
            </div>
        )
    }
    return(
        <div>EL ARTISTA QUE ESTAS BUSCANDO NO EXISTE</div>
    )
}
