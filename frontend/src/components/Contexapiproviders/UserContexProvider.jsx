import { Usercontext } from "../Home/Contextapi";
import { useState } from "react";

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Usercontext.Provider value={{ user, setUser }}>
      {children}
    </Usercontext.Provider>
  );
};
