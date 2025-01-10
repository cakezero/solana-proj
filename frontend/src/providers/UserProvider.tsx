import { useState, ReactNode } from "react";
import { UserContext } from "./useUser";
import { User } from '../types/types'

// UserProvider component to wrap the app and provide the user state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [globalUser, setGlobalUser] = useState<User | undefined>(undefined);

  return (
    <UserContext.Provider
      value={{ globalUser, setGlobalUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

// export const useUser = () => useContext(UserContext);