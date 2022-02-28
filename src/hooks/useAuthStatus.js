import  { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  //checks for the .current property of the ref
  //which will be true if the component is mounted
  const isMounted = useRef(true);
  useEffect(() => {
    //if the component is mounted it will run the following code
    //and get the auth status using which  it will set the value of loggedIn
    if (isMounted) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }
    return () => {
      
      isMounted.current = false;
    };
  }, [isMounted]);
  return { loggedIn, checkingStatus };
};

export default useAuthStatus;
