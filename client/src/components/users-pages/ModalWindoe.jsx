import React, { useState } from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import { updateProfile } from '../../actions/user'
import { useParams } from 'react-router-dom'
import Inp from '../Inputs/Inp'

const ModalWindoe = ({active, setActive, children, closeModalWindow}) => {
    
    const user = useSelector(state => state.user.currentUser)
    let { id } = useParams()
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
  
  
    const handleUpdateName = (e) => {
      e.preventDefault()
      updateProfile({id, name, lastname, email, phone})
    }

    return (
    <div className={active ? "modal-window active" : "modal-window"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content-window active" : "modal__content-window"} onClick={e => e.stopPropagation()} >
            <form className='form-modal' onSubmit={(e) => handleUpdateName(e)}>
                <span className='title-modal'>Редактирование профиля</span>
                <span className='spn-modal'>Введите имя</span>
                <Inp className="inp-modal" id="inp one" type="text"  setValue={setName} value={name} />
                <span className='spn-modal'>Введите фамилию</span>
                <Inp className="inp-modal" id="inp two" type="text"  setValue={setLastname} value={lastname} />
                <span className='spn-modal'>Введите почту</span>
                <Inp className="inp-modal" id="inp three" type="text" setValue={setEmail} value={email} />
                <span className='spn-modal'>Введите номер телефона</span>
                <Inp className="inp-modal" id="inp fourth" type="text" setValue={setPhone} value={phone} />
                <button className='file-user' type='submit'>Изменить</button>
            </form>
            </div>
        </div>
  )
}

export default ModalWindoe