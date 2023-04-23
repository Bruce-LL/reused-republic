import { createContext, useState} from "react";

// inside, is the actural value you want to acess
export const UserContext = createContext({
    currentUser: null, 
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};