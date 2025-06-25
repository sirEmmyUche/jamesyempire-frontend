import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  // Settings for the main slider
  const mainSliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // No need for fade here if you want a standard slide
  };

  // Settings for the navigation slider
  const navSliderSettings = {
    // slidesToShow: 2,
    swipeToSlide: true,
    focusOnSelect: true,
    infinite: true, // It's good practice to keep this consistent if the main one is infinite
  };

  useEffect(() => {
    setNav1(sliderRef1.current); // Access the current property of the ref
    setNav2(sliderRef2.current); // Access the current property of the ref
  }, []);

  return (
    <div className="slider-container">
      <div  className="--slider-container-child-1">
      <Slider
        asNavFor={nav2}
        ref={sliderRef1} // Directly pass the ref object
        {...mainSliderSettings}
        className="slider"
      >
        {images?.map((image, index) => (
          <div key={index} className="slider-main-item"> {/* Each image is now a direct child slide */}
            <img src={image} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
      </div>
      <div  className="--slider-container-child-2">
        <Slider className="slider"
            asNavFor={nav1}
            autoplay={true}
            // dots={true}
            rows={1}
             arrows={true}
            slidesPerRow={1}
            ref={sliderRef2} // Directly pass the ref object
            {...navSliderSettings}>
            {images?.map((image, index) => (
            <div key={index} className="thumb-slider-item"> {/* Each image is now a direct child slide */}
                <img src={image} alt={`nav-thumb-${index}`}/>
            </div>
            ))}
        </Slider>
      </div>
      
    </div>
  );
};

export default Carousel;