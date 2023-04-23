import { useState } from "react"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";


import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',    
}
//const [formFields, setFormFields] = useState(defaultFormFields);



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    //const { setCurrentUser } = useContext(UserContext);

    //console.log(formFields);

    const resetFormFields = () => {
        console.log('reset form fields');
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        //setCurrentUser(user);
        //await createUserDocumentFromAuth(user); this is gonna be done in the auth listener
   }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});

        
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try{
            const user = await signInAuthUserWithEmailAndPassword(email, password);
            //setCurrentUser(user);
            //console.log(user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
            }
            console.log(error);
        }
    
    }
    

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label='Email' type="email" required onChange={handleChange} name='email' value={email}/>

                <FormInput label='Password' type="password" required onChange={handleChange} name='password' value={password}/>
                
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    )
}
export default SignInForm;