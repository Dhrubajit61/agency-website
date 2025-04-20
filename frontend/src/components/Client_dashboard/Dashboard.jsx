import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader2 from "../Home/Preloader2";
import "../../assets/css/login.css";
import "../../assets/css/Modal.css";
import { useContext } from "react";
import { OpenLoginModalContext } from "../Home/Contextapi";
import loading_gif from "../../assets/files/loading_gif.gif";
import logo from "../../assets/files/logo.svg";
import profileicon from "../../assets/files/57.webp";
import "../../assets/css/Dashboard.css";
//import react icons for menu
import { FaHome } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoMdNotifications } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

//rect logout icon
import { LuLogOut } from "react-icons/lu";

//import user context
import { Usercontext } from "../Home/Contextapi";

//import DashboardHome component
import DashboardHome from "./Dashboardhome";

import NewProject from "./NewProject2";

const Dashboard = () => {
  const navigate = useNavigate();
  const apiUrl = "http://127.0.0.1:8000";
  const [loading, setLoading] = useState(false);
  const { isLoginModalOpen, setIsLoginModalOpen } = useContext(
    OpenLoginModalContext
  );

  const [successfullogout, setSuccessfullogout] = useState(false);
  const [timer, setTimer] = useState(5);
  const { user, setUser } = useContext(Usercontext);
  useEffect(() => {
    console.log("Dashboard saw user change:", user);
  }, [user]);
  const [section, setSection] = useState("DashboardHome");
  const handleclickme = (v) => {
    setSection(v);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token"); // ⚠️ For now using localStorage

      if (!token) {
        setIsLoginModalOpen(true);
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(`${apiUrl}/api/user-info`, {
          headers: {
            Authorization: `Bearer ${token}`, // 🔐 Send token in header
          },
        });

        // console.log("User info1:", response.data);
        setUser(response.data);

        if (!response.data.valid) {
          setIsLoginModalOpen(true);
          navigate("/");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  useEffect(() => {
    let countdownInterval;

    if (successfullogout) {
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdownInterval);
            setIsLoginModalOpen(true);
            navigate("/"); // Or wherever you want to redirect
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(countdownInterval); // Cleanup
  }, [successfullogout, navigate, setIsLoginModalOpen]);
  const handlelogoutclick = () => {
    setUser(null);
    localStorage.removeItem("access_token");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessfullogout(true);
      setTimer(5);
    }, 500);
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
          <div className="Dashboard-parent">
            <div className="Dashboard-nav">
              <div>
                <Link to="/">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <div className="dashboard-nav-right-icon">
                <img src={profileicon} alt="" />
                <LuLogOut
                  size={25}
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={handlelogoutclick}
                />
              </div>
            </div>
            <div className="Dashboard-section">
              <div className="Dasboard-menu">
                <div className="Dashboard-heading">
                  <h3>Dashboard Menu</h3>
                </div>
                <div className="Dashboard-menu-list">
                  <ul>
                    <li
                      onClick={() => handleclickme("DashboardHome")}
                      style={{ cursor: "pointer" }}
                    >
                      <FaHome size={25} />
                      <a>Dashboard</a>
                    </li>
                    <li
                      onClick={() => handleclickme("NewProfileClick")}
                      style={{ cursor: "pointer" }}
                    >
                      <MdAddTask size={25} />
                      <a>New Project</a>
                    </li>
                    <li>
                      <MdOutlinePendingActions size={25} />
                      <a>My Projects</a>
                    </li>
                    <li>
                      <IoChatbubblesSharp size={25} />
                      <a>Message</a>
                      <span style={{ color: "red" }}>(2)</span>
                    </li>
                    <li>
                      <IoMdNotifications size={25} />
                      <a>Notifications</a>
                    </li>
                    <li>
                      <MdManageAccounts size={25} />
                      <a>My Account</a>
                    </li>
                    <li>
                      <FaMoneyCheck size={25} />
                      <a>Billing & Payments</a>
                    </li>
                    <li>
                      <BiSupport size={25} />
                      <a>Support</a>
                    </li>
                    <li
                      onClick={handlelogoutclick}
                      style={{ cursor: "pointer" }}
                    >
                      <LuLogOut size={25} />
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="Dashboard-info">
                {section == "DashboardHome" ? (
                  <DashboardHome></DashboardHome>
                ) : (
                  <></>
                )}
                {section == "NewProfileClick" ? (
                  <NewProject></NewProject>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-overlay">
          <div
            className="modal"
            style={{
              backgroundColor: "#fff!important",
              textAlign: "center",
              width: "500px",
            }}
          >
            <h2>Logged out successfully</h2>
            <br />
            <div>
              <h3 style={{ color: "green" }}>
                Redirecting to Login page in {timer}{" "}
                <img
                  src={loading_gif}
                  alt=""
                  style={{
                    height: "25px",
                    marginBottom: "-5px",
                    marginLeft: "5px",
                  }}
                />{" "}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
