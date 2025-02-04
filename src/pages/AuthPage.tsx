import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/hooks'
import { setCredentials } from '../store/slices/chatSlice'

const AuthPage = () => {
    const [idInstance, setIdInstance] = useState(0)
    const [apiTokenInstance, setApiTokenInstance] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
      const id = e.target.value
      setIdInstance(Number(id))
    }
    const handleSubmit = (e:React.FormEvent) => {
      e.preventDefault()
      
        if(idInstance&&apiTokenInstance) {
          dispatch(setCredentials({ idInstance, apiTokenInstance }))
     
          navigate('/contact')
        }
    }
  return (
    <div>
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
      <input type='number' placeholder='Введите idInstance' value = {idInstance} onChange={handleChange} />
      <input type='text' placeholder='Введите apiTokenInstance' value = {apiTokenInstance} onChange={(e) => {setApiTokenInstance(e.target.value)}} />
      <button type='submit' >Войти</button>
      </form>
    </div>
  )
}

export default AuthPage
