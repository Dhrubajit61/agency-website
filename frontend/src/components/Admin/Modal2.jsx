import { useState, useEffect, useContext } from "react";
import "../../assets/css/Modal2.css";
import { Openmodal2context } from "../Home/Contextapi";

const Modal2 = () => {
  const [response, setResponse] = useState(false);
  const { openmodal2context, setOpenmodal2context } =
    useContext(Openmodal2context);

  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      setOpenmodal2context(false);
    }
  };
  const handleCloseModal2 = () => {
    setOpenmodal2context(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal checkmodal">
          <button className="close-button" onClick={handleCloseModal2}>
            &times;
          </button>
          <h3> Please assign a staff to this project </h3>
        </div>
      </div>
    </>
  );
};
export default Modal2;
