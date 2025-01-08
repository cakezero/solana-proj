import { useState, ReactNode } from "react";
import { UserContext } from "./useUser";

// UserProvider component to wrap the app and provide the user state
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [globalUsername, setGlobalUsername] = useState<string | undefined>(undefined);
  const [referrals, setReferrals] = useState<string | undefined>(undefined);

  return (
    <UserContext.Provider
      value={{ globalUsername, setGlobalUsername, referrals, setReferrals }}
    >
      {children}
    </UserContext.Provider>
  );
};

// export const useUser = () => useContext(UserContext);