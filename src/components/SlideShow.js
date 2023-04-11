import { useState, useEffect } from 'react';
import offer50 from "../assets/offer50.jpg";
import salesposter from "../assets/salesposter.webp";
import CLBanner from "../assets/CLBanner.jpg";

import fashionoffer from "../assets/fashionoffer.webp";

function Slideshow( ) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex ]);

  function prevSlide() {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }

  function nextSlide() {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }
  const images = [
    offer50,
    salesposter,
    CLBanner,
     
  ];

  return (
    <div className="slideshow mt-5 mb-5">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`slide ${index === activeIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
export default Slideshow