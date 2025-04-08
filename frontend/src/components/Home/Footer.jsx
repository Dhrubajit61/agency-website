import "../../assets/css/Footer.css";
import logo from "../../assets/files/logo.svg";
const Footer = () => {
  return (
    <section id="Footer">
      <div className="container footer-container">
        <div className="footer-part footer-part1">
          <img src={logo} alt="" />
          <p>
            We are expert designer team, There have a lot of designer and
            developer If you have any project you can hire Create a website.
          </p>
        </div>
        <div className="footer-part footer-part2">
          <div className="part-header">
            <h1>Link</h1>
          </div>
          <div className="part-item">
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Portfolio</li>
              <li>Team</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
        <div className="footer-part footer-part3">
          <div className="part-header">
            <h1>Services</h1>
          </div>
          <div className="part-item">
            <ul>
              <li>Graphic design</li>
              <li>Web design</li>
              <li>Visual design</li>
              <li>Product design</li>
              <li>Web development</li>
              <li>Startup business</li>
            </ul>
          </div>
        </div>
        <div className="footer-part footer-part4">
          <div className="part-header">
            <h1>Contact</h1>
          </div>
          <div className="part-item">
            <ul>
              <li>+003894372632</li>
              <li>helldesigner@gmail.ccom</li>
              <li>Uniteds state of America</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Footer;
