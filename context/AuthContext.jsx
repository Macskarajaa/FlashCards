import { createContext, useState } from "react";
import { sha1 } from "../src/utils";

export const MyAuthContext = createContext();

const STORED_HASH="4ff45c90513615956a43e0ae222cf51f921d0667"

export const AuthProvider = ({children}) => {
    const [hasAccess, setHasAccess]=useState(false)

    const verifyKey = async (key) =>{
        const hash = await sha1(key);
        const result = hash === STORED_HASH;//true vagy false
        if(result) setHasAccess(result);
        return result;//fontos lesz a modalnak
    }
    const clearKey = () => {
        setHasAccess(false);
    }

    return(
        <MyAuthContext.Provider value={{hasAccess,setHasAccess,STORED_HASH, verifyKey, clearKey}}>
            {children}
        </MyAuthContext.Provider>
    )
}