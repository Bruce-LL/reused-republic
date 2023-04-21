import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"; 
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";

const SignIn = () => {
    //the userEffect here is implemented in a different way from the course. but same functionality. the way introduce in the course will cause a 'destroy is not a function' error .
    // useEffect(() => {
    //     getRedirectResult(auth)
    //         .then((response) => {
    //             createUserDocumentFromAuth(response.user)
    //                 .then((userDocRef)=>{
    //                     console.log('created a document with google redirection');
    //                 })
    //                 .catch((error)=>{console.log('ERROR when creating a document with google redirection')});
    //         })
    // }, []);  // with the empty array '[]' here, the useEffect method will be run only one time when the signin component is mounted/ re-mounted
             // without the useEffect method here, we cannot do createUserDocumentFromAuth, for logGoogleRedirectUser, because once the page is redirected, this compnent is un-mounted. succeeding code is not gonna be run

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
   }

//    const logGoogleRedirectUser = async () => {
//     const {user} = await signInWithGoogleRedirect(); 
//     const userDocRef = await createUserDocumentFromAuth(user);
//    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with  Google Popup
            </button>
            <SignUpForm/>
            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button> */}
        </div>
    )
}

export default SignIn;


