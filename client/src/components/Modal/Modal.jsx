import React, { useEffect, useState } from 'react'
import cls from './Modal.module.scss'
import { useNavigate } from 'react-router-dom'
import  ReCAPTCHA  from "react-google-recaptcha";
import { useDispatch } from 'react-redux';
import { selectOrgatizator } from '../../slices/counterSlice';

export const Modal = ({close, setAuth}) => {
  const navigate = useNavigate();
  const [tries, setTries] = useState(3);
  const dispatch = useDispatch();

  const autorization = async (e) => {
    const data = {
      _id: e.target.id.value,
      password: e.target.password.value,
    };
    e.preventDefault();
    const res = await fetch("http://localhost:5000/autorization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await res.json();
    dispatch(selectOrgatizator(result))
    console.log(result);
    setAuth(true);
    if(result.success === false) setTries(prev => prev-1);
    if(result.role === 'organizers') {
      navigate('/organizator');
      close()
    }
  }

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = React.useState(false)
  function onChange(value) {
    setIsCaptchaSuccess(true)
    console.log("captcha value: ", value);
  }
   useEffect(() => {
    if(tries <= 0) {
      setTries(0);
      setIsCaptchaSuccess(false);
      setTimeout(() => {
        setIsCaptchaSuccess(true);
      },10000)
    }
   },[tries])
  return (
    <div className={cls.container} onClick={close} >
        <form className={cls.modal} onSubmit={autorization} onClick={(e) => e.stopPropagation()}>
          <h3>Вход</h3>
            <input type='text' placeholder='id' name='id'/>
            <input type='password' placeholder='password' name='password'/>
        <ReCAPTCHA
          sitekey={'6LeKKhMpAAAAAJY9AoaxgWkuhgPeB7rMGBXg-WFa'}
          onChange={onChange}
          />
            <button disabled={!isCaptchaSuccessful} className={cls.btn}>Войти</button>
        </form>
    </div>
  )
}
