import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { DocContextType } from "./@types.context";

const GlobalContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {},
    user: null,
    setUser: (value: any) => {},
    isLoading: false,
});

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then((response: any) => {
            if (response) {
                setIsLoggedIn(true)
                setUser(response)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)

        })
    }, [])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;