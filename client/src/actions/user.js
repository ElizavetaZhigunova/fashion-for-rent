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
        if (response.status === 200) {
          const messageDiv = document.querySelector('#message-reg');
          messageDiv.textContent = response.data.message;
        } else {
          const messageDiv = document.querySelector('#err');
          messageDiv.textContent = response.data.message;
        }
    } catch (error) {
      const messageDiv = document.querySelector('#message-reg');
      messageDiv.textContent = error.response.data.message;
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
      const messageDiv = document.querySelector('#message-span');
      messageDiv.textContent = error.response.data.message;
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

export const updateProfile = async ({id, avatar, name, lastname, email, phone}) => {
    try {
        const response = await axios.patch(`/profile/${id}`,
          {
            avatar,
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

export const sendEmail = () => {
  try {
    const response = axios.post('/send-email', {
      recipient: 'lupedu75@gmail.com',
      subject: 'Test email',
      text: 'This is a test email!'
    })
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log("тут ошибка...   ",error);
    });
  } catch (error) {
    console.log(error)
  }
}