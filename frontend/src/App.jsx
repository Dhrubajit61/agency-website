import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/Index.css";
import Home from "./components/Home";
import Dashboard from "./components/Client_dashboard/Dashboard";
import Admindashboard from "./components/Admin/Admindashboard";
import Login from "./components/Home/Login";
import IsLoginModalOpenprovider from "./components/Contexapiproviders/IsLoginModalOpenprovider";
import { UserContextProvider } from "./components/Contexapiproviders/UserContexProvider";
import { Responsecontexprovider } from "./components/Contexapiproviders/Responsecontexprovider";
import { Openmodal2context } from "./components/Home/Contextapi";
import Openmodal2contextprovider from "./components/Contexapiproviders/Openmodal2contextprovider";
import Messagecontextprovider from "./components/Contexapiproviders/Messagecontexprovider";
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
                <Responsecontexprovider>
                  <Openmodal2contextprovider>
                    <Messagecontextprovider>
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                          path="/clientdashboard/*"
                          element={<Dashboard />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route
                          path="/admindashboard/*"
                          element={<Admindashboard />}
                        />
                      </Routes>
                    </Messagecontextprovider>
                  </Openmodal2contextprovider>
                </Responsecontexprovider>
              </UserContextProvider>
            </IsLoginModalOpenprovider>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
