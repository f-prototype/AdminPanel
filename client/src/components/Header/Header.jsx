import React from 'react'
import cls from './Header.module.scss'
import logo from '../../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Modal } from '../Modal/Modal'

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuth,setIsAuth] = useState(false);
    const navigate = useNavigate();
    const closeModal = () => {
        setIsOpen(false);
    }
  return (
    <header className={cls.header}>
        <Link to='/'><img src={logo} alt="logo" className={cls.logo} /></Link>
        {isAuth ? <button className={cls.btn} onClick={() => {
          setIsAuth(false)
          navigate('/')
        }}>Выйти</button> : <button className={cls.btn} onClick={() => {
          setIsOpen(prev => !prev)}}>Авторизация</button>}
        
        {isOpen && <Modal close={closeModal} setAuth={setIsAuth}/>}
    </header>
  )
}
