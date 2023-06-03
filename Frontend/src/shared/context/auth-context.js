import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    login: () => { },
    logout: () => { },
});

//create context is used to pass data between components without using props