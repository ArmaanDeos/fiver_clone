import React from "react";
import "./Slider.scss";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Slider = ({ catcards, project, catHeading, popHeading }) => {
  const responsive = {
    0: { items: 2 },
    568: { items: 3 },
    1024: { items: 4 },
  };

  return (
    <div className="slider">
      <div className="container">
        <div className="heading">
          <h1>{catHeading || popHeading}</h1>
        </div>
        <AliceCarousel
          mouseTracking
          items={catcards || project}
          responsive={responsive}
          autoPlay
          autoPlayStrategy="none"
          autoPlayInterval={2000}
          infinite
          touchTracking={false}
          paddingLeft={30}
          paddingRight={30}
        />
      </div>
    </div>
  );
};

export default Slider;
