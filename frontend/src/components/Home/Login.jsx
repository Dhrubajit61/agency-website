import { countries } from "../../assets/Countrylist";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import "../../assets/css/login.css";
import { OpenLoginModalContext } from "./Contextapi";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import Preloader2 from "./Preloader2";
import "../../assets/css/Modal.css";
import { Responsecontext } from "./Contextapi";
import { Openmodal2context } from "./Contextapi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiUrl = "http://127.0.0.1:8000";
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  ); // Use context to get the value
  const { response, setResponse } = useContext(Responsecontext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isModalOpen2, setIsModalOpen2 } = useContext(Openmodal2context);
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };
  const handleOpenModal2 = () => {
    setIsLoginModalOpen(false);
    setIsModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
    setResponse([]);
  };
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
    email: "Ji@gmail.com",
    password: "123",
  });

  // Use navigate
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const delay = new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response1 = await Promise.all([
        axios.post(`${apiUrl}/api/login`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        delay,
      ]);

      if (response1[0].data.success) {
        // setIsModalOpen(false);
        // setIsModalOpen2(true);

        // setResponse(response[0].data.success);
        // setFormData({
        //   email: "",
        //   password: "",
        // });
        alert("Login successful!");
        console.log(response1);
        localStorage.setItem("access_token", response1[0].data.token); // Save token
        // Redirect user, e.g.:
        navigate("/Dashboard");
      } else {
        setResponse(response1[0].data.message);
        console.log("else part");
        setIsModalOpen2(true);
      }
    } catch (error) {
      alert(error.message + " occured, Please try again later");
      console.log(error);
    } finally {
      setLoading(false); // Stop loader after both API call and delay
    }
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal login-modal">
          <button className="close-button" onClick={handleCloseModal}>
            &times;
          </button>
          <h2>Login here</h2>
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
            <form
              onSubmit={handleSubmit}
              style={{ opacity: loading ? 0.5 : 1 }}
            >
              <div className="form-group">
                <label htmlFor="email">Your Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your registered email"
                />
              </div>

              <label htmlFor="Password">Your Password</label>
              <div className="form-group password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="password-input"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password-button"
                  style={{
                    marginLeft: "10px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? (
                    <MdRemoveRedEye size={23} />
                  ) : (
                    <IoMdEyeOff size={23} />
                  )}
                </button>
              </div>
              <p>Forgot password?</p>
              <div className="btn-submit">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* {isModalOpen2 && (
        <div className="modal-overlay" onClick={handleOverlayClick2}>
          <div className="modal checkmodal">
            <button className="close-button" onClick={handleCloseModal2}>
              &times;
            </button>

            <h1>
              {response === true ? (
                <div className="checkmark">
                  <img src={checkmark} alt="" />
                  <h4>Success</h4>
                  <p>
                    Your query Successfully submitted. We will get back to you
                    soon!
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
      )} */}
    </>
  );
};
export default Login;
