import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { deleteCard, deleteTopicWIthCards, readCards, readCardsOnce, readTopicById } from '../myBackend';
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { AccessKeyModal } from '../components/AccessKeyModal';
import { useContext } from 'react';
import { AccessContext } from '../context/MyAccessProvider';
import { MdDeleteForever, MdModeEditOutline } from 'react-icons/md';
import MyFlipCard from '../components/MyFlipCard';


export const Topic = () => {
  const [topicName, setTopicName] = useState("");
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading,setLoading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const {hasAccess} = useContext(AccessContext)

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readTopicById(id, setTopicName);
    readCards(id, setCards);
  }, [id]);

  const handleAddCard = () => {
    if(hasAccess) navigate("/addcard/"+id)
    else setOpen(true)
  }

  const handleDeleteCard = () => {
    console.log("ok");
    console.log(hasAccess);
    
    if(hasAccess) deleteCard(id,currentCard?.id)
  }

  const handleDeleteTopic = () => {
    if(hasAccess) {
      console.log(id);
      
      deleteTopicWIthCards(id)
      navigate("/topics")
    }
  }

  const next = () => setCurrentIndex(i => (i + 1) % cards.length);
  const prev = () => setCurrentIndex(i => (i - 1 + cards.length) % cards.length);  


  const currentCard = cards[currentIndex];
  console.log("card id " + currentCard?.id);
  
  return (
    <div className="topic-container">
      <h1 className="topic-title">{topicName}</h1>

      {cards.length === 0 ? (
        <p className="empty-list">A lista üres</p>
      ) : (
        <div className="card-container">
          <MyFlipCard
            question={currentCard?.question}
            answer={currentCard?.answer}
          />

          <div className="card-buttons">
            <button onClick={prev}><FaArrowCircleLeft size={35} /></button>
            <button onClick={next}><FaArrowCircleRight size={35} /></button>
          </div>

          <p className="card-index">
            {currentIndex + 1} / {cards.length}
          </p>
        </div>
      )}

      <div className="card-buttons">
        <button className="add-card-btn" onClick={handleAddCard}>Add Card</button>

        {hasAccess && (
          <>
            <button className="add-card-btn">Edit card</button>
            <button className="add-card-btn" onClick={handleDeleteCard}>Delete card</button>
            <button className="add-card-btn" onClick={handleDeleteTopic}>Delete topic</button>
          </>
        )}
      </div>

      <AccessKeyModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => navigate("/addcard")}
      />
    </div>
  );
};