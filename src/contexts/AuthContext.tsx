import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../assets/firebaseConfig'; 

interface AuthContextType {
    currentUser: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }:{ children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user:any) => {
           setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}