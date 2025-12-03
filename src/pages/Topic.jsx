import React, { useContext } from 'react'
import { useState } from 'react'
import { addTopic, readTopics } from '../myBackend'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button';
import { CiCirclePlus } from "react-icons/ci";
import { AccessKeyModal } from '../components/AccessKeyModal'
import { MyAuthContext } from '../../context/AuthContext'


export const Topic = () => {
  const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [topics,setTopics] = useState([])
    const [newTopic,setNewTopic] = useState("")
    const {hasAccess} = useContext(MyAuthContext);

    useEffect(()=>{
        readTopics(setTopics)
    },[])

    const handleAddTopic=()=>{
          if(hasAccess) navigate("/addTopic");
          else setOpen(true);//még nem adott meg kulcsot
    }
    console.log(topics);
    
  return (
    <div>
      {topics && topics.length>0 && topics.map(obj=><div key={obj.id} onClick={()=>navigate("/topics/"+obj.id)}>{obj.name}</div>)}
      

      <Button onClick={handleAddTopic}><CiCirclePlus/></Button>

      {/*<input type="text" value={newTopic} onChange={(e)=>setNewTopic(e.target.value)}/>
      <button onClick={handleAddTopic}>Új témakör létrehozása!</button>*/}

      <AccessKeyModal open={open} onClose={()=>setOpen(false)} onSuccess={()=>navigate("/")}/>
    </div>
  )
}