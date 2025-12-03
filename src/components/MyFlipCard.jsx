import React from 'react'
import ReactFlipCard from 'reactjs-flip-card'


const MyFlipCard = ({currentCard, currentIndex}) => {
    
 currentCard && console.log(currentCard)
  return (
    <div className='cardHolder'>
        
        <ReactFlipCard
                flipTrigger={'onClick'}
                flipCardCss='flipCard'
                containerCss='flipContainer'
                frontCss='FCFront'
                backCss='FCBack'
                frontComponent={<div>{currentCard?.question}<span title={currentIndex+1} className='cardNumber'>{currentIndex+1}</span></div>}
                backComponent={<div>{currentCard?.answer}<span title={currentIndex+1} className='cardNumber'>{currentIndex+1}</span></div>}
        />
        
    </div>
  )
}

export default MyFlipCard