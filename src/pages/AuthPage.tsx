import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
    const [idInstance, setIdInstance] = useState('')
    const [apiTokenInstance, setApiTokenInstance] = useState('')
    const navigate = useNavigate()
    const handleAuth = () => {
        if(idInstance&&apiTokenInstance) {
            navigate('/contact')
        }
    }
  return (
    <div>
      <h2>Авторизация</h2>
      <input type='text' placeholder='Введите idInstance' value = {idInstance} onChange={(e) => {setIdInstance(e.target.value)}} />
      <input type='text' placeholder='Введите apiTokenInstance' value = {apiTokenInstance} onChange={(e) => {setApiTokenInstance(e.target.value)}} />
      <button onClick={handleAuth} >Войти</button>
    </div>
  )
}

export default AuthPage
