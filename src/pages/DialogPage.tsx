import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const DialogPage = () => {
  const { contact } = useParams();
  const [message, setMessage] = useState('')
  const [messagesList, setMessagesList] = useState<string[]>([])
  const sendMessage = () => {
    if (message.trim()) {
      setMessagesList([...messagesList, `${contact}: ${message}`]);
      setMessage("");
    }
  };
  return (
    <div>

      <div>
        {messagesList.map((m) => (
          <div>{m}</div>
        ))}
      </div>
      <input type='text' placeholder='Новое сообщение...' value={message} onChange={(e) => {setMessage(e.target.value)}} />
      <button onClick={sendMessage} >Отправить</button>
    </div>
  )
}

export default DialogPage
