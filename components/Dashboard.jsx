import React from 'react'
import { Fugaz_One } from "next/font/google";
import Calender from './Calender';
const fugaz = Fugaz_One({ subsets: ["latin"],weight:['400'] });
export default function Dashboard() {
  const statuses={
    num_days:14,
    time_remaining:'13:14:26',
    date:(new Date()).toDateString()
  }
  const moods = {
    'Happy': '😀',
    'Sad': '🙃',
    'Existing': '😇',
    'Good': '😉',
    'Elated': '🥰',
  };
  
  return (
    <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-62'>
      <div className='grid grid-cols-3 p-4 bg-indigo-50 text-indigo-500 rounded-lg'>
        {Object.keys(statuses).map((s,i)=>{
          return (
            <div key={i} className='p-4 flex flex-col gap-1 sm:gap-2'>
              <p className='font-medium uppercase text-xs sm:text-sm truncate'>{s.replaceAll('_',' ')}</p>
              <p className={'text-base sm:text-lg truncate '+fugaz.className}>{statuses[s]}</p>
            </div>
          )
        })}
      </div>
      <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center '+fugaz.className}>
        How do you <span className='textGradient'>feel</span> today?
      </h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((m,i)=>{
          return(
            <button className={'p-4 px-10 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 flex flex-col flex-1 items-center gap-2'} key={i}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[m]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base '+fugaz.className}>{m}</p>
            </button>
          )
        })}
      </div>
      <Calender/>
    </div>
  )
}
