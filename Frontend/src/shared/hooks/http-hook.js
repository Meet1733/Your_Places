import { useState, useCallback, useRef, useEffect } from "react";

export function useHttpClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeHttpRequests = useRef([]); //store data across rerender cycle

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setIsLoading(true);

        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method, // method: method
                headers,
                body,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if (!response.ok) { //if status code is 400's or 500's it will run
                throw new Error(responseData.message); //if response code is 400's or 500's it will throw an error earlier it redirects 
            }
            setIsLoading(false);
            return responseData;

        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, [])

    function clearError() {
        setError(null);
    }

    useEffect(() => {
        return () => { //cleanup function
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        }
    }, [])

    return { isLoading, error, sendRequest, clearError };
}