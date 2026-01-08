import React, { useContext, useEffect, useState } from 'react'
import { readTopicsOnce } from '../myBackend';
import { AccessKeyModal } from '../components/AccessKeyModal';
import { useNavigate } from 'react-router';
import { AccessContext } from '../context/MyAccessProvider';

export const Topics = () => {
    const [topics, setTopics] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const {hasAccess} = useContext(AccessContext);

    useEffect(() => {
        readTopicsOnce(setTopics);
    }, []);

    const handleAddTopic = () => {
        if (hasAccess) {
            navigate("/addtopic");
        } else {
            setOpen(true);
        }
    }

    return (
    <div>
        <div className='topics-container'>
            <h1 className='topics-title'>Topics</h1>
            <div className='topics-list'>
                {topics.map(obj => (
                    <button
                    key={obj.id}
                    className='topic-button'
                    onClick={() => navigate("/topic/" + obj.id)}
                    >
                    {obj.name}
                    </button>
                ))}
            </div>
            <button className='add-topic-button' onClick={handleAddTopic}> Add new topic</button>
            </div>
            <AccessKeyModal open={open} onClose={()=> setOpen(false)} onSuccess={()=>navigate("/addtopic")} />  
    </div>
  )
}

