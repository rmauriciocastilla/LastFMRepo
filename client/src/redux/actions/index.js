import { CLEAR_DETAIL, GET_ARTISTS, GET_ARTIST_DETAIL, GET_COMPRAS, GET_TRACK_DETAIL, USER_ROLE } from "./variables";
import Swal from 'sweetalert2'; 
import axios from 'axios';

export const getArtists = ()=>async(dispatch)=>{
    try {
        const {data} = await axios.get('https://rmauriciocastilla-prueba-fm.herokuapp.com/artists/topartists')
        if(data.artists){
            return dispatch({type: GET_ARTISTS,payload:data.artists.artist});
        }
        return dispatch({type: GET_ARTISTS,payload:'THERE ARE NOT ARTISTS'})
    } catch (error) {
        console.log('error:',error);
    }

}

export const getArtistDetail = (artist)=>async(dispatch)=>{
    try {
        const {data} = await axios.get(`https://rmauriciocastilla-prueba-fm.herokuapp.com/artists/topartists/${artist}`)
        if(data.toptracks){
            return dispatch({type: GET_ARTIST_DETAIL,payload:data.toptracks.track});
        }
        return dispatch({type: GET_ARTIST_DETAIL,payload:'THERE ARE NOT SONGS'})
    } catch (error) {
        console.log('error:',error);
    }

}

export const clearDetail=()=>{
    return {
        type: CLEAR_DETAIL,
    }
}

export const getTrackDetail = (artist,song,position) => async(dispatch)=>{
    try {
        const {data} = await axios.get(`https://rmauriciocastilla-prueba-fm.herokuapp.com/artists/topartists/${artist}/${song}`)
        console.log(data)
        if(data.track){
            return dispatch({type: GET_TRACK_DETAIL, payload:{...data.track,position}})
        }
        return dispatch({type: GET_TRACK_DETAIL, payload:'THE SONG DOES NOT EXIST'})
    } catch (error) {
        console.log(error)
    }
}

export const registerUser = (user)=> async() =>{
    try {
        const {data} = await axios.post('https://rmauriciocastilla-prueba-fm.herokuapp.com/auth/register',user);
        if(data.error){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
        return Swal.fire(
            'Genial',
            data,
            'success'
          ).then(()=>window.location.reload())
    } catch (error) {
        console.log(error);
    }

}


export const loginUser = (user)=>async()=>{
    try {
        const {data}= await axios.post('https://rmauriciocastilla-prueba-fm.herokuapp.com/auth/login',user);
        if(!data.token){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
        window.localStorage.setItem('token',data.token)
        return Swal.fire({
                title: `Bienvenido ${user.username}`,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            }).then(()=>window.location.href='/')

    } catch (error) {
        console.log(error)
    }
}

export const userRole = ()=>async(dispatch)=>{
    try {
        const token = window.localStorage.getItem('token');
        if(!token){
            return dispatch({
                type: USER_ROLE,
                payload: 'invalid'
            })
        }
        const {data} = await axios.get('https://rmauriciocastilla-prueba-fm.herokuapp.com/auth/role',{headers:{Authorization: `Bearer ${token}`}});
        return dispatch({
            type: USER_ROLE,
            payload: data.role
        })
    } catch (error) {
        
    }
}

export const buySong = (artist,song)=>async()=>{
    try {
        const {data} = await axios.post('https://rmauriciocastilla-prueba-fm.herokuapp.com/buy',{artist:artist,track:song},{headers:{Authorization: `Bearer ${window.localStorage.getItem('token')}`}})
        if(data.error){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.error
            })
        }
        return Swal.fire(
            'Genial',
            data+'. Espera a que se confirme tu pago.',
            'success'
          ).then(()=>window.location.href='/user')

    } catch (error) {
        
    }
}

export const getCompras = ()=>async(dispatch)=>{
    const {data} = await axios.get('https://rmauriciocastilla-prueba-fm.herokuapp.com/buy',{headers:{Authorization: `Bearer ${window.localStorage.getItem('token')}`}})
    if(data.error){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error
        })
    }
    dispatch({
        type: GET_COMPRAS,
        payload: data
    })
}

export const updateCompra = (id,status)=>async()=>{
    const {data} = await axios.put('https://rmauriciocastilla-prueba-fm.herokuapp.com/buy',{id,status},{headers:{Authorization: `Bearer ${window.localStorage.getItem('token')}`}})
    if(data.error){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.error
        })
    }
}

export const getAdminCompras = ()=>()=>{
    
}

