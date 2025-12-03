import React from 'react'
import { useNavigate } from 'react-router'

export const Card = ({}) => {
const navigate = useNavigate()

  return (
    <div>
      
      <button onClick={()=>navigate("/addnew")}>AddNew card</button>
    </div>
  )
}