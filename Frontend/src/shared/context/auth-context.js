import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => { },
    logout: () => { },
});

//create context is used to pass data between components without using props