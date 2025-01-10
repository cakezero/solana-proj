import { createContext, useContext } from "react";
import { UserContextType } from '../types/types'

// setReferrals: React.Dispatch<React.SetStateAction<string | undefined>>;
// setGlobalUsername: React.Dispatch<React.SetStateAction<string | undefined>>;

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => useContext(UserContext);
