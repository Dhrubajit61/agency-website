import { OpenLoginModalContext } from "../Home/Contextapi";
import React, { useState } from "react";

const isLoginModalOpenprovider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <OpenLoginModalContext.Provider
      value={{ isLoginModalOpen, setIsLoginModalOpen }}
    >
      {children}
    </OpenLoginModalContext.Provider>
  );
};
export default isLoginModalOpenprovider;
