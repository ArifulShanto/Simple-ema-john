import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from './firebase.config';
import { initializeApp} from 'firebase/app';
export const initializeLoginFramework = () => {
    initializeApp(firebaseConfig);
}
export const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then(res => {
            const { displayName, email, photoURL } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                password: '',
                photo: photoURL,
                success: true
            }
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth)
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutUser;
        })
        .catch(err => {

        })
}

export const authCreateUserWithEmailAndPassword = (name , email , password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth,email,password)
        .then((res) => {
            console.log(res);
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            console.log(newUserInfo);
            return newUserInfo;
        })
        .catch((error) => {
            // console.log(error);
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}

export const authSignInWithEmailAndPassword = (email , password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = error.message;
            return newUserInfo;
        });
}
const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        console.log('user name updated successfully');
    }).catch((error) => {
        console.log(error);
    });
}