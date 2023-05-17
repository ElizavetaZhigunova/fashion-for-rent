import React, { useEffect } from "react";
import "./style.css";
import Footer from "../footer/footer";

import { Ad } from "../AddNewad/Ad";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, fetchCategory } from "../../reducers/adsReducer";

export const AllAds = () => {
  const dispatch = useDispatch();
  const { ads, category } = useSelector((state) => state.ads);
  let i = 0;

  useEffect(() => {
    dispatch(fetchAds());
    dispatch(fetchCategory());
  }, [dispatch]);

  if (ads.status === 'loading' || category.status === 'loading') {
    return <div>Loading...</div>
  }

/*   console.log(ads);
  console.log(category); */

  return (
    <div className="ad-wrapper">
      <div className="ad-container">
        <div className="title-category">
          <div style={{ paddingRight: "40px" }}>
            <h3 className="category-title active">Женская одежда и обувь</h3>
          </div>
          <h3 className="category-title">Мужская одежда и обувь</h3>
        </div>

        <div className="category">
          {category.items.map((obj) => (
            <div className="category-div" key={i++}>
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="all-ads">
        {ads.items.map((obj) => (
          <Ad
            key={obj._id}
            photo={`http://localhost:5000${obj.photo}`}
            _id={obj._id}
            name={obj.name}
            author={obj.user._id}
            priceDay={obj.priceDay}
            viewsCount={obj.viewsCount}
            obj={obj}
          />
        ))}

        {/* {[...Array(20)].map(() => {
            return (<Ad
              
            />)}
          )} */}
      </div>
      <Footer />
    </div>
  );
};
