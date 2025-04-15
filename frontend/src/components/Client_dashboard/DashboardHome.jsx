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
          <h3>Welcome! {user.user.name}</h3>
          <div className="Dashboard-cards">
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <p>25</p>
                <p>Total Requirements Submitted </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <p>25</p>
                <p>Active Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <p>25</p>
                <p>Completed Projects </p>
              </div>
            </div>
            <div className="Dashboard-card-elements">
              <div className="Dashboard-card-elements-div">
                <p>25</p>
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
