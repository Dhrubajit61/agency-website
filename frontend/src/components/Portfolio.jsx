import "../assets/css/Portfolio.css";
import portfolio1 from "../assets/files/portfolio/portfolio-1.jpg";
import portfolio2 from "../assets/files/portfolio/portfolio-2.jpg";
import portfolio3 from "../assets/files/portfolio/portfolio-3.jpg";
import portfolio4 from "../assets/files/portfolio/portfolio-4.jpg";
import portfolio5 from "../assets/files/portfolio/portfolio-5.jpg";
import portfoliobg from "../assets/files/portfolio/portfolio-bg.jpg";

const Portfolio = () => {
  return (
    <section
      id="Portfolio-section"

      // style={{ backgroundImage: `url(${portfoliobg})` }}
    >
      <div className="Portfolio-section-container container">
        <div className="Portfolio-section-header">
          <h1>Recent Work</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt labore.
          </p>
        </div>
        <div className="Portfolio-section-image">
          <div className="Portfolio-item">
            <img src={portfolio1} alt="" />
          </div>
          <div className="Portfolio-item">
            <img src={portfolio2} alt="" />
          </div>
          <div className="Portfolio-item">
            <img src={portfolio3} alt="" />
          </div>
          <div className="Portfolio-item">
            <img src={portfolio4} alt="" />
          </div>
          <div className="Portfolio-item">
            <img src={portfolio5} alt="" />
          </div>
          <div className="Portfolio-item">
            <img src={portfolio2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Portfolio;
