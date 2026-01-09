import React from 'react'
import { useNavigate } from 'react-router'

export const Card = ({}) => {
const navigate = useNavigate()

  return (
  <div className="center-page">
      <button onClick={() => navigate("/addnew")}>AddNew card</button>
    </div>
  )
}