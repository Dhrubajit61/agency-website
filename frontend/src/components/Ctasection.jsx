import { useState } from "react";
import "../assets/css/Ctasection.css";
import checkmark from "../assets/files/checkmark.png";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import Preloader2 from "./Preloader2";
import "../assets/css/Modal.css";
// Signup and login modal start
import Signup from "./Signup";
import { Openmodalcontext } from "./Contextapi";
import { Openloginmodalcontext } from "./Contextapi";
import Login from "./Login";
//Signup and login modal end
const Cta = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
  });
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);
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
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };
  const handleOverlayClick2 = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal2();
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactnumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await Promise.all([
        axios.post(`${apiUrl}/api/submit-form`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        delay,
      ]);

      if (response[0].data.success) {
        setIsModalOpen(false);
        setIsModalOpen2(true);

        setResponse(response[0].data.success);
        setFormData({
          name: "",
          email: "",
          contactnumber: "",
          subject: "",
          message: "",
        });
      } else {
        setResponse(response[0].data.errors);

        setIsModalOpen2(true);
      }
    } catch (error) {
      alert(error);
      // alert("Error while submitting the form!", error);
    } finally {
      setLoading(false); // Stop loader after both API call and delay
    }
  };
  return (
    <section className="Ctasection">
      <div className="container Ctacontainer">
        <div
          className={`ctatitle ${contentInView ? "visible-cta" : "hidden-cta"}`}
          ref={contentRef}
        >
          <h1>Have any project in your mind? You can hire</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt.
          </p>
        </div>
        <div className="ctabutton">
          <button className="btn" onClick={handleOpenModal}>
            Let's Start Your Project
          </button>
        </div>
      </div>
      <Openmodalcontext.Provider
        value={{ isSignupModalOpen, setIsSignupModalOpen }}
      >
        <Openloginmodalcontext.Provider
          value={{ isLoginModalOpen, setIsLoginModalOpen }}
        >
          {isSignupModalOpen && <Signup></Signup>}
          {isLoginModalOpen && <Login></Login>}
        </Openloginmodalcontext.Provider>
      </Openmodalcontext.Provider>
    </section>
  );
};
export default Cta;
