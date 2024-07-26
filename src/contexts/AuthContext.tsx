import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, getAuth, User, getIdToken, signInWithCredential, signInWithCustomToken } from 'firebase/auth';
import { auth } from '../assets/firebaseConfig'; 

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }:{ children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user:any) => {
           setCurrentUser(user);
           setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{currentUser, loading }}>
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