import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import "./assets/css/Index.css";
import Herosection from "./components/Herosection";
import { BrowserRouter, Router } from "react-router-dom";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import Clientlogo from "./components/clientlogo";
import About from "./components/About";
import CounterSection from "./components/CounterSection";
import Portfolio from "./components/Portfolio";

import Team from "./components/Team";
import TestimonialSlider from "./components/Testimonials";
import Cta from "./components/Ctasection";
import Footer from "./components/Footer";

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
            <Navbar />
          </BrowserRouter>
          <Herosection />
          <Clientlogo />
          <About />
          <Services />
          <CounterSection />
          <Portfolio />
          <TestimonialSlider />
          <Cta />
          <Team />
          <ContactUs />
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
