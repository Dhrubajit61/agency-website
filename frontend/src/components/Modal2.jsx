import { useContext, useEffect } from "react";
import { Responsecontext } from "./Contextapi";
import { Openmodalcontext } from "./Contextapi";
import { Openmodal2context } from "./Contextapi";
import checkmark from "../assets/files/checkmark.png";
import { Openloginmodalcontext } from "./Contextapi";
import "../assets/css/Modal2.css";
const Modal2 = () => {
  const { response, setResponse } = useContext(Responsecontext);
  const { isSignupModalOpen, setIsSignupModalOpen } =
    useContext(Openmodalcontext); // Use context to get the value
  const { isModalOpen2, setIsModalOpen2 } = useContext(Openmodal2context);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    Openloginmodalcontext
  );

  const handleopenlogin = () => {
    setIsSignupModalOpen(false);
    setIsModalOpen2(false);
    setIsLoginModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      setIsModalOpen2(false);
    }
  };
  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
    // setResponse([]);
  };
  console.log("This is ");
  console.log(response);
  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal checkmodal">
          <button className="close-button" onClick={handleCloseModal2}>
            &times;
          </button>

          <h1>
            {response.success === true ? (
              <div className="checkmark">
                <img src={checkmark} alt="" />
                <h4>Success</h4>
                <p>
                  Successfully registered.
                  <p className="loginbtn" onClick={handleopenlogin}>
                    Click here to login
                  </p>
                </p>
              </div>
            ) : (
              <div className="checkmark checkerror">
                {response &&
                  response.map((error, index) => (
                    <p key={index}>
                      * {index + 1} {error}
                    </p>
                  ))}
              </div>
            )}
          </h1>
        </div>
      </div>
    </>
  );
};
export default Modal2;
