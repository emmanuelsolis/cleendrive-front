import React from 'react'
import "./Cover.css"

const Cover = () => {
    const slider = [
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664730331/CoverVideo_zalhf8.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664734628/Lavado_kzdmmn.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664734639/Secado_hy8ktz.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664733937/Aspirado_egwpbl.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664741201/Interiores_mwg9au.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664741058/Pulido_rvrpbp.mp4'
        },
        {
            src:'https://res.cloudinary.com/atlantes/video/upload/v1664735635/Brillo_vsagfv.mp4'
        },
    ]
    // let sliderSection = document.querySelectorAll(".slider-section");
    // let sliderSectionLast = sliderSection[sliderSection.length - 1];
    // const btnLeft = document.querySelector("#btn-left");
    // const btnRight = document.querySelector("#btn-right");

    // slider.insertAdjacentElement("beforebegin", sliderSectionLast);
  return (
        <div className='slider-container'>
            <div className="slider" id="slider">
                {slider.map((video,idx)=>{
                    return(
                        <div className='slider-section' key={idx}>
                            <video src={video.src} autoPlay loop muted className='video'></video>
                    </div>  
                    )
                }
                )}  
            </div>
            <div className="buttons">
                <div className="slider-btn btn-left" id="btn-left">&#62;</div>
                <div className="slider-btn btn-right" id="btn-right">&#60;</div>
            </div>
        </div>
  )
}

export default Cover
