import { IUser } from "@/interfaces";
import { createContext } from "react";

// lo que los componentes hijos van a observar
interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  logginUser: (email: string, password: string) => Promise<boolean>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  logout: () => void
}

export const AuthContext = createContext({} as ContextProps);
