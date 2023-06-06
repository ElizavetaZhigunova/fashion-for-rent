import React, { useEffect, useState } from "react";
import axios from "../../reducers/axios";
import { useParams } from "react-router-dom";
import "./style.css";
import Caret from "../img/addNew/chevron-left.svg";
import { useSelector } from "react-redux";
import Person from "../img/addNew/person.svg";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { sendEmail } from "../../actions/user";


export const FullAd = () => {
  const { ads, category } = useSelector((state) => state.ads);
  console.log(ads);
  console.log(category);
  const [data, setData] = useState();
  console.log("data is:  ", data)
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
   
  const user = useSelector(state => state.user.currentUser)

  const navigate = useNavigate();

  const { id } = useParams();
  
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const response = await axios.post('/send-message', { message });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  

  useEffect(() => {
    axios
      .get(`/AddNew/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false)
        setLoaded(true);
        console.log("success");
      })
      .catch((err) => {
        console.warn(err);
        console.log("Ошибка при получении статьи");
      });
  }, []);

  if (!loaded) {
    return <Loading/>;
  }

  // Если данные загружены, но data равно null, то выводим сообщение об ошибке
  if (loaded && !data) {
    return <div>Ошибка при загрузке данных</div>;
  }


  return (
    <>
    {!isLoading ? 
      <div className="fullad-wrapper">
        <div className="fullad-container">
          <div className="navigate-back">
            <span className="first-menu" onClick={() => navigate(-1)}>
              Женская одежда и обувь
            </span>
            <img src={Caret} alt="" />
            <span className="second-menu">Костюм</span>
          </div>

          <div className="name-ad">
            <span className="name-title">{data.name}</span>
          </div>
          <div className="ad-content">
            <div className="ad-content-container">
              {loaded ? (
              <img className="image-db" src={`http://localhost:5000${data.photo}`} alt="" /> 
              ) : null}
              
               
              
              <div className="info-blok">
                <div className="info-blok-container">
                  <div className="user-info">
                    <div className="photo-user">
                      <img src={Person} alt="" />
                    </div>
                    <span className="username">{user.name}</span>
                  </div>

                  <div className="price-blok">{data.priceDay} ₽/день</div>
                  <div className="price-block-double">
                    <div className="price-blok s">{data.priceWeek} ₽/неделю</div>
                    <div className="price-blok s">{data.priceMonth} ₽/месяц</div>
                  </div>
                  

                  <div className="feedback">
                    <span className="title-feedback">Начало аренды</span>
                    <form onSubmit={handleSubmit}>
                      <textarea
                        className="textarea"
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введите даты на которые вы бы хотели забронировать вещь ..."
                      ></textarea>
                      <button type="submit" className="feedback-submit">
                        Запросить аренду
                      </button>
                    </form>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="main-info">
              <div className="main-info-title">
                <span className="info-title">Основная информация</span>
              </div>
              <div className="main-info-text">
                <span className="info-text">
                  {data.text} <br />
                </span>
                <span className="info-text">
                  <br /> Город: {' '}
                  {data.city} <br />
                  Адрес получения:{' '}
                  {data.address}
                </span>
              </div>
            </div>

            <div className="user-info-big">
              <div className="photo-user second">
                <img src={Person} alt="" />
              </div>
              <div className="right-blok">
                <div className="nameuser">
                  <span className="username-second">{data.user.name}</span>
                </div>
                <button className="write" onClick={() => sendEmail()}>Написать</button>
              </div>
            </div>

            <div className="info-ad">
              <span>Товар id: {data.user._id} размещен {data.createdAt}</span>
              <span>
                Нужна помощь? Просто свяжитесь с владельцем в чате или свяжитесь
                со службой поддержки
              </span>
            </div>
          </div>
          <Footer />
        </div>
      </div>
: <div>Loading ...</div> }
    </>
  );
};
