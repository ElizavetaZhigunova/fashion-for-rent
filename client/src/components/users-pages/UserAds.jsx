import React, { useEffect} from "react";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAds, } from "../../reducers/adsReducer";
import { Ad } from "../AddNewad/Ad";

const UserAds = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { ads } = useSelector((state) => state.ads);

  const userAds = ads?.items?.filter((ad) => ad.user._id === currentUser.id);

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  return(
    <div className="ad-profile-wrapper">
    {userAds?.map((obj) => (
        <Ad
          key={obj._id}
          _id={obj._id}
          photo={`http://localhost:5000${obj.photo}`}
          name={obj.name}
          author={obj.user._id}
          priceDay={obj.priceDay}
          viewsCount={obj.viewsCount}
          obj={obj}
        />
      ))}
      {userAds?.length === 0 && (
        <span className='active-ord'>Вы не создали ни одного объявления ...</span> && <div className="btn-rents" onClick={() => navigate('/AddNew')}>В каталог</div>
      )}
    </div>
  )
   
  
}

export default UserAds