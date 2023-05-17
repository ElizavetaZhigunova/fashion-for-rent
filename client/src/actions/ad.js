import axios from "axios";
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
      const response = await axios.post(
        `http://localhost:5000/AddNew`,
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
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      alert("ошибка в блоке catch", error);
    }
  } else {
    console.log("Пользователь не является автором объявления");
  }
};

export const removeAd = (itemId, items) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/AddNew/${itemId}`,
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
      console.log(error);
    }
  };
};

export const getAdById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:5000/AddNew/${id}`);
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
    const response = await axios.patch(
      `http://localhost:5000/AddNew/${id}`,
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
    alert(response.data.message);
    
  } catch (error) {
    alert("ошибка в блоке catch", error);
  }
};


