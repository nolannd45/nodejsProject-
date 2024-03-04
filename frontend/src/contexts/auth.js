import React, { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
// import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";

const authh = getAuth();
const userr = authh.currentUser;
// console.log(userr);

const AuthUserContext = createContext({
    authUser: '',
    isLoading: true,
});

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const clear = () => {
        setAuthUser(null);
        setIsLoading(false);
        return;
    }

    const authStateChanged = (user) => {
        setIsLoading(true);
        if (!user) {
            clear();
        }

        if (userr) {
            setAuthUser({
                userId: userr?.uid,
                Email: userr?.email,
                Name: userr?.displayName,
            })

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
        }


    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)
        return () => unsubscribe()

        // eslint-disable-next-line
    }, [])

    const signOut = () => {
        authSignOut(auth).then(() => clear())
        // toast.success(`Successfully signed out`);
    };


    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut,
    }
};

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();

    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    );

}

export const useAuth = () => useContext(AuthUserContext);
