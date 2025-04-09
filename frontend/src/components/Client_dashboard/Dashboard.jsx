import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader2 from "../Home/Preloader2";
import "../../assets/css/login.css";
import "../../assets/css/Modal.css";
import { useContext } from "react";
import { Openloginmodalcontext } from "../Home/Contextapi";

const Dashboard = () => {
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000";
  const [loading, setLoading] = useState(false);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    Openloginmodalcontext
  );
  const [successfullogout, setSuccessfullogout] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token"); // ⚠️ For now using localStorage

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Send token in header
          },
        });

        console.log("User info:", response.data);

        if (!response.data.valid) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const handlelogoutclick = () => {
    localStorage.removeItem("access_token");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessfullogout(true);
    }, 500);

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };
  const handleOverlayClick = (e) => {
    // Check if click is outside the modal area
    if (e.target.classList.contains("modal-overlay")) {
      handleCloseModal();
    }
  };
  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
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
      </div>
      {successfullogout == false ? (
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard! You are authenticated.</p>
          <button onClick={handlelogoutclick}>Logout here</button>
        </div>
      ) : (
        <div className="modal-overlay">
          <div className="modal login-modal">
            <h1>Logged out successfully</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
