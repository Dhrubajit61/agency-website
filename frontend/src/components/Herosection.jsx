import heroimage from "../assets/files/hero-img.svg";
import "../assets/css/Hero.css";
function Herosection() {
  return (
    <section id="home">
      <div className="herosection">
        <div className="container flex hero-container">
          <div className="herocontent">
            <p>Welcome to JEET INFOTECH</p>
            <h1>Problem solver expert designer team.</h1>
            <p>
              We are expert designer team, There have a lot of designer and
              developer. If you have any project you can hire.
            </p>
            <button className="btn">Get Started</button>
          </div>
          <div className="heroimage">
            <img src={heroimage} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
export default Herosection;
