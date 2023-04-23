import { initializeApp } from 'firebase/app';


import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
     } from 'firebase/auth'; 

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDp9aMCcfusaRR_L2I3ZyBixiwm2vAcLpg",
    authDomain: "reuse-republic.firebaseapp.com",
    projectId: "reuse-republic",
    storageBucket: "reuse-republic.appspot.com",
    messagingSenderId: "897331497197",
    appId: "1:897331497197:web:7ece6d28b661fb3002e4e4",
    measurementId: "G-PGRCV0GR44"
  };

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// additionalInformation is defaultly an empty object if nothing passed in 
export const createUserDocumentFromAuth = async (userAuth,
    addtionalInformation = {}
    ) => {
    if(!userAuth) return;
    console.log('___userAuth___: ');
    console.log(userAuth);
    console.log('___userAuth.uid___: ' + userAuth.uid);
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        //console.log(typeof userAuth);
        const createAt = new Date();
        //console.log('additionalInfo: ' + addtionalInformation);
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...addtionalInformation,
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password); //this method has already been defined in Google Firebase Library

};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password); //this method has already been defined in Google Firebase Library

};

export const signOutUser = async () => await signOut(auth);