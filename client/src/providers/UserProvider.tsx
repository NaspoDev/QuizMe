import { createContext, ReactNode, useState } from "react";

// export interface GoogleUser {
//   userId: string;
// }

// type User = null | GoogleUser | "guest";

// User Content. Dictates the state of user authorization.
// Is there a user signed in? If yes, which type.
export const UserContext = createContext<[User, (user: User) => void]>([
  null,
  () => {},
]);

interface UserProviderProps {
  children: ReactNode;
}

// User Provider. Providers the user context.
function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
