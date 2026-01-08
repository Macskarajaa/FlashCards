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
    const inputData = {
      question: question,
      answer: answer,
    };    console.log(inputData);
    await addCard(id, inputData)
    
    navigate("/topics")
  }

  return (
    
    <div className="addcard-page">
      <div className="addcard">
        <p>Kérdés</p>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <p>Válasz</p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <button onClick={handleSubmit}>Mentés</button>
      </div>
    </div>
    
  )
}