import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { loginUser, registerUser } from '../../redux/actions';
import './Login.css';

export const Login = () => {
    const dispatch = useDispatch();
    let [login, setLogin] = useState('login');
    let [loginState,setLoginState]=useState({username:'',password:'',})
    let [error,setError] = useState({username:'',password:'',})

    const handleChange = (e)=>{
        e.preventDefault();
        setLoginState({
            ...loginState,
            [e.target.name]:e.target.value
        })
        handleError(e)
    }

    const handleError = (e)=>{
        let name = e.target.name;
        let value = e.target.value;
        if(name==='username'){
            if(!value.length){
                setError({
                    ...error,
                    username:'El campo es obligatorio'
                })
                return;
            }
            if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)){
                setError({
                    ...error,
                    username:'Debe ser formato email'
                })
                return;
            }
            setError({
                ...error,
                [name]:''
            })
            return;
        }
        if(name==='password'){
            if(!value.length){
                setError({
                    ...error,
                    password:'El campo es obligatorio'
                })
                return;
            }
            setError({
                ...error,
                [name]:''
            })
            return;
        }
        return
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(error.username || error.password || !loginState.username.length || !loginState.password.length){
            console.log('NO ENVIE NADA')
        }else{
            if(login==='login'){
                console.log('Login');
                dispatch(loginUser(loginState))
            }
            if(login==='register'){
                console.log('Register');
                dispatch(registerUser(loginState))
            }
        }
    }

    if(login==='login'){
        return (
        <div className='container-login'>
            <h2>Ingresar</h2>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='text' className={error.username && 'error-input'} name='username' placeholder='user@user.com' value={loginState.username} onChange={handleChange}/>
                {error.username && <p className='error-p'>{error.username}</p>}
                <label>Contraseña:</label>
                <input type='password' className={error.password && 'error-input'} name='password' placeholder='user@user.com' value={loginState.password} onChange={handleChange}/>
                {error.password && <p className='error-p'>{error.password}</p>}
                <input className='input-submit' value='Ingresar' type='submit'/>
                <button className='button-register' onClick={()=>{setLogin('register');setLoginState({username:'',password:''});setError({username:'',password:'',})}} >Registrarte</button>
            </form>
        </div>)
    }

    if(login==='register'){
            return (
            <div className='container-login'>
                <h2>Registrate</h2>
                <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type='text' className={error.username && 'error-input'} name='username' placeholder='user@user.com' value={loginState.username} onChange={handleChange}/>
                {error.username && <p className='error-p'>{error.username}</p>}
                <label>Contraseña:</label>
                <input type='password' className={error.password && 'error-input'} name='password' placeholder='user@user.com' value={loginState.password} onChange={handleChange}/>
                {error.password && <p className='error-p'>{error.password}</p>}
                    <input className='input-submit' value='Registrate' type='submit'/>
                    <button className='button-register' onClick={()=>{setLogin('login');setLoginState({username:'',password:''});setError({username:'',password:'',})}} >Ingresar</button>
                </form>
            </div>)
    }

}
