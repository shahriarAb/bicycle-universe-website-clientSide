import { useEffect, useState } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


initializeAuthentication();

const useFirebase = () => {
    const [user, setuser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    //register user with email and password
    const registerUser = (userName, email, password, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const newUser = { email, displayName: userName }
                setuser(newUser);
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
                //send name of the new user to firebase
                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {
                    setAuthError('')
                    //profile updated
                }).catch(error => {
                    setAuthError(error.message);
                });
            })
            .catch(error => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //login exisitng user
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch(error => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //google sign in 
    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // const user = result.user;
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //user state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setuser(user);
            } else {
                setuser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    //logout user
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setAuthError('');
        })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    return {
        user,
        authError,
        setAuthError,
        signInWithGoogle,
        registerUser,
        loginUser,
        isLoading,
        logOut
    }
}

export default useFirebase;