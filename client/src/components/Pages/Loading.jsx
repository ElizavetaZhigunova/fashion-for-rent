import React from 'react'
import Load from '../img/loading.svg'

const Loading = () => {
  return (
    <div className="load-wrapper">
        <div className="load-container">
            <div className="img-load">
                <img src={Load} alt="" />
            </div>
            <div className="title-load">
            Подождите, пожалуйста, происходит
            </div>
            <div >
            <span className="item-load"> Загрузка страницы <span class="one">.</span><span class="two">.</span><span class="three">.</span></span>
            </div>
        </div>
    </div>
  )
}

export default Loading