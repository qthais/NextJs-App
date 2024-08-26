'use client'
import React,{useState} from 'react'
import { gradients,baseRating } from '@/utils/index';
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
  const [selectedMonth,setSelectedMonth]=useState(Object.keys(months)[currentMonth])
  const [selectedYear,setSelectedYear]=useState(now.getFullYear())
  const monthNow=new Date(selectedYear,Object.keys(months).indexOf(selectedMonth),1)
  const firstDayOfMonth= monthNow.getDay()
  const daysInMonth=new Date(selectedYear,Object.keys(months).indexOf(selectedMonth)+1,0).getDate()
  const daysToDisplay= firstDayOfMonth+ daysInMonth
  const numRows=(Math.floor(daysToDisplay/7))+(daysToDisplay%7?1:0)
  const numericMonth=Object.keys(months).indexOf(selectedMonth)
  const data=completeData?.[selectedYear]?.[numericMonth]||{}
  const handleIncrementMonth=(val)=>{
    
  }
  return (
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
  )
}
