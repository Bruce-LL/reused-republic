import { createContext, useState, useEffect, useReducer} from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";

import  createAction  from "../utils/reducer/reducer.utils";
// inside, is the actural value you want to acess
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const INITIAL_STATE = {
    currentUser: null,
}

const userReducer = (state, action) => {
    console.log('dispatched');
    console.log(action);
    const {type, payload} = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            };
        default: 
            throw new Error(`unhandled type ${type} in userReducer`);
    } 
}

export const UserProvider = ({children}) => {
    //const [currentUser, setCurrentUser] = useState(null);
    const [{currentUser}, dispatcher] = useReducer(userReducer, INITIAL_STATE);
    console.log(currentUser);

    const setCurrentUser = (user) => {
        dispatcher(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {  //hook for side effect, which means it can happen outside this component
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user); // in this method, the user document will be created only if the this user don't exist yet on database
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};