import aboutimage from "../../assets/files/about-img.svg";
import "../../assets/css/About.css";
import { useInView } from "react-intersection-observer";
import Faq from "./Faq";
import { useEffect } from "react";
const About = () => {
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
  });
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
  });

  return (
    <section id="About">
      <div className="container">
        <div className="about-section">
          <div
            ref={imageRef}
            className={`about-image ${imageInView ? "visible" : "hidden"}`}
          >
            <img src={aboutimage} alt="" />
          </div>

          <div
            className={`about-content ${
              imageInView ? "visible-content" : "hidden-content"
            }`}
          >
            <h1>Read more about our Digital Agency</h1>
            <p className="about-copntent-title-p">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores.
            </p>
            <Faq />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
