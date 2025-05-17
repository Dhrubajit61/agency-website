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
      <div className="modal-overlay">
        <div className="modal checkmodal">
          <button className="close-button" onClick={handleCloseModal2}>
            &times;
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "50px",
              justifyContent: "Center",
              textAlign: "center",
            }}
          >
            <h3> Please assign a staff to this project </h3>
            <select name="" id="" style={{ height: "25px" }}>
              <option value="">Staff 1</option>
              <option value="">Staff 2</option>
              <option value="">Staff 3</option>
            </select>
            <div style={{ display: "flex" }}>
              <button
                onClick={handleCloseModal2}
                style={{
                  width: "40%",
                  marginInline: "auto",
                  padding: "8px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                style={{
                  width: "40%",
                  marginInline: "auto",
                  padding: "8px",
                  backgroundColor: "#39a94c",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal2;
