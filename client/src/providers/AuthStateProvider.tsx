import { createContext, ReactNode, useState } from "react";

interface GoogleUser {
  userId: string;
}

type User = null | GoogleUser | "guest";

// Auth state content. Dictates the state of user authorization.
// Is there a user signed in? If yes, which type.
export const AuthStateContext = createContext<[User, (user: User) => void]>([
  null,
  () => {},
]);

interface AuthStateProviderProps {
  children: ReactNode;
}

function AuthStateProvider({ children }: AuthStateProviderProps) {
  const [user, setUser] = useState<User>(null);
  return (
    <AuthStateContext.Provider value={[user, setUser]}>
      {children}
    </AuthStateContext.Provider>
  );
}

export default AuthStateProvider;
