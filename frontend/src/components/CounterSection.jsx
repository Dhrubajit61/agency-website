import counterimage from "../assets/files/counter-up-img.svg";
import "../assets/css/Counter.css";
import { FaRegFaceGrinBeam } from "react-icons/fa6";
import { GoCheck } from "react-icons/go";
import { IoEarthSharp } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useWindowSize from "./useWindowSize";

const CounterSection = () => {
  const { width, height } = useWindowSize();
  const [count, setCount] = useState(0);
  const targetNumber = 325; // The target number
  const animationDuration = 2000; // Duration of the animation in milliseconds
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = targetNumber / (animationDuration / 16); // Calculates the increment based on frame rate

      const counter = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          start = targetNumber; // Stop at the target number
          clearInterval(counter);
        }
        setCount(Math.ceil(start)); // Round to avoid decimals
      }, 16); // Approx. 60 frames per second

      return () => clearInterval(counter); // Clean up on unmount
    }
  }, [inView]);

  return (
    <div className="counter-section" ref={ref}>
      <div className="container counter-section-container">
        <div className="counter-section-content">
          <div className="counter-content-header">
            <h1>Why we are the best, Why you hire?</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat.
            </p>
          </div>
          <div className="counter-content-info">
            <div className="counter-content-icon">
              <div className="counter-icon counter-icon1">
                <FaRegFaceGrinBeam
                  size={width < 1024 ? "35px" : "2.5em"}
                  fill="#4E6EF1"
                />
              </div>
              <h1>{count + 40}</h1>
              <h4>Happy Clients</h4>
            </div>
            <div className="counter-content-icon">
              <div className="counter-icon counter-icon2">
                <GoCheck
                  size={width < 1024 ? "35px" : "2.5em"}
                  fill="#4E6EF1"
                />
              </div>

              <h1>{count + 70}</h1>
              <h4>Happy Clients</h4>
            </div>
            <div className="counter-content-icon">
              <div className="counter-icon counter-icon3">
                <IoEarthSharp
                  size={width < 1024 ? "35px" : "2.5em"}
                  fill="#4E6EF1"
                />
              </div>
              <h1>{count + 100}</h1>
              <h4>Happy Clients</h4>
            </div>
            <div className="counter-content-icon">
              <div className="counter-icon counter-icon4">
                <GoPeople
                  size={width < 1024 ? "35px" : "2.5em"}
                  fill="#4E6EF1"
                />
              </div>
              <h1>{count - 80}</h1>
              <h4>Happy Clients</h4>
            </div>
          </div>
        </div>
        <div className="counter-section-img">
          <img src={counterimage} alt="" />
        </div>
      </div>
    </div>
  );
};
export default CounterSection;
