import { Responsecontext } from "../Home/Contextapi";
import { useState } from "react";

export const Responsecontexprovider = ({ children }) => {
  const [response, setResponse] = useState(null);

  return (
    <Responsecontext.Provider value={{ response, setResponse }}>
      {children}
    </Responsecontext.Provider>
  );
};
