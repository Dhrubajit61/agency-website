import react, { useState } from "react";
import { Openmodal2context } from "../Home/Contextapi";

export const Openmodal2contextprovider = ({ children }) => {
  const [openmodal2context, setOpenmodal2context] = useState(false);

  return (
    <Openmodal2context.Provider
      value={{ openmodal2context, setOpenmodal2context }}
    >
      {children}
    </Openmodal2context.Provider>
  );
};
export default Openmodal2contextprovider;
