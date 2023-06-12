import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

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
        console.log("user photo form AuthPorvider: ",photo)
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
            setUser(currentUser);

            // get and set token
            if (currentUser) {
                axios.post('https://b7a12-summer-camp-server-side-sayhan-a.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        console.log(data.data.token);
                        localStorage.setItem('access-token', data.data.token)
                        setLoading(false)
                    })
            }
            else {
                localStorage.removeItem('access-token')
            }

            // console.log(currentUser)
        })
        return () => unsubscribe();
    }, [])


    // img upload
    const useImgHook = (data) => {
        const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Token}`

        const formData = new FormData();
        formData.append('image', data)

        return fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
    };


    const userInfo = {
        user,
        loading,
        SignUp,
        Login,
        LogOut,
        UpdateUser,
        handleGoogleLogin,
        useImgHook,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;