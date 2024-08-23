import React from 'react'

export default function Main(props) {
    const {children}=props
  return (
    <main className='p-4 sm:p-8 flex-1 flex flex-col'> 
        {children}
    </main>
  )
}
