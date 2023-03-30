import { initializeApp } from 'firebase/app';


import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt : "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        //console.log(typeof userAuth);
        const createAt = new Date();
        
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
};