import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/hooks'
import { setChatId} from '../store/slices/chatSlice'

const ContactPage = () => {
    const [contact, setContact] = useState('')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
        if(contact) {
          const chatId = `${contact}@c.us`
        
          dispatch(setChatId(chatId))
            navigate(`/chat/${contact}`, {state:{contact}})
        }
    }
  return (
    <div>
      <h2>Введите номер контакта</h2>
      <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Номер контакта' value={contact} onChange={(e) => {setContact(e.target.value)}}/>
      <button type='submit' >Начать диалог</button>
      </form>
    </div>
  )
}

export default ContactPage
