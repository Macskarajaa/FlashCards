import React, { useContext, useState } from 'react'
import { MyAuthContext } from '../../context/AuthContext';
import { Button } from '@mui/joy';
import { useNavigate } from 'react-router';

export const AddTopic = () => {
const [name, setName] = useState("");
const [hasAccess, clearKey] = useContext(MyAuthContext)
const navigate = useNavigate();

const handleLogout=()=>{
    clearKey()
    navigate("/")
  return (
    <div>
        itt lesz az űrlap...

        {hasAccess &&
        <Button onClick={handleLogout()}>kilépés admin módból</Button>
    
    }
    </div>
  )
}

}

