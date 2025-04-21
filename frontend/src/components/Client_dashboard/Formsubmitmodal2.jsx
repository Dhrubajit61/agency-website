import { useContext, useEffect } from "react";
import { Responsecontext } from "../Home/Contextapi";
import { Openmodalcontext } from "../Home/Contextapi";

import checkmark from "../../assets/files/checkmark2.gif";
import { OpenLoginModalContext } from "../Home/Contextapi";
import "../../assets/css/Modal2.css";
import { GoDotFill } from "react-icons/go";
import { Openmodal2context } from "../Home/Contextapi";
const Formsubmitmodal2 = () => {
  const { response, setResponse } = useContext(Responsecontext);
  const { isSignupModalOpen, setIsSignupModalOpen } =
    useContext(Openmodalcontext); // Use context to get the value

  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  );
  const { openmodal2context, setOpenmodal2context } =
    useContext(Openmodal2context);

  const handleopenlogin = () => {
    setIsSignupModalOpen(false);

    setIsLoginModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      setOpenmodal2context(false); // ✅ correct based on your context usage
      setResponse(null);
    }
  };
  const handleCloseModal2 = () => {
    setOpenmodal2context(false); // ✅ correct based on your context usage
    setResponse(null);

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
            {response?.request?.status === 200 ? (
              <div className="checkmark">
                <img src={checkmark} alt="" />
                <h4>Success</h4>
                <p style={{ letterSpacing: "unset" }}>
                  New request form submitted successfully with Project id{" "}
                  <span>
                    #P100
                    {response.data.projectid}
                  </span>
                </p>
              </div>
            ) : (
              <div className="checkmark checkerror">
                {/* {response &&
                  response.map((error, index) => <p key={index}>* {error}</p>)} */}
                {response && <p>Please Enter correct Data</p>}
              </div>
            )}
          </h1>
        </div>
      </div>
    </>
  );
};
export default Formsubmitmodal2;
