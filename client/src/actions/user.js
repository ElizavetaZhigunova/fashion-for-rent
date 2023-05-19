import axios from '../reducers/axios';
import { setUser } from '../reducers/userReducer';

export const registration = async(name, lastname, phone, email, password, ) => {
    try {
        const response = await axios.post(`/registration`, {
        name,
        lastname,
        phone,
        email,
        password
        })
        alert(response.data.message)
    } catch (error) {
        alert(error.response.data.message)
    }
}

export const login = (email, password, callback) => {
    return async dispatch => {
       try {
        const response = await axios.post(`/login`, {
        email,
        password
        })
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
        callback()
    } catch (error) {
        alert(error.response.data.message)
    } 
    }   
}

export const auth = () => {
    return async dispatch => {
       try {
        const response = await axios.get(`/auth`, 
            {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
        )
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
    } catch (error) {
        alert(error.response.data.message)
        localStorage.removeItem('token')
    } 
    }
}

const token = localStorage.getItem("token");

export const updateProfile = async ({id, name, lastname, email, phone}) => {
    try {
        const response = await axios.patch(`/profile/${id}`,
          {
            name,
            lastname,
            phone,
            email
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response);
        console.log(token)
        alert(response.data.message);
      } catch (error) {
        alert("ошибка в блоке catch 4", error);
      }
}