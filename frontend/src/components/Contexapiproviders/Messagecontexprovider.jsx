import { Messagecontext } from "../Home/Contextapi";
import React, { useState } from "react";

const Messagecontextprovider = ({ children }) => {
  const [message, setMessage] = useState(false);

  return (
    <Messagecontext.Provider value={{ message, setMessage }}>
      {children}
    </Messagecontext.Provider>
  );
};
export default Messagecontextprovider;
