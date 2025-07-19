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
     slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
  };

  // Settings for the navigation slider
  const navSliderSettings = {

     slidesToShow: images.length >= 3 ? 3 : images.length,
    slidesToScroll: images.length,
    swipeToSlide: true,
    focusOnSelect: true,
    // centerMode: true,
    infinite: true,
    arrows: true,
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
            <div className="isText">
                 <div className="is-x">
                   <img src={image} alt={`slide-${index}`} />
                 </div>
            </div>
           
          </div>
        ))}
      </Slider>
      </div>
      <div  className="--slider-container-child-2">
        <Slider className="slider"
            asNavFor={nav1}
            ref={sliderRef2} // Directly pass the ref object
            {...navSliderSettings}>
            {images?.map((image, index) => (
            <div key={index} className="thumb-slider-item"> {/* Each image is now a direct child slide */}
                 <div className="isText">
                 <div className="is-x">
                   <img src={image} alt={`nav-thumb-${index}`}/>
                 </div>
            </div>
            </div>
            ))}
        </Slider>
      </div>
      
    </div>
  );
};

export default Carousel;