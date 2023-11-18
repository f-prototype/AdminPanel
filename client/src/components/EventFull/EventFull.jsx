import React from 'react'
import { useSelector } from 'react-redux';
import cls from './EventFull.module.scss'

export const EventFull = () => {
    const count = useSelector((state) => state.counter);
  return (
    <div className={cls.container}>
        <h1>{count.data.event}</h1>
        <div className={cls.box}>
        <div className={cls.mainInfo}>
            <div className={cls.logo}><img src={`/img/events/${count.data.img}.jpeg`} alt='img'></img></div>
            <div>{count.data.date}</div>
            <div>{count.data.city}</div>
            <div>Organizator</div>
        </div>
        <div className={cls.description}><p> Описание Описание Описание Описание Описание Описание Описание Описание</p></div>
        </div>
    </div>
  )
}
