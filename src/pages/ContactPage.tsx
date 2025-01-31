import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactPage = () => {
    const [contact, setContact] = useState('')
    const navigate = useNavigate()
    const handleContact = () => {
        if(contact) {
            navigate(`/dialog/${contact}`, {state:{contact}})
        }
    }
  return (
    <div>
      <h2>Введите номер контакта</h2>
      <input type='number' placeholder='Номер контакта' value={contact} onChange={(e) => {setContact(e.target.value)}}/>
      <button onClick={handleContact} >Начать диалог</button>
    </div>
  )
}

export default ContactPage
