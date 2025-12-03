import React from 'react'
import { addCard } from '../myBackend'
import { useNavigate, useParams } from 'react-router'
import { useState } from 'react'

export const AddCard = () => {
    const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  const {id} = useParams()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    let inputData = {question, answer}
    console.log(inputData);
    await addCard(id, inputData)
    navigate("/topics")
  }

  return (
    
        <form onSubmit={handleSubmit}>
            <input type='text' required onChange={(e)=>setQuestion(e.target.value)} placeholder='Kérdés'></input>
            <input type='text' required onChange={(e)=>setAnswer(e.target.value)} placeholder='Válasz'></input>
            <button type="submit">Hozzáadás</button>
        </form>
    
  )
}