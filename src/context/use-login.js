import { createContext, useContext } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = LoginContext.Provider;

export const useLogin = () => useContext(LoginContext);


