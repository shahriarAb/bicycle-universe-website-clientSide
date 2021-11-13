import { useEffect, useState } from "react";
import initializeAuthentication from "../Pages/Login/Firebase/firebase.init";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

initializeAuthentication();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();

    //register user with email and password
    const registerUser = (userName, email, password, location, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const newUser = { email, displayName: userName }
                setUser(newUser);
                //add user to database
                addUserToDB(userName, email, 'POST');
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
                const user = result.user;
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
                //add user to db
                addUserToDB(user.displayName, user.email, 'PUT');
            }).catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //user state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    //verify if user is admin or not
    useEffect(() => {
        fetch(`https://salty-headland-52267.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    }, [user.email]);

    //logout user
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setAuthError('');
            setUser({});
        })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //add all user to database
    const addUserToDB = (displayName, email, method) => {
        const user = { displayName, email }
        fetch('https://salty-headland-52267.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
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