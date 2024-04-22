import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const GigSLider = () => {
  const sliderImg = [
    "https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
  };
  const renderImg = sliderImg.map((img) => {
    return <img src={img} alt="" key={img} />;
  });
  return (
    <>
      <AliceCarousel
        animationType="fadeout"
        animationDuration={800}
        items={renderImg}
        mouseTracking
        responsive={responsive}
        autoPlay
        autoPlayStrategy="none"
        autoPlayInterval={2000}
        infinite
        touchTracking={false}
        disableButtonsControls
      />
    </>
  );
};

export default GigSLider;
