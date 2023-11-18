import React from 'react'
import cls from './Event.module.scss'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { selectData } from '../../slices/counterSlice';

export const Event = ({inf}) => {
    const dispatch = useDispatch();
  return (
    <Link to={`/events/${inf._id}`} className={cls.box} onClick={() => {dispatch(selectData(inf))}}>
        <div className={cls.logoContainer}><div className={cls.logo}><img src={`/img/events/${inf.img}.jpeg`} alt='img'></img></div></div>
        <div>{inf.event}</div>
        <div className={cls.date}>{inf.date}</div>
    </Link>
  )
}
