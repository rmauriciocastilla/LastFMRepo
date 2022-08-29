import React from 'react'
import { Link } from 'react-router-dom';
import './Track.css';

export const Track = ({artist,name,playcount,listeners,id,position}) => {
  return (
    <Link to={`/track/${artist}/${name}/${position}`} className='Link container' id={id}>
        <div className='clasification'>
            <h2>#{position}</h2>
        </div>
        <div className='container-text'>
            <div className='text-content'>
                <h2>Canción</h2>
                <h2 className='break-name'>{name.slice(0,1).toUpperCase()+name.slice(1,13).toLowerCase()+'...'}</h2>
            </div>
            <div className='text-content'>
                <h2>Reproducciones</h2>
                <h2>{playcount.split('').reverse().map((e,i)=>i%3===0&&i!==0?(e+'.'):e).reverse()}</h2>
            </div>
            <div className='text-content'>
                <h2>Oyentes</h2>
                <h2>{listeners.split('').reverse().map((e,i)=>i%3===0&&i!==0?(e+'.'):e).reverse()}</h2>
            </div>

        </div>
    </Link>
  )
}