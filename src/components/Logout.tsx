import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../assets/firebaseConfig'

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
        }
    };

    handleLogout();
  }, [navigate]);


  return (
    <div>Loggin out...</div>
  )
};

export default Logout;