import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export function useAuth() {
    const [token, setToken] = useState(null);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(null);

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token);
        setUserId(uid);
        const tokenExpirationDate = (expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)); //it gives total time + one hour in millisecond
        // here second expression of date is future date that is one hour ahead 
        setTokenExpirationDate(tokenExpirationDate);
        localStorage.setItem( //storing token in local storage of browser to stay logged in upon reload
            'userData', //keyname with which we store data
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpirationDate.toISOString() //toISOString converts date to string
            })
        );
    }, [])

    const logout = useCallback(() => {
        setToken(null);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    useEffect(() => { //useEffect will run after render cycle
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()) { //it will check whether expiration time > current time, if it is then stay logged in
            login(storedData.userId, storedData.token, new Date(storedData.expiration));  //it will keep user logged in until token expires
        }                                             //new Date(string) it converts from string to Date 
    }, [login])

    return { token, login, logout, userId };
}