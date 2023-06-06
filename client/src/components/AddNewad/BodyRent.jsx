import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../reducers/axios";
import { createAd } from "../../actions/ad";

import Remove from "../img/update/remove.svg";
import Update from "../img/update/upload.svg";
import Inp from "../Inputs/Inp";

const BodyRent = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceDay, setPriceDay] = useState("");
  const [priceWeek, setPriceWeek] = useState("");
  const [priceMonth, setPriceMonth] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [text, setText] = useState("")


  const [showDiv, setShowDiv] = useState(false);
  // const [showErrDiv, setShowErrDiv] = useState(false)

  const inputFileRef = useRef(null);

  const handleChangeFile = async (e) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPhoto(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке изображения");
    }
  };

  const onClickRemoveImage = () => {
    setPhoto("");
  };

  return (
    <>
    {showDiv && (
     <div id="messages">
        <div className="title-message">Успех!</div>
        <div id="message"></div>
     </div>
    )}
      <div className="update-wrapper">
        <div className="update-container">
          <div className="title-div">
            <h1
              style={{
                fontFamily: "Raleway",
                color: "#242424",
                letterSpacing: "0.1em",
                fontSize: "25px",
                fontWeight: 500,
                marginBottom: "10px",
                marginTop: "30px",
              }}
            >
              Создание объявления
            </h1>
          </div>
          <div className="form-wrapper">
            <div className="photo-block-update">
              <span className="title-upd-ad">Фотография</span>
              <div className="photo-upd">
                {photo && (
                  <>
                    <img
                      className="img-updd"
                      style={{ width: "inherit", height: "inherit" }}
                      src={`http://localhost:5000${photo}`}
                      alt=""
                    />
                  </>
                )}
              </div>
              <div className="btn-upd">
                <div className="update-img">
                  <img src={Update} alt="" />
                  <input
                    ref={inputFileRef}
                    onChange={handleChangeFile}
                    type="file"
                    id="update"
                    name="photo"
                    accept="image/*"
                  />
                  <button
                    onClick={() => inputFileRef.current.click()}
                    className="update"
                  >
                    Выбрать фото
                  </button>
                </div>
                <div className="update-img">
                  {photo && (
                    <>
                      <img src={Remove} alt="" />
                      <label onClick={onClickRemoveImage} className="remove">
                        Удалить фото
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="form-main-update">
              <span className="title-upd-ad">Название</span>
              <Inp
                className="inp-upd-ad"
                value={name}
                setValue={setName}
                placeholder="Название"
              />
              <span className="title-upd-ad">Категория</span>
              <Inp
                className="inp-upd-ad"
                value={category}
                setValue={setCategory}
                placeholder="Категория"
              />
              <span className="title-upd-ad">Полная стоимость</span>
              <Inp
                className="inp-upd-ad"
                value={price}
                setValue={setPrice}
                placeholder="Полная стоимость"
              />
            </div>
            <div className="form-second-update">
              <span className="title-upd-ad">
                Стоимость в день \ неделю \ месяц
              </span>
              <div className="container-upd">
                <Inp
                  className="inp-upd-ad price"
                  value={priceDay}
                  setValue={setPriceDay}
                  placeholder="В день"
                />
                <Inp
                  className="inp-upd-ad price"
                  value={priceWeek}
                  setValue={setPriceWeek}
                  placeholder="В неделю"
                />
                <Inp
                  className="inp-upd-ad price"
                  value={priceMonth}
                  setValue={setPriceMonth}
                  placeholder="В месяц"
                />
              </div>
              <span className="title-upd-ad">Город</span>
              <Inp
                className="inp-upd-ad address"
                value={city}
                setValue={setCity}
                placeholder="Город"
              />
              <span className="title-upd-ad">Адрес</span>
              <Inp
                className="inp-upd-ad address"
                value={address}
                setValue={setAddress}
                placeholder="Адрес передачи"
              />
              <span className="title-upd-ad">Описание</span>
              <Inp
                className="inp-upd-ad address"
                value={text}
                setValue={setText}
                placeholder="Описание"
              />
            </div>
            
          </div>
        </div>
      </div>
      <div className="btns-block">
        <button className="cancel" onClick={() => navigate(`/`)}>
          Отменить
        </button>
        <button
          onClick={(e) => {
            createAd({
              name,
              photo,
              category,
              price,
              priceDay,
              priceWeek,
              priceMonth,
              address,
              city,
              text
            });
            setShowDiv(true)
            // 
          }}
          className="btn-next"
        >
          Отправить
        </button>
      </div>
    </>
  );
};

export default BodyRent;
