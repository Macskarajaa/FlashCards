import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

export const AccessContext = createContext()

//const API_URL = "http://localhost:3001"

export const MyAccessProvider = ({children}) => {
    const [hasAccess,setHasAccess] = useState(false)
    const [loading,setLoading] = useState(false)

    console.log(hasAccess);
    

    useEffect(()=>{
        const checkAuth = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/protected`,{withCredentials:true})
                setHasAccess(true)
            } catch (error) {
                console.log(error);
                setHasAccess(false)
            }finally{
                setLoading(false)
            }
        }


        checkAuth()
    },[])

    const verifyKey = async (key) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/login`,{key},{withCredentials:true})
            setHasAccess(true)
            return true;
        }catch (error) {
            console.log(error);
            return false;
        }
    }
    
    const clearKey = async () => {
        await axios.post(`${import.meta.env.VITE_API_URL}/logout`,{},{withCredentials:true})
        setHasAccess(false)
    }

  return (
    <AccessContext.Provider value={{hasAccess, verifyKey, clearKey}}>
        {children}
    </AccessContext.Provider>
  )
}