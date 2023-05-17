import React, { useState } from 'react';
import "../search-panel/search-panel.css";

const Search = () => {
    const [value, setValue] = useState('')
    const [ads, setAds] = useState([])

    

    const searchAd = () => {

    }

    return (
        <div className='search'>
            {/* <img className='loop' src="https://cdn-icons-png.flaticon.com/512/2319/2319177.png" alt="" /> */}
            <input className="search-panel" type="text" placeholder='Хочу арендовать...' onChange={(e) => setValue(e.target.value)}/>
        </div>
    );
};

export default Search;