import Navbar from "./Home/Navbar";
import Herosection from "./Home/Herosection";
import Services from "./Home/Services";
import ContactUs from "./Home/ContactUs";
import Clientlogo from "./Home/clientlogo";
import About from "./Home/About";
import CounterSection from "./Home/CounterSection";
import Portfolio from "./Home/Portfolio";

import Team from "./Home/Team";
import TestimonialSlider from "./Home/Testimonials";
import Cta from "./Home/Ctasection";
import Footer from "./Home/Footer";

function Home() {
  return (
    <>
      <Navbar />
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
  );
}
export default Home;
