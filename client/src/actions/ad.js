import axios from "../reducers/axios";
import { setItems } from "../reducers/adsReducer";

const token = localStorage.getItem("token");

export const createAd = async ({
  name, photo, category, price,
  priceDay, priceWeek, priceMonth,
  city, address, text, userId,
  authorId,
}) => {
  if (userId === authorId) {
    try {
      const response = await axios.post(`/AddNew`,
        {
          token, name, photo, category,
          price, priceDay,
          priceWeek,
          priceMonth,
          city,
          address,
          text
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message)

      if (response.status === 200) {
        const messageDiv = document.querySelector('#message');
        messageDiv.textContent = response.data.message;
      } else {
        const messageDiv = document.querySelector('#err');
        messageDiv.textContent = response.data.message;
      }
      
    } catch (error) {
      const messageDiv = document.querySelector('#err');
        messageDiv.textContent = error;
    }
  } else {
    console.log("Пользователь не является автором объявления");
  }
};

export const removeAd = ({itemId, items}) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(`/AddNew/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedItems = items.filter((item) => item.id !== itemId);
        dispatch(setItems(updatedItems));
      } else {
        alert(`Произошла ошибка. Код ошибки ${response.status}`);
      }
    } catch (error) {
      console.log("ошибка    :  ",error);
    }
  };
};

export const getAdById = async ({id}) => {
  try {
    const response = await axios.get(`/AddNew/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAd = async ({
  id,
  name,
  photo,
  category,
  price,
  priceDay,
  priceWeek,
  priceMonth,
  text
}) => {
  try {
    const response = await axios.patch(`/AddNew/${id}`,
      {
        name,
        photo,
        category,
        price,
        priceDay,
        priceWeek,
        priceMonth,
        text
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    if (response.status === 200) {
      const messageDiv = document.querySelector('#message-upd');
      messageDiv.textContent = response.data.message;
    } else {
      const messageDiv = document.querySelector('#err');
      messageDiv.textContent = response.data.message;
    }
    
  } catch (error) {
    alert("ошибка в блоке catch", error);
  }
};


