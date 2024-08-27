import React from 'react'
import { Fugaz_One } from "next/font/google";
import { FaGooglePlus } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ['400'] });
export default function Button({ text, dark, full, clickHandler, icon }) {
  const { signInWithGoogle } = useAuth()
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <button onClick={() => { !icon ? clickHandler() : signInWithGoogle() }} className={'flex rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-indigo-200 ' +
      (dark ? ' text-white bg-indigo-600 ' : ' text-indigo-600 ') + (full ? 'grid place-items-center w-full' : '')}>
      <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + fugaz.className}>
        {text}
      </p>
      {icon ?
        (<div className='flex h-[48px]'>
          <FaGooglePlus className='text-2xl ml-2 my-auto mr-6 text-indigo-500' />
        </div>) : ''
      }
    </button>
  )
}
