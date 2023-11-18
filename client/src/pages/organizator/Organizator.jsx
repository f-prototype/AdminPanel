import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './Organizator.module.scss'

export const Organizator = () => {
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  const count = useSelector((state) => state.counter.selectedOrganizator);
  return (
    <div className={cls.container}>
      <h1>Окно Организатора</h1>
      <div className={cls.infoBox}>
        <div className={cls.main}>
          <div className={cls.logo}><img src={`/img/events/${count.data.image}`} alt='logo'/></div>
          <button onClick={() => navigate(`/organizator/${count.data._id}`)} className={cls.btn}>Мой профиль</button>
        </div>
        <div className={cls.secondary}>
          <h3>Добро пожаловать {count.data.gender === 'мужской'? 'Mrs': "Ms"}. Организатор</h3>
          <p>Время работы: {date.getHours()> 10 && date.getHours() < 18 ? '11.01-18.00': date.getHours()> 18 && date.getHours() < 24 ? '18.01 – 24.00' : '9.00-11.00'}</p>
          <div className={cls.secondaryLink}>Мероприятия</div>
          <div className={cls.secondaryLink}>Участники</div>
          <div className={cls.secondaryLink}>Жюри</div>
        </div>
      </div>
    </div>
  )
}
