import { IUser } from "@/interfaces";
import { FC, PropsWithChildren, useReducer, useEffect } from "react";
import { AuthContext, authReducer } from ".";
import { tesloApi } from "@/api";
import Cookies from "js-cookie";
import axios from "axios";
import Cookie from "js-cookie";

// lo que tengo en el estado
export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);
      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
    } catch (error) {
      Cookie.remove("token");
    }
  };

  const logginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      console.log("HACE EL LOGIN");
      const { data } = await tesloApi.post("/user/login", {
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);

      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });

      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post("/user/register", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token);

      dispatch({
        type: "[Auth] - Login",
        payload: user,
      });
      //  TODO return
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario - intente de nuevo",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logginUser,
        registerUser,
      }}
    >
      {" "}
      {children}
    </AuthContext.Provider>
  );
};
