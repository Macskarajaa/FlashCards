import React from 'react'
import ReactFlipCard from 'reactjs-flip-card'


const MyFlipCard = ({question, answer}) => {
    
  return (
    <div className='cardHolder'>
        
        <ReactFlipCard
                flipTrigger={'onClick'}
                flipCardCss='flipCard'
                containerCss='flipContainer'
                frontCss='FCFront'
                backCss='FCBack'
            frontComponent={<div>{question}</div>}
            backComponent={<div>{answer}</div>}
        />
        
    </div>
  )
}

export default MyFlipCard