import React, { useRef, useState, useEffect } from "react";
import Remove from "../img/update/remove.svg";
import Update from "../img/update/update.svg";
import { getAdById, updateAd } from "../../actions/ad";
import { useSelector } from "react-redux";
import Footer from "../footer/footer";
import Inp from "../Inputs/Inp";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../reducers/axios";

const UpdateAd = (status) => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [priceDay, setPriceDay] = useState("");
  const [priceWeek, setPriceWeek] = useState("");
  const [priceMonth, setPriceMonth] = useState("");
  const [text, setText] = useState("");
  const [authorId, setAuthorId] = useState("");

  useEffect(() => {
    getAdById(id)
      .then((data) => {
        setName(data.name);
        setPhoto(data.photo);
        setCategory(data.category);
        setPrice(data.price);
        setPriceDay(data.priceWeek);
        setPriceWeek(data.priceWeek);
        setPriceMonth(data.priceMonth);
        setText(data.text);
        setAuthorId(data.user._id);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser.id;

  useEffect(() => {
    console.log(photo);
  }, [photo]);

  const handleUpdateAd = (e) => {
    e.preventDefault();
    updateAd({
      id,
      photo,
      name,
      category,
      price,
      priceDay,
      priceWeek,
      priceMonth,
      text,
      userId,
      authorId,
    });
    if (status == 200) {
      navigate(-1)
    }
  };

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
    <div className="update-wrapper">
      
      <div className="update-container">
        <div id="message-upd"></div>
        <span
          className="title-updated"
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
          Редактирование объявления
        </span>
        <div>
          <form className="blocks" onSubmit={(e) => handleUpdateAd(e)}>
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
                <span className="title-upd-ad">Описание</span>
                <Inp
                  className="inp-upd-ad address"
                  value={text}
                  setValue={setText}
                  placeholder="Описание"
                />
              </div>
            </div>

            <div className="btns-block">
              <button
                className="cancel"
                onClick={() => navigate(`/profile/${id}`)}
              >
                Отменить
              </button>
              <button className="save" type="submit">
                Сохранить
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UpdateAd;
