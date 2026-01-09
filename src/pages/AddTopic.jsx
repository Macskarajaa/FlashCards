import React from 'react'
import { useState } from 'react'
import { addTopic } from '../myBackend'
import { useContext } from 'react'
import { AccessContext } from '../context/MyAccessProvider'
import { useNavigate } from 'react-router'

export const AddTopic = () => {
    const [newTopic,setNewTopic] = useState("")
    const {hasAccess,clearKey} = useContext(AccessContext)
    const navigate = useNavigate()

    const handleAdd = async ()=> {
        await addTopic(newTopic)
    }

    const handleLogout = () => {
        clearKey()
        navigate("/")
    }
  return (
     <div className="center-page">
      <input type="text" value={newTopic} onChange={(e) => setNewTopic(e.target.value)}/>
      <button onClick={handleAdd}>Új témakör hozzáadása</button>
      <button onClick={handleLogout}>Kilépés admin módból</button>
    </div>
    
  )
}