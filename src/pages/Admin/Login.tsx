import React, { useState } from 'react'
import Header from '../../components/Header'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../assets/firebaseConfig.ts';
import { useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/20/solid';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);            
            navigate('/admin-projects')
        } catch (error:any) {
            setError(error.message);
        }
    }

  return (
    <>
    <Header/>
    <section className='w-full h-[90vh] flex justify-center items-center overflow-hidden'>
        <div className='w-[50vw] h-[60vh] shadow-lg rounded-2xl flex'>
            <div className='flex flex-col w-full h-full items-center justify-center py-10 gap-8'>
                <h2 className='text-2xl text-dark-color font-medium'>Login</h2>
                <input type="email" name="user" id="user" className='focus:outline-none border-b mt-4 w-[70%]' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="user" id="user" className='focus:outline-none border-b mb-4 w-[70%]' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                <button className='w-[50%] h-[5vh] bg-primary-color text-light-color rounded-md border-primary-color border-0 hover:bg-transparent hover:text-black hover:border transition-all' onClick={handleLogin}>Login</button>
                {error && <p className='text-sm text-red-600'>{error}</p>}
            </div>
            <div className='w-[25vw] h-full bg-primary-color rounded-r-2xl text-light-color flex flex-col items-center justify-center gap-2'>
                <UserIcon className="w-[20vw] h-[20vh]  me-2"/>
                <h1 className='text-xl text-center font-semibold'>Painel de Administrador</h1>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login