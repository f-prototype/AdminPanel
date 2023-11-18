import React, { useState } from 'react'
import { useEffect } from 'react'
import { Event } from '../Event/Event'
import cls from './EventList.module.scss'

export const EventsList = () => {
    const [list,setList] = useState([])
    useEffect( ()=>{
        (async () =>{
            const res = await fetch("http://localhost:5000/events")
            const result = await res.json();
            setList(result);
        })();
         
    }, [])

    const sortByName = async() => {
        const res = await fetch("http://localhost:5000/events&sort=name")
            const result = await res.json();
            return result
    }
    const onChange = async (event) => {
        let sortedEvents;
        event.target.value === 'date' ? sortedEvents = list.sort((a,b) => {
            let firstDate =  new Date(a.date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            let SecondDate =  new Date(b.date.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
           return firstDate - SecondDate;
        }): sortedEvents = await sortByName();
        setList([...sortedEvents]);
    }
  return (
   <div className={cls.container}>
    <h1>Мероприятия</h1>
    <label htmlFor="sort-select" className={cls.label}><p>Сортировать по: </p>
    <select name="sort" id="sort-select" onChange={onChange}>
        <option value="" disabled selected>-- По умолчанию --</option>
         <option value="date">Дате</option>
         <option value="name">Названию</option>
    </select>
    </label>
    { list && list.map((item, index) => {
        return <Event inf={item} key={item._id}/>
    })}
   </div>
  )
}
