import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentBlogger, setCurrentBlogger] = useState();
  useEffect(()=>{
    const user = localStorage.getItem("blogger");
    const token = localStorage.getItem("token");
    if(user && token){
      setIsLoggedIn(true);
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
      setCurrentBlogger(user);}
  },[isLoggedIn,currentBlogger]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentBlogger, setCurrentBlogger }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
