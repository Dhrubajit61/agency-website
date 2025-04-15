import { Usercontext } from "../Home/Contextapi";
import { useState, useEffect, useContext } from "react";
import "../../assets/css/DashboardHome.css";

const DashboardHome = () => {
  const { user, setUser } = useContext(Usercontext);
  const clickme = () => {
    console.log(user.user.name);
  };
  return <>{user && <h3>Welcome! {user.user.name}</h3>}</>;
};
export default DashboardHome;
