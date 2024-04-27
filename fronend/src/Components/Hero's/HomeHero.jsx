import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { PrevArrow, NextArrow } from "../Btn's/SliderBtn";
import homeHeroSlider from "../../data/homeHeroSlider";

const HomeHero = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div className="w-[1200px] mx-auto">
      <Slider {...settings}>
        {homeHeroSlider.map((slide) => (
          <Link
            to="/products"
            className="lg:h-[370px] md:h-[280px] sm:h-[600px] h-[450px]"
            key={slide?.id}
          >
            <img
              className="w-full h-full xl:rounded-3xl lg:hidden"
              src={windowWidth > 800 ? slide.bg1 : slide.bg2}
              alt=""
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default HomeHero;
