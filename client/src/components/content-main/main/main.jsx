import React from 'react';
import Search from '../../search-panel/search-panel';
import Main from "../../img/main.svg";
import "../main/main.css";
import { NavLink, useNavigate } from 'react-router-dom';

const ContMain = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="content__wrapper">
                <div className='content__left'>
                    <div className="content-header">
                        <p className='p'>
                        <span className='blue'>Частные объявления</span> <br />
                            для аренды вещей <br />
                            с <span className='green'>безопасными</span> сделками <br />
                            в Симферополе
                        </p>
                    </div>
                    <div className="btn-rents" onClick={() => navigate('/AllAds')}>В каталог</div>
                    <NavLink className='ad-new' to="AddNew"><p className='addNew'>+ Создать объявление</p></NavLink>
                </div>
                <div className='content__right'><img src={Main} alt="" /></div> 
            </div>
        </div>
    );
};

export default ContMain;