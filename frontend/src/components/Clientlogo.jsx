import client1 from "../assets/files/Clients/client1.svg";
import client2 from "../assets/files/Clients/client2.svg";
import client3 from "../assets/files/Clients/client3.svg";
import client4 from "../assets/files/Clients/client4.svg";
import "../assets/css/Clientlogo.css";
const Clientlogo = () => {
  return (
    <>
      <section className="clientlogo">
        <div className="container clientlogo-container">
          <img src={client1} alt="" className="clientlogoicon" />
          <img src={client2} alt="" className="clientlogoicon" />
          <img src={client3} alt="" className="clientlogoicon" />
          <img src={client4} alt="" className="clientlogoicon" />
        </div>
      </section>
    </>
  );
};
export default Clientlogo;
