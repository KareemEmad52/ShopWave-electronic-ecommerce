import React from "react";
import Slider from "react-slick";
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

export function CarouselDefault() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 3000,
    customPaging: (i) => (
      <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
    ),
    dotsClass: "slick-dots custom-dots",
    arrows: false,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <img src={img1} alt="Image 1" className="h-full w-full object-cover" />
        <img src={img2} alt="Image 2" className="h-full w-full object-cover" />
        <img src={img3} alt="Image 3" className="h-full w-full object-cover" />
      </Slider>
    </div>
  );
}
