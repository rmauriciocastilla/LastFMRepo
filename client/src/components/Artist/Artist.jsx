import React from 'react'
import { Link } from 'react-router-dom';
import './Artist.css';

export const Artist = ({name,playcount,listeners,id,position}) => {
  return (
    <Link className='Link container' to={`/detail/${name}`} id={id}>
        <div className='clasification'>
            <h2>#{position}</h2>
        </div>
        <div className='container-text'>
            <div className='text-content'>
                <h2>Nombre</h2>
                <h2>{name}</h2>
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