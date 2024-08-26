'use client'
import React,{useEffect,useState} from 'react'
import Login from './Login';
import Loading from './loading';
import { Fugaz_One } from "next/font/google";
import Calender from './Calender';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
const fugaz = Fugaz_One({ subsets: ["latin"],weight:['400'] });
export default function Dashboard() {
  const {currentUser,userDataObj,setUserDataObj,loading}=useAuth()
  const [data,setData]=useState({})
  const countValues=()=>{

  }
  const handleSetMood=async(mood)=>{
    const now=new Date()
    const day=now.getDate()
    const month=now.getMonth()
    const year=now.getFullYear()

    try{
      const newData={...userDataObj}
      if(!newData?.[year]){
        newData[year]={}
      }
      if(!newData?.[year]?.[month]){
        newData[month]={}
      }
      newData[year][month][day]=mood
      setData(newData)
      setUserDataObj(newData)
      const docRef=doc(db,'users',currentUser.uid)
      const res= await setDoc(docRef,{
        [year]:{
          [month]:{
            [day]:mood
          }
        }
      },{merge:true})
    }catch(err){
      console.log('fail to set Data ',err.message)
    }
  }
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
  useEffect(()=>{
    if(!currentUser||!userDataObj){
      return
    }
    setData(userDataObj)
  },[currentUser,userDataObj])

  if(!currentUser){
    return (<Login/>)
  }
  if(loading){
    return(<Loading/>)
  }
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
            <button onClick={()=>{
              const currentMoodValue=i+1
              handleSetMood(currentMoodValue)
            }} className={'p-4 px-10 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-200 flex flex-col flex-1 items-center gap-2'} key={i}>
              <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[m]}</p>
              <p className={'text-indigo-500 text-xs sm:text-sm md:text-base '+fugaz.className}>{m}</p>
            </button>
          )
        })}
      </div>
      <Calender data={data} handleSetMood={handleSetMood}/>
    </div>
  )
}
