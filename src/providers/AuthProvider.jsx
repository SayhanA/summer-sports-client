import  { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    const SignUp = (email, password) => {
        setLoading(false);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const Login = (email, password) => {
        setLoading(false);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const handleGoogleLogin = () => {
        setLoading(false)
        return signInWithPopup(auth, googleProvider)
    } 

    const UpdateUser = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    
    const LogOut = () => {
        setLoading(false);
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            console.log(currentUser)
        }) 
        return () => unsubscribe();
    },[])
    
    const userInfo = {
        user,
        loading,
        SignUp,
        Login,
        LogOut,
        UpdateUser,
        handleGoogleLogin,

    }
    
    return (
        <AuthContext.Provider value={ userInfo }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;