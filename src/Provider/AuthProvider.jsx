import { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const GoogleProvider = new GoogleAuthProvider();

    // sign up
    const createUser = (email, Password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, Password)
    }

    // update
    const updateUserProfile = (name) =>{
        setLoading(true);
        updateProfile(auth.currentUser, {displayName: name})
    }

    // sign out
    const logOut = ()=>{
        signOut(auth);
    }

    // sign in
    const logIn = (email, Password) => {
        return signInWithEmailAndPassword(auth, email, Password)
    }

    // google sign in
    const googleLogin = () => {
        return signInWithPopup(auth, GoogleProvider)
    }

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log("current user", currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = { user, loading, createUser, updateUserProfile, logOut, logIn, googleLogin }
    return (
        <AuthContext.Provider value={ authInfo }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;