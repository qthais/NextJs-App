'use client'
import React,{useState} from 'react'
import { gradients,baseRating } from '@/utils/index';
import { Fugaz_One } from 'next/font/google';
import { FaChevronCircleLeft,FaChevronCircleRight } from 'react-icons/fa';
const fugaz = Fugaz_One({ subsets: ["latin"],weight:['400'] });
// function toVietnamTime(date) {
//   const vietnamOffset = 7 * 60; // Vietnam time is UTC+7 hours, which is 7 * 60 minutes
//   const localOffset = date.getTimezoneOffset(); // Local time offset in minutes

//   // Convert the local time to Vietnam time
//   const offsetDifference = vietnamOffset - localOffset;
//   const vietnamTime = new Date(date.getTime() + offsetDifference * 60 * 1000);

//   return vietnamTime;
// }
const months = {
  January: 'Jan',
  February: 'Feb',
  March: 'Mar',
  April: 'Apr',
  May: 'May',
  June: 'Jun',
  July: 'Jul',
  August: 'Aug',
  September: 'Sept',
  October: 'Oct',
  November: 'Nov',
  December: 'Dec'
};
const monthsArr=Object.keys(months)

const now = new Date();

const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function Calender({demo,completeData,handleSetMood}) {
  const now = new Date()
  const currentMonth=now.getMonth()
  const [selectedMonth,setSelectedMonth]=useState(monthsArr[currentMonth])
  const [selectedYear,setSelectedYear]=useState(now.getFullYear())
  const monthNow=new Date(selectedYear,monthsArr.indexOf(selectedMonth),1)
  const firstDayOfMonth= monthNow.getDay()
  const daysInMonth=new Date(selectedYear,monthsArr.indexOf(selectedMonth)+1,0).getDate()
  const daysToDisplay= firstDayOfMonth+ daysInMonth
  const numRows=(Math.floor(daysToDisplay/7))+(daysToDisplay%7?1:0)
  const numericMonth=monthsArr.indexOf(selectedMonth)
  const data=completeData?.[selectedYear]?.[numericMonth]||{}
  const handleIncrementMonth=(val)=>{
    if(numericMonth+val<0){
      setSelectedYear(curr=>curr-1)
      setSelectedMonth(monthsArr[11])
    }else if(numericMonth+val>11){
      setSelectedYear(curr=>curr+1)
      setSelectedMonth(monthsArr[0])
    }else{
      setSelectedMonth(monthsArr[numericMonth+val])
    }
  }
  return (
    <div className='flex flex-col gap-4'>
    <div className='grid grid-cols-3 gap-4'>
      <button className='flex justify-center' onClick={()=>{
        handleIncrementMonth(-1)
      }}><FaChevronCircleLeft className="text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"/></button>
      <p className={'text-center capitalized textGradient '+fugaz.className}>{selectedMonth} {selectedYear}</p>
      <button className='flex justify-center' onClick={()=>{
        handleIncrementMonth(1)
      }}><FaChevronCircleRight className="text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"/></button>
    </div>
    <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-6'>
      {[...Array(numRows).keys()].map((row,rowIndex)=>{
        return (
          <div key={rowIndex} className='grid grid-cols-7 gap-1'>
            {dayList.map((_,dayOfWeekIndex)=>{
              let dayIndex=(rowIndex*7)+dayOfWeekIndex-(firstDayOfMonth-1)
              let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true;
              // let dayDisplay= dayIndex>daysInMonth?false:(rowIndex===0&& dayOfWeekIndex<firstDayOfMonth)?false:true
              let isToday= dayIndex===now.getDate()
              if(!dayDisplay){
                return(
                  <div key={dayOfWeekIndex} className='bg-white'>
                  </div>
                )
              }
              let color=demo?
              gradients.indigo[baseRating[dayIndex]]
              :dayIndex in data ? gradients.indigo[data[dayIndex]]:'white'
              return (
                <div style={{background: color}} className={
                  'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg '
                  +(isToday?'border-indigo-400 ':'border-indigo-100 ')
                  +(color==='white'?'text-indigo-400':'text-white')} key={dayOfWeekIndex}>
                  <p>{dayIndex}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
    </div>
  )
}
