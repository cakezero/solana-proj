export interface User {
  username: string | undefined;
  referrals: number | undefined;
  refId: string | undefined
}

export interface UserContextType {
  globalUser: User | undefined;
  setGlobalUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
