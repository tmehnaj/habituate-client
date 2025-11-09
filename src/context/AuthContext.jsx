import React, { useEffect, useState } from 'react';
import { AuthContext } from './Context';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.config';

const googleSignInProvider = new GoogleAuthProvider();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOutUser = () => {
        // setLoading(true);
        return signOut(auth);
    }
    //update profile
    const updateUserProfile = (userData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userData);
    }
    // sign in or signup with google
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleSignInProvider);
    }



    //to observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // console.log('currentUser', currentUser);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false);
            }
            //    setLoader(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const userData = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        logOutUser,
        updateUserProfile,
        googleSignIn,
    }
    return (
        <AuthContext value={userData}>
            {children}
        </AuthContext>
    );
};

export default AuthContextProvider;