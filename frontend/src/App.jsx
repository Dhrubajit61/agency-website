import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/Index.css";
import Home from "./components/Home";
import Dashboard from "./components/Client_dashboard/Dashboard";
import Login from "./components/Home/Login";
import IsLoginModalOpenprovider from "./components/Contexapiproviders/IsLoginModalOpenprovider";
import { UserContextProvider } from "./components/Contexapiproviders/UserContexProvider";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time or replace with actual data fetching logic
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <BrowserRouter>
            <IsLoginModalOpenprovider>
              <UserContextProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </UserContextProvider>
            </IsLoginModalOpenprovider>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
