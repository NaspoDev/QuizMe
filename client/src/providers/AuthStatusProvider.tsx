import { createContext, ReactNode, useState } from "react";
import { getUser } from "../utility/user-utility";

// Auth Status Content. Dictates the state of user authorization.
// Is there a user signed in? Yes or no.
export const AuthStatusContext = createContext<
  [boolean, (value: boolean) => void]
>([false, () => {}]);

interface AuthStatusProviderProps {
  children: ReactNode;
}

// Auth Status Provider. Providers the Auth Status context.
function AuthStatusProvider({ children }: AuthStatusProviderProps) {
  // Default value for isSignedIn state is set from session storage.
  const [isSignedIn, setSignedIn] = useState<boolean>(getUser() ? true : false);

  return (
    <AuthStatusContext.Provider value={[isSignedIn, setSignedIn]}>
      {children}
    </AuthStatusContext.Provider>
  );
}

export default AuthStatusProvider;
