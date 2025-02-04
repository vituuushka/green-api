import { useState } from 'react'
import { sendMessage } from '../store/slices/chatSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const ChatPage = () => {
  const dispatch = useAppDispatch()
  const messages = useAppSelector(state => state.chat.messages)
  const [message, setMessage] = useState('')
  
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
        {messages.map((m) => (
          <div>{m.textMessage}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Новое сообщение...' value={message} onChange={(e) => {setMessage(e.target.value)}} />
      <button type='submit' >Отправить</button>
      </form>
    </div>
  )
}

export default ChatPage
