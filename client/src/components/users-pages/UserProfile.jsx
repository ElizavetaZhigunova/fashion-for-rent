import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import './style.css'
import ModalWindow from './ModalWindoe'

const UserProfile = () => {

  const user = useSelector(state => state.user.currentUser)

  const [modalActive, setModalActive] = useState(false)

  const closeModalWindow = () => {
    setModalActive(false)
}

  return (
    <>
      <span className='user-id'>id: {user.id}</span>
      <div className="photo-profile-container">
        <div className="photo-user-profile">
          {user.photo}
        </div>
        <div className="right-side-prof">
          <span className='info-abaout-photo'>Пожалуйста, загрузите фотографию, <br />
            которая показывает ваше лицо. <br />
            Четкие фотографии важны, чтобы члены нашего<br />
            сообщества могли больше доверять друг другу.
          </span>
          <label className='file-user' htmlFor="file-user">Загрузить фотографию</label>
          <input type="file" id='file-user' name='image' accept='image/*'/>
        </div>
      </div>
      <div className="user-info-prof">
        <div className="user-info-prof-container">
          <div className='info-user'>
            <span className="title">Имя</span>
            <span className='current-user'>{user.name}</span>
          </div>
          <div className='info-user'>
            <span className="title">Фамилия</span>
            <span className='current-user'>{user.lastname}</span>
          </div>
          <div className='info-user'>
            <span className="title">E-mail</span>
            <span className='current-user'>{user.email}</span>
          </div>
          <div className='info-user'>
            <span className="title">Номер телефона</span>
            <span className='current-user'>{user.phone}</span>
          </div>
        </div>
      </div>
      <div className="change-info" onClick={() => setModalActive(true)}>Редактировать профиль</div>
    <ModalWindow active={modalActive} setActive={setModalActive} closeModalWindow={closeModalWindow} />
    </>
  )
}

export default UserProfile