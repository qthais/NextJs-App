'use client'
import React, { useState } from 'react'
import { Fugaz_One } from "next/font/google";
import Button from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { FaGooglePlus } from 'react-icons/fa';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const { signup, login } = useAuth()
  const handleSubmit = async () => {
    if (!email || !password || password.length < 6) {
      return
    }
    setAuthenticating(true)
    try {
      if (isRegister) {
        console.log('Signing up a new user')
        await signup(email, password)
      } else {
        console.log("Logging in existing user")
        await login(email, password)
      }
    } catch (err) {
      console.log(err.message)
    } finally {
      setAuthenticating(false)
    }

  }
  return (
    <div className=' flex flex-col flex-1 justify-center 
    items-center gap-4'>
      <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + fugaz.className}>{!isRegister ? 'Login' : 'Register'}</h3>
      <p>You&#39;re one step away!</p>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border 
      border-solid border-indigo-400 rounded-full hover:border-indigo-600 focus:border-indigo-600 outline-none' type="email" placeholder='Email' />
      <input value={password} onChange={(e) => {
        setPassword(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border 
      border-solid border-indigo-400 rounded-full hover:border-indigo-600 focus:border-indigo-600 outline-none' type="password" placeholder='Password' />
      <div className='max-w-[400px] w-full mx-auto'>
        <Button clickHandler={handleSubmit} text={authenticating ? 'Submitting' : "Submit"} full />
      </div>
      <button onClick={() => {
        setIsRegister(!isRegister)
      }} className='text-center'>{isRegister ? 'Already have an account? ' : 'Don\'t have an account? '} <span className='text-indigo-600'>{isRegister ? 'Sign in' : 'Sign up'}</span></button>
      <p className='text-xl'>Or</p>
      <Button icon text='Sign in with Google'/>
    </div>
  )
}
