import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import "./Cover.css";
const videos = [
  {
    id: 1,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664730331/CoverVideo_zalhf8.mp4"
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664734628/Lavado_kzdmmn.mp4"
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664734639/Secado_hy8ktz.mp4"
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664733937/Aspirado_egwpbl.mp4"
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664741201/Interiores_mwg9au.mp4"
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664741058/Pulido_rvrpbp.mp4"
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/atlantes/video/upload/v1664735635/Brillo_vsagfv.mp4"
  }
];
// var slider = document.getElementById('video');
const Cover = () => {
  const [index, setIndex] = useState(0);
  const [currenSlider, setCurrentSlider] = useState(videos[0].src);

  const mod = (n, m) => {
    let result = n % m;
    //result a positive value
    return result >= 0 ? result : result + m;
  };

  useEffect(() => {
    setTimeout(() => {
      setIndex((index + 1) % videos.length);
      console.log("Index:",index);
    }, 5000);
  }, [index]);

  return (
    <div className="slider-container">
      <div className="slider carousel" id="slider">
        {videos.map((item, i) => {
          const indexLeft = mod(index - 1, videos.length);
          const indexRight = mod(index + 1, videos.length);
          let className = "";
          if (i === index) {
            className = "card card--active";
          } else if (i === indexLeft) {
            className = "card card--left";
          } else if (i === indexRight) {
            className = "card card--right";
          } else {
            className = "card";
          }

          return (
            <div className="slider-section">
                <h1>Lavar tu coche nunca fue más cómodo</h1>
              <video
                className = {className}
                key={item.id}
                src={item.src}
                autoPlay
                loop
                muted
                id="video"
              ></video>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cover;
