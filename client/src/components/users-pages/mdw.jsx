import React, { useEffect, useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { updateProfile } from '../../actions/user'
import { useParams } from 'react-router-dom'
import Inp from '../Inputs/Inp'

const ModalWindoe = ({active, setActive, closeModalWindow}) => {
    
    const user = useSelector(state => state.user.currentUser)
    let { id } = useParams()
    const [avatar, setAvatar] = useState('')
  
    useEffect(() => {
      setName(user.avatar);
    }, [])
  
    const handleUpdateAvatar = (e) => {
      e.preventDefault()
      
    }

    return (
    <div className={active ? "modal-window active" : "modal-window"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content-window active" : "modal__content-window"} onClick={e => e.stopPropagation()} >
            <form className='form-modal' onSubmit={(e) => handleUpdateAvatar(e)}>
                <span className='title-modal'>Изменение аватара</span>
                <span className='spn-modal'>Загрузите изображение</span>
                <Inp className="inp-modal" id="inp one" type="text"  setValue={setName} value={name} />
                <button className='file-user' type='submit' onClick={closeModalWindow}>Изменить</button>
            </form>
            </div>
        </div>
  )
}

export default ModalWindoe