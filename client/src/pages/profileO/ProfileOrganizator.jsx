import React, { useState } from 'react'
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import cls from './ProfileOrganizator.module.scss'

export const ProfileOrganizator = () => {
    const count = useSelector((state) => state.counter.selectedOrganizator);
    const [block, setBlock] = useState(true);
    const form = useRef(null);
    const [dataValue, setDataValue] = useState({
          gender: count.data.gender,
          date: count.data.date,
          country: count.data.country,
          tel:count.data.tel,
          _id:count.data._id
    });
    const clickBtn = async() => {
      if(form.current.second_password.value !== form.current.password.value) return;
      setBlock(prev => !prev);
      if(!block) {
        const target = form.current;
        const data = {
          name: target.name.value,
          gender: target.gender.value,
          date: target.date.value,
          country: target.country.value,
          tel:target.tel.value,
          email:target.email.value,
          _id:target._id.value
        }
        const response = await fetch('http://localhost:5000/organizers/edit', {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(data)
      }
    }
    const sendData = async(e) => {
      console.log('ok')
      e.preventDefault();
    }
  return (
    <form onSubmit={sendData} ref={form} className={cls.container}><h1>Мой профиль</h1>
    <div className={cls.infoContainer}>
      <div className={cls.mainInfo}>
        <input disabled={block} name='name' placeholder='ФИО'/>    
        <input disabled={block} name='gender'  value = {dataValue.gender} onChange={(e) => setDataValue(prev => {return{...prev,gender:e.target.value}})}/>   
        <input disabled={block} name='date' value = {dataValue.date} onChange={(e) => setDataValue(prev => {return{...prev,date:e.target.value}})}/>   
        <input disabled name='_id' value ={dataValue._id} onChange={(e) => setDataValue(prev => {return{...prev,_id:e.target.value}})}/>    
        <input disabled={block} name='country' value ={dataValue.country} onChange={(e) => setDataValue(prev => {return{...prev,country:e.target.value}})}/>
        <input disabled={block} name='tel' value ={dataValue.tel} onChange={(e) => setDataValue(prev => {return{...prev,tel:e.target.value}})}/>
        <input disabled={block} name='email' placeholder='Email'/>
      </div>
    <div className={cls.secondaryInfo}>
    <div className={cls.logo}><img src={`/img/events/${count.data.image}`} alt='logo'/></div>
    <input name='password' value={count.data.password} type='password'/>
    <input name='second_password' placeholder='Повторите пароль' type='password'/>
    {
      block ?  <input onClick={() => {
        setBlock(false)}} type='button' value='Редактировать' className={cls.btn}/> : <input onClick={clickBtn} value='Сохранить' type='submit' className={cls.btn}/>
      }
    </div>
    </div>
    </form>
  )
}
