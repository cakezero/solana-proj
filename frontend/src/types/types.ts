export interface User {
  username: string | undefined;
  referrals: string | undefined;
}

export interface UserContextType {
  globalUser: User | undefined;
  setGlobalUser: (user: User | null) => void
}
