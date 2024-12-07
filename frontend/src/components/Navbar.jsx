import "../assets/css/Navbar.css"; // Assuming you're using an external CSS file for styling
import logo from "../assets/files/logo.svg";
import "../assets/css/Index.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import useWindowSize from "./useWindowSize";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

// Signup and login modal start
import Signup from "./Signup";
import { Openmodalcontext } from "./Contextapi";
import { Openmodal2context } from "./Contextapi";
import { Openloginmodalcontext } from "./Contextapi";
import { Responsecontext } from "./Contextapi";
import Login from "./Login";
import Modal2 from "./Modal2";
//Signup and login modal end

const Navbar = () => {
  const [response, setResponse] = useState([]);
  const { width, height } = useWindowSize();
  // active class in nav menu
  const [activeSection, setActiveSection] = useState("home");
  // active class in nav menu

  //nav sticky
  const [isSticky, setIsSticky] = useState(false);

  // navmenu open and close in mobile view---start
  const navbarRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(!true);
  const opennavmenu = () => {
    setIsNavOpen(!isNavOpen);
  };
  useEffect(() => {
    console.log(isNavOpen);
  }, [isNavOpen]);
  // navmenu open and close in mobile view---end

  //Signup and Login modal open & close --- start
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsSignupModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };
  //Signup and Login modal open & close --- end

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  // const getClassName = () => {
  //   if (width < 899) {
  //     return isOpen === "true" ? "navbarisopentrue" : "navbarisopenfalse";
  //   }
  //   return "navbar-menu"; // No class if width is not less than 899px
  // };

  useEffect(() => {
    console.log(isModalOpen2);
    // Handle scroll event
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "home";

      // Loop through each section to check which one is in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Check if the current scroll position is within the section
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.getAttribute("id");
        }

        setActiveSection(currentSection);
      });

      if (navbarRef.current) {
        const stickyPosition = navbarRef.current.offsetTop;

        // Check if window scrollY position is greater than or equal to the navbar's position
        if (window.scrollY > stickyPosition) {
          setIsSticky(true); // Add sticky class
        } else {
          setIsSticky(false); // Remove sticky class when scrolling back up
        }
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array so the effect is only set up once when the component mounts

  // scrolltosection function
  const scrolltosection = (section) => {
    const sectionpart = document.getElementById(section);
    const scrollY = sectionpart.getBoundingClientRect().top + window.scrollY;
    if (sectionpart) {
      if (section == "home")
        window.scrollTo({ top: scrollY, behavior: "smooth" });
      else {
        const navbar = document.getElementById("navbar_id");
        const navheight = navbar.offsetHeight;
        window.scrollTo({ top: scrollY - navheight, behavior: "smooth" });
      }

      console.clear();
      console.log(scrollY);
    }
  };
  // scrolltosection functions

  return (
    <>
      <div
        ref={navbarRef}
        className={isSticky ? "navbar sticky" : "navbar"}
        id="navbar_id"
      >
        <div className="container navbar-container flex">
          <div className="navbar-logo">
            <a href="/">
              <img src={logo} alt="Logo" /> {/* Add your logo path here */}
            </a>
          </div>
          <div
            className={
              width < 899
                ? isNavOpen === false
                  ? "visbile"
                  : "invisible"
                : "invisible"
            }
            onClick={opennavmenu}
          >
            <GiHamburgerMenu size={25} style={{ cursor: "pointer" }} />
          </div>
          <div
            className={
              width < 899
                ? isNavOpen === true
                  ? "visbile"
                  : "invisible"
                : "invisible"
            }
            onClick={opennavmenu}
          >
            <RxCross2 size={25} style={{ cursor: "pointer" }} />
          </div>
          <ul
            className={
              width < 899
                ? isNavOpen === true
                  ? "navbarisopentrue"
                  : "navbarisopenfalse"
                : "navbar-menu"
            }
          >
            <li>
              <Link
                to="/"
                className={activeSection === "home" ? "active" : ""}
                onClick={() => scrolltosection("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={activeSection === "About" ? "active" : ""}
                onClick={() => scrolltosection("About")}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/"
                className={activeSection === "Services" ? "active" : ""}
                onClick={() => scrolltosection("Services")}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={
                  activeSection === "Portfolio-section" ? "active" : ""
                }
                onClick={() => scrolltosection("Portfolio-section")}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={activeSection === "teams" ? "active" : ""}
                onClick={() => scrolltosection("teams")}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={activeSection === "contact-us" ? "active" : ""}
                onClick={() => scrolltosection("contact-us")}
              >
                Contact US
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={
                  activeSection === "contact-us"
                    ? "sign-up-class active"
                    : "sign-up-class"
                }
                onClick={handleOpenModal}
              >
                Client Sign up /Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Openmodalcontext.Provider
        value={{ isSignupModalOpen, setIsSignupModalOpen }}
      >
        <Openloginmodalcontext.Provider
          value={{ isLoginModalOpen, setIsLoginModalOpen }}
        >
          <Openmodal2context.Provider value={{ isModalOpen2, setIsModalOpen2 }}>
            <Responsecontext.Provider value={{ response, setResponse }}>
              {isSignupModalOpen && <Signup></Signup>}
              {isLoginModalOpen && <Login></Login>}
              {isModalOpen2 && <Modal2></Modal2>}
            </Responsecontext.Provider>
          </Openmodal2context.Provider>
        </Openloginmodalcontext.Provider>
      </Openmodalcontext.Provider>
    </>
  );
};

export default Navbar;
