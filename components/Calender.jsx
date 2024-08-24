import React from 'react'
import { gradients,baseRating } from '@/utils/index';
function toVietnamTime(date) {
  const vietnamOffset = 7 * 60; // Vietnam time is UTC+7 hours, which is 7 * 60 minutes
  const localOffset = date.getTimezoneOffset(); // Local time offset in minutes

  // Convert the local time to Vietnam time
  const offsetDifference = vietnamOffset - localOffset;
  const vietnamTime = new Date(date.getTime() + offsetDifference * 60 * 1000);

  return vietnamTime;
}
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
const data = {
  "15": 2, "16": 4, "17": 1, "18": 3, "19": 5,
  "20": 2, "21": 4, "22": 1, "23": 3, "24": 5
};
export default function Calender({demo}) {
  const year=2024
  const month='July'
  const monthNow=toVietnamTime(new Date(year,Object.keys(months).indexOf(month),1))
  const firstDayOfMonth= monthNow.getDay()
  const daysInMonth=new Date(year,Object.keys(months).indexOf(month)+1,0).getDate()
  const daysToDisplay= firstDayOfMonth+ daysInMonth
  const numRows=(Math.floor(daysToDisplay/7))+(daysToDisplay%7?1:0)
  return (
    <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-6'>
      {[...Array(numRows).keys()].map((row,rowIndex)=>{
        return (
          <div key={rowIndex} className='grid grid-cols-7'>
            {dayList.map((_,dayOfWeekIndex)=>{
              let dayIndex=(rowIndex*7)+dayOfWeekIndex-(firstDayOfMonth-1)
              let dayDisplay= dayIndex>0&&dayIndex<32//row=rowIndex
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
