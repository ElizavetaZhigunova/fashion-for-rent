import React, { useEffect, useState } from "react";
import Photo from "../img/addNew/closes1.png";
import { Link } from "react-router-dom";
import { removeAd } from "../../actions/ad";
import { useDispatch, useSelector } from "react-redux";

import Remove from '../img/update/remove.svg'
import Update from '../img/update/update.svg'

export const Ad = ({ _id, user, name, priceDay, viewsCount, author, photo, obj }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [trashButtonClassName, setTrashButtonClassName] = useState("");
  const [updateButtonClassName, setUpdateButtonClassName] = useState("");
  const ads = useSelector((state) => state.ads);
  const [isRemoved, setIsRemoved] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser.id === author) {
      setTrashButtonClassName("button-trash button_active");
      setUpdateButtonClassName("button-update button_active");
    } else {
      setTrashButtonClassName("button-trash");
      setUpdateButtonClassName("button-update");
    }
  }, [currentUser]);

  const handleRemoveAd = async () => {
    try {
      await dispatch(removeAd(_id, ads.ads.items));
      setIsRemoved(true);
    } catch (error) {
      alert("Ошибка при удалении");
    }
  };

  if (isRemoved) {
    return null;
  }

  return (
    <div className="A">
      <div className="add-wrapper">
        <Link className={updateButtonClassName} to={`/update/${_id}`}>
          <img src={Update} alt="" />
        </Link>
        <button
          type="button"
          className={trashButtonClassName}
          onClick={handleRemoveAd}
        >
          <img src={Remove} alt="" />
        </button>
        <div className="add-container">
        {photo && (
        <img
          className="ad-photo"
          src={photo}
        />
      )}
          <Link to={`/AllAds/${_id}`} className="title-ad A">
            {name}{" "}
          </Link>
          <p className="price-ad">{priceDay} ₽/день</p>
          <span className="title-ad">Просмотров: {viewsCount}</span>
          <span className="username-second">{user}</span>
        </div>
      </div>
    </div>
  );
};
