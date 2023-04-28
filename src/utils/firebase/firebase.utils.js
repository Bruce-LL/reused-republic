import { initializeApp } from 'firebase/app';


import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
     } from 'firebase/auth'; 

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {  // objectsToAdd, refers to the shop-data
    const collectionRef = collection(db, collectionKey);

    // batch: to upload the entire objectsToAdd to the collection within one transaction
    const batch = writeBatch(db);  //also can attach read, deleted...
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

//the way of fetching categories from google Firebase varies from version to version
// don't need to dig deep to understand what it really means here, use just it at this moment
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;

}




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

// user signin, signout are considered as auth state change. when the auth state changs, callback method would be call. this callback method could be defined accodring to the circumstances
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);