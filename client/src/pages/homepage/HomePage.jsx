import React from 'react'
import { EventsList } from '../../components/EventsList/EventsList';
import cls from './Homepage.module.scss'

export const HomePage = () => {
    async function onSubmit(e) {
        e.preventDefault();
         const res = await fetch("http://localhost:5000/events")
          const result = await res.json();
          console.log(result)
      }
  return (
    <div className={cls.container}>
        <EventsList/>
    </div>
  )
}