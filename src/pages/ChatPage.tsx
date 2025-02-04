import { useEffect, useState } from 'react'
import { getInComingMessages, sendMessage } from '../store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const ChatPage = () => {
  const dispatch = useAppDispatch()
 
  const inComingMessages = useAppSelector(state => state.chat.inComingMessages)
  const outGoingMessages = useAppSelector(state => state.chat.OutGoingMessages)

  const allMessages = [...outGoingMessages, ...inComingMessages ].sort((a, b) => (a.timestamp - b.timestamp))



  const [message, setMessage] = useState('')
  

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getInComingMessages({}))
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      await dispatch(sendMessage({message}));
      setMessage('');
    }
  }
  return (
    <div>
      <div>
        {inComingMessages.map((m) => (
          <div>{m.textMessage}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Новое сообщение...' value={message} onChange={(e) => {setMessage(e.target.value)}} />
      <button type='submit'>Отправить</button>
      </form>
    </div>
  )
}

export default ChatPage
