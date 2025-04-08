import Servicesbg from "../../assets/files/Services-bg.jpg";
import "../../assets/css/Services.css";
import { FaPaintBrush } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { SiBrandfolder } from "react-icons/si";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const { ref: imageRef1, inView: imageInView1 } = useInView({
    triggerOnce: true,
  });
  const { ref: imageRef2, inView: imageInView2 } = useInView({
    triggerOnce: true,
  });
  const { ref: imageRef3, inView: imageInView3 } = useInView({
    triggerOnce: true,
  });
  const { ref: imageRef4, inView: imageInView4 } = useInView({
    triggerOnce: true,
  });
  return (
    <section id="Services" style={{ backgroundImage: `url(${Servicesbg})` }}>
      <div className="container">
        <div className="Services-header">
          <h1>Our Services</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
            iure ipsum est consequatur non eos.
          </p>
        </div>
        <div className="Services-cards">
          <div
            ref={imageRef1}
            className={`Services-card ${imageInView1 ? "visible" : "hidden"}`}
          >
            <div className="Services-card-icon">
              <FaPaintBrush
                size={40}
                fill="#121742"
                className="Services-custom-icon"
              />
            </div>
            <div className="Services-card-content">
              <h1>UI/UX design</h1>
              <p>
                Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.
              </p>
            </div>
          </div>
          <div
            ref={imageRef2}
            className={`Services-card ${imageInView2 ? "visible" : "hidden"}`}
          >
            <div className="Services-card-icon">
              <SiBookstack
                size={45}
                fill="#121742"
                className="Services-custom-icon"
              />
            </div>
            <div className="Services-card-content">
              <h1>Web design</h1>
              <p>
                Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.
              </p>
            </div>
          </div>
          <div
            ref={imageRef3}
            className={`Services-card ${
              imageInView3 ? "visible-right" : "hidden-right"
            }`}
          >
            <div className="Services-card-icon">
              <FaMagnifyingGlass
                size={40}
                fill="#121742"
                className="Services-custom-icon"
              />
            </div>
            <div className="Services-card-content">
              <h1>SEO</h1>
              <p>
                Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.
              </p>
            </div>
          </div>
          <div
            ref={imageRef4}
            className={`Services-card ${
              imageInView4 ? "visible-right" : "hidden-right"
            }`}
          >
            <div className="Services-card-icon">
              <SiBrandfolder
                size={40}
                fill="#121742"
                className="Services-custom-icon"
              />
            </div>
            <div className="Services-card-content">
              <h1>Brand design</h1>
              <p>
                Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.
              </p>
            </div>
          </div>
        </div>
        <div className="our-services">
          <a className="btn btn-services">View All Services</a>
        </div>
      </div>
    </section>
  );
};
export default Services;
