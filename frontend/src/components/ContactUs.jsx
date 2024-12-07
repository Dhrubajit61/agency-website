import heroimage from "../assets/files/hero-img.svg";
import "../assets/css/Contact.css";
import { useState } from "react";
import checkmark from "../assets/files/checkmark.png";
import axios from "axios";
import Preloader2 from "./Preloader2";
function ContactUs() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
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
        setIsModalOpen(true);
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
        setIsModalOpen(true);
      }
    } catch (error) {
      alert("Some error occuured please try again later");
      // alert("Error while submitting the form!", error);
    } finally {
      setLoading(false); // Stop loader after both API call and delay
    }
  };
  return (
    <section id="contact-us">
      <div className="container contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt labore.
          </p>
        </div>
        <div style={{ position: "relative" }}>
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
              }}
            >
              <div style={{ color: "#fff", fontSize: "24px" }}>
                <Preloader2></Preloader2>
              </div>
            </div>
          )}
          <div className="contact-form-area">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-single-input">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />

                <input
                  type="number"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  placeholder="Your contact no"
                />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Your subject"
                />
              </div>
              <div className="contact-message-div">
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your Message"
                  id="Contact-message"
                />
                <input className="btn" type="submit" value="Submit Message" />
              </div>
            </form>
            {isModalOpen && (
              <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal checkmodal">
                  <button className="close-button" onClick={handleCloseModal}>
                    &times;
                  </button>

                  <h1>
                    {response === true ? (
                      <div className="checkmark">
                        <img src={checkmark} alt="" />
                        <h4>Success</h4>
                        <p>
                          Your query Successfully submitted. We will get back to
                          you soon!
                        </p>
                      </div>
                    ) : (
                      <div className="checkmark checkerror">
                        {response.map((error, index) => (
                          <p key={index}>
                            * {index + 1} {error}
                          </p>
                        ))}
                      </div>
                    )}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactUs;
