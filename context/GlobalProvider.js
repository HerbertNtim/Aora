import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  // setting up states
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        if(user) {
          setUser(user)
          setIsLogged(true)
        } else {
          setIsLogged(false)
          setUser(null)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
          setLoading(false)
        }
      )
  }, [])
  

  return (
    <GlobalContext.Provider 
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
