import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./carousel.scss";

const Carousel = ({ slides, title }) => {
  const navigate = useNavigate();
  const carousalRef = useRef(null);
  const intervalRef = useRef(0);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (slides && slides.length > 0) {
      initialCarousel(carousalRef);
      carouselMoment(carousalRef);
    }
  }, [slides]);

  const initialCarousel = (carousalRef) => {
    let carouselMoments = carousalRef.current.children;

    for (let index = 0; index < carouselMoments.length; index++) {
      const element = carouselMoments[index];
      element.style.transform = `translateX(${index * 100}%)`;
    }
  };

  const carouselMoment = (carousalRef) => {
    let curSlide = 0;
    const intervalID = setInterval(() => {
      let carouselElements = carousalRef.current.children;
      if (curSlide === carouselElements.length - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      for (let index = 0; index < carouselElements.length; index++) {
        const element = carouselElements[index];
        element.style.transform = `translateX(${100 * (index - curSlide)}%)`;
      }
    }, 3000);
    console.log("intervalID", intervalID);
    intervalRef.current = intervalID;
  };

  const handleCarouselClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <section className="carousel-container">
      <div ref={carousalRef} id={title} className="carousel-box">
        {slides &&
          slides.map((slide) => {
            return (
              <article onClick={() => handleCarouselClick(slide)}>
                {slide.original_title}
              </article>
            );
          })}
      </div>
      {!slides && <article>{title}</article>}
    </section>
  );
};

export default Carousel;
