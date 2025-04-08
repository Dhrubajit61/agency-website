import "../../assets/css/Testimonials.css";
import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { MdStar } from "react-icons/md";
import { IoStarHalfOutline } from "react-icons/io5";
import { MdOutlineStarBorder } from "react-icons/md";
import useWindowSize from "./useWindowSize";
import Testimonial1 from "../../assets/files/testimonials/testimonial-1.png";
import Testimonial2 from "../../assets/files/testimonials/testimonial-2.png";
import Testimonial3 from "../../assets/files/testimonials/testimonial-3.png";

const TestimonialSlider = () => {
  const { width, height } = useWindowSize();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("null"); // Track swipe direction

  const testimonials = [
    {
      id: 1,
      image: Testimonial1,
      content: "  Amazing service and friendly support!  ",
      client: "Client 1",
      stars: (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <MdStar key={index} size={width < 899 ? 16 : 20} />
            ))}
          <IoStarHalfOutline size={width < 899 ? 16 : 20} />
        </>
      ),
    },
    {
      id: 2,
      image: Testimonial2,
      content: "  Exceeded my expectations!  ",
      client: "Client 2",
      stars: (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <MdStar key={index} size={width < 899 ? 16 : 20} />
            ))}
          <MdOutlineStarBorder size={width < 899 ? 16 : 20} />
        </>
      ),
    },
    {
      id: 3,
      image: Testimonial3,
      content: "  I love the professionalism!  ",
      client: "Client 3",
      stars: (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <MdStar key={index} size={width < 899 ? 16 : 20} />
            ))}
          <IoStarHalfOutline size={width < 899 ? 16 : 20} />
        </>
      ),
    },
    {
      id: 4,
      image: Testimonial2,
      content: "  Highly recommend their services!  ",
      client: "Client 4",
      stars: (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <MdStar key={index} size={width < 899 ? 16 : 20} />
            ))}
          <MdOutlineStarBorder size={width < 899 ? 16 : 20} />
        </>
      ),
    },
  ];

  const nextTestimonial = () => {
    setDirection("right");
    setCurrentIndex((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection("left");
    setCurrentIndex(
      (currentIndex - 1 + testimonials.length) % testimonials.length
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial(); // Call nextTestimonial to move to the next one
    }, 2000); // Change every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [currentIndex]);

  return (
    <>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`testimonial ${
              currentIndex === index
                ? "activemode"
                : direction === "right"
                ? "enter-right"
                : "enter-left"
            } testimonial${testimonial.id}`}
          >
            <img
              src={testimonial.image}
              alt={testimonial.client}
              className="testimonial-image"
            />
            <div className="testimonial-content">
              <p>
                <FaQuoteLeft size={width < 899 ? 15 : 20} />
                {testimonial.content}
                <FaQuoteRight size={width < 899 ? 15 : 20} />
              </p>
              {testimonial.stars}
              <h3>{testimonial.client}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation">
        <button onClick={prevTestimonial}>
          <IoIosArrowBack size={width < 899 ? 16 : 20} />
        </button>
        <button onClick={nextTestimonial}>
          <IoIosArrowForward size={width < 899 ? 16 : 20} />
        </button>
      </div>
    </>
  );
};

export default TestimonialSlider;
