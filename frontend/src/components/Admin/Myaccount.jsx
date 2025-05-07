import { useContext, useEffect, useState } from "react";
import { Responsecontext, Usercontext } from "../Home/Contextapi";
import axios from "axios";
import Formsubmitmodal2 from "./Formsubmitmodal2";
import { Openmodal2context } from "../Home/Contextapi";

const Myaccount = () => {
  const apiUrl = "http://127.0.0.1:8000";

  const { user, setUser } = useContext(Usercontext);
  const [changename, setChangename] = useState(false);
  const [changephone, setChangephone] = useState(false);
  const { response, setResponse } = useContext(Responsecontext);

  const { openmodal2context, setOpenmodal2context } =
    useContext(Openmodal2context);

  // useEffect(() => {
  //   console.log("Myaccount");
  //   console.log(user);
  // }, [user]);

  const Changenameclick = () => {
    setChangename(true);
  };
  const Changenumberclick = () => {
    setChangephone(true);
  };
  const clickcancel = () => {
    setChangename(false);
    setChangephone(false);
  };

  const [formdata, setFormdata] = useState({
    name: user?.user?.name || "", // optional chaining in case user is undefined initially
    contactnumber: user?.user?.contactnumber || "", // optional chaining in case user is undefined initially
  });

  const handleonChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    const token = localStorage.getItem("access_token");
    try {
      const response1 = await Promise.all([
        axios.post(`${apiUrl}/api/changeuserdetails`, formdata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (response1[0].data.valid) {
        setUser(response1[0].data);
        setChangename(false);
        setChangephone(false);
      }
    } catch (error) {
      alert(error.message + " occured, Please try again later");
    }
  };

  return (
    <>
      <h2>My Account</h2>
      <p>
        {changename ? (
          <>
            <input
              type="text"
              name="name"
              style={{ width: "80%" }}
              placeholder={user?.user?.name}
              onChange={handleonChange}
              value={formdata.name}
            />{" "}
            <button onClick={clickcancel}>Cancel</button>{" "}
            <button onClick={handlesubmit}>save</button>
          </>
        ) : (
          <>
            <strong>Name:</strong> {user?.user?.name}{" "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={Changenameclick}
            >
              change
            </span>
          </>
        )}
      </p>
      <p>
        <strong>Email:</strong> {user?.user?.email}
      </p>
      <p>
        {changephone ? (
          <>
            <input
              type="number"
              name="contactnumber"
              style={{ width: "80%" }}
              placeholder={user?.user?.contactnumber}
              onChange={handleonChange}
              value={formdata.contactnumber}
            />{" "}
            <button onClick={clickcancel}>Cancel</button>{" "}
            <button onClick={handlesubmit}>save</button>
          </>
        ) : (
          <>
            <strong>Phone number:</strong> {user?.user?.contactnumber}{" "}
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={Changenumberclick}
            >
              change
            </span>
          </>
        )}
      </p>
      {openmodal2context && <Formsubmitmodal2></Formsubmitmodal2>}
    </>
  );
};

export default Myaccount;
