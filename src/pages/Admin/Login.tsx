import { useState } from 'react'
import Header from '../../components/Header'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../assets/firebaseConfig.ts';
import { useNavigate } from 'react-router-dom';

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
    <section className='w-[100vw] h-[90vh] flex items-center justify-center'>
        <div className='w-[30vw] h-[40vh] shadow-lg rounded-2xl flex'>
            <div className='pt-10 pl-[2vw] flex flex-col w-[18vw]'>
                <h2 className='text-3xl w-[14vw]'>Login</h2>
                <input type="email" name="user" id="user" className='focus:outline-none border-b mt-10 w-[70%]' placeholder='E-mail' onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" name="user" id="user" className='focus:outline-none border-b mt-10 w-[70%]' placeholder='Senha' onChange={(e) => setPassword(e.target.value)}/>
                <button className='w-[70%] mt-10 bg-primary-color text-light-color rounded-md border-primary-color border-0 hover:bg-transparent hover:text-black hover:border transition-all' onClick={handleLogin}>Login</button>
                {error && <p className='text-sm text-red-600'>{error}</p>}
            </div>
            <div className='w-[12vw] h-[40vh] bg-primary-color rounded-r-2xl text-light-color flex items-center'>
                <h1 className='text-2xl text-center font-semibold'>Painel de Administrador</h1>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login