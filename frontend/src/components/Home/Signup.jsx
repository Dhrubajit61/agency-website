import { countries } from "../../assets/Countrylist";
import { useState } from "react";
import { useContext } from "react";
import { Openmodalcontext } from "./Contextapi";
import { Openmodal2context } from "./Contextapi";
import { OpenLoginModalContext } from "./Contextapi";
import axios from "axios";
import "../../assets/css/signup.css";
import { MdRemoveRedEye } from "react-icons/md";
import { IoMdEyeOff } from "react-icons/io";
import Preloader2 from "./Preloader2";
import "../../assets/css/Modal.css";
import { Responsecontext } from "./Contextapi";

const Signup = () => {
  const apiUrl = "http://127.0.0.1:8000";
  const { isSignupModalOpen, setIsSignupModalOpen } =
    useContext(Openmodalcontext); // Use context to get the value
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  ); // Use context to get the value
  const { response, setResponse } = useContext(Responsecontext);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isModalOpen2, setIsModalOpen2 } = useContext(Openmodal2context);
  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };
  const handleOpenModal2 = () => {
    setISignupsModalOpen(false);
    setIsModalOpen2(true);
  };

  // const handleCloseModal2 = () => {
  //   setIsModalOpen2(false);
  //   setResponse([]);
  // };
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };
  const handleloginclick = () => {
    setIsLoginModalOpen((prevState) => !prevState);
    setIsSignupModalOpen(false);
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
    country_code: "",
    contactnumber: "",
    password: "",
    serviceType: "",
  });

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
        axios.post(`${apiUrl}/api/create-users`, formData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        delay,
      ]);
      setResponse(response1[0].data);
      console.log("signup response part");
      console.log(response1);

      if (response1[0].data.success) {
        setIsSignupModalOpen(false);
        setIsModalOpen2(true);

        setFormData({
          name: "",
          email: "",
          country_code: "",
          contactnumber: "",
          password: "",
          confirmedpassword: "",
          serviceType: "",
        });
      } else {
        setResponse(response1[0].data.errors);
        // setIsSignupModalOpen(false);
        // console.log(response);
        setIsModalOpen2(true);
      }
    } catch (error) {
      alert(error.message + " occured, Please try again later");
      setIsSignupModalOpen(false);
      // console.log(response);
      // console.log(error);
      // alert("Error while submitting the form!", error);
    } finally {
      // console.log(response);
      setLoading(false); // Stop loader after both API call and delay
    }
  };
  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal signup-modal">
          <button className="close-button" onClick={handleCloseModal}>
            &times;
          </button>
          <h2>Sign up/ Login to start a project with us</h2>
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
                <label htmlFor="name">Your name/Company Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name/Company Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Select a country</label>
                <select
                  id="country"
                  name="country_code"
                  className="country"
                  value={formData.country}
                  onChange={(e) => {
                    handleChange(e);
                    handleCountryChange(e);
                  }}
                >
                  <option value="">-- Select a Country --</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {/* {selectedCountry && (
                  <p>
                    Selected Country Code: <strong>{selectedCountry}</strong>
                  </p>
                )} */}
              </div>
              <div className="form-group">
                <label htmlFor="mobileno">Contact number(Optional):</label>
                <input
                  type="number"
                  name="contactnumber"
                  value={formData.contactnumber}
                  onChange={handleChange}
                  placeholder="Your contact no"
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
                  placeholder="Choose a strong password"
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
              <label htmlFor="ConfirmPassword">Confirm Password</label>
              <div className="form-group password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmedpassword"
                  value={formData.confirmedpassword}
                  onChange={handleChange}
                  required
                  placeholder="Choose a strong password"
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
              <div className="form-group">
                <label htmlFor="Servicetype">
                  Type of service you want to avail
                </label>
                <select
                  id="servicetype"
                  name="serviceType"
                  className="serviceType"
                  value={formData.serviceType} // Assuming `formData.serviceType` is in your state
                  onChange={handleChange}
                >
                  <option value="">Select a service</option>
                  <option value="webDevelopment">Web Development</option>
                  <option value="mobileAppDevelopment">
                    Mobile App Development
                  </option>
                  <option value="seoServices">SEO Services</option>
                  <option value="graphicDesign">Graphic Design</option>
                  <option value="others">Others</option>
                </select>
              </div>

              <div className="btn-submit">
                <button type="submit">Submit</button>
              </div>
            </form>
            <div className="Loginhere">
              <span>Already have account? </span>
              <span style={{ color: "blue" }}>
                <button onClick={handleloginclick}>Login here</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
