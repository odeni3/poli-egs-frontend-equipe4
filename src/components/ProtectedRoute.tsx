import { useAuth } from '../contexts/AuthContext'
import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
    const { currentUser, loading }:any = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    currentUser ? <Outlet/> : <Navigate to="/login"/>
  );
};

export default ProtectedRoute;