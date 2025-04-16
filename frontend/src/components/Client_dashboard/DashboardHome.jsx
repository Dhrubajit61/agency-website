import { Usercontext } from "../Home/Contextapi";
import { useState, useEffect, useContext } from "react";
import "../../assets/css/DashboardHome.css";

const DashboardHome = () => {
  const { user, setUser } = useContext(Usercontext);
  const clickme = () => {
    console.log(user.user.name);
  };
  return (
    <>
      {user && (
        <div>
          <div style={{ margin: "5px" }}>
            <h3>Welcome! {user.user.name}</h3>
          </div>
          <div className="Dashboard-cards">
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n1">
                  <p>25</p>
                </div>
                <p>Total Requirements Submitted </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n2">
                  <p>25</p>
                </div>
                <p>Active Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n3">
                  <p>25</p>
                </div>
                <p>Completed Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <div className="Dashboard-card-number n4">
                  <p>25</p>
                </div>
                <p>Unread Messages </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DashboardHome;
