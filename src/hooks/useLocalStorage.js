import  { useState, useEffect } from "react";

//this hook will return a function that will be used to set the value of the state
//the function will be called when the state is set 
// the key and the value will be set when the custom hook is used else where
const useLocalStorage = (key, initialValue) => {
  const [theme, setTheme] = useState(() => {
    return getStorage(key, initialValue);
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(theme));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return [theme, setTheme];
};

export default useLocalStorage;

// The code is trying to get the value of a key from localStorage.
// returns saved value if key is found else will  return the initial value as instance of function 
//or just simply return the initial value
const getStorage = (key, initialValue) => {
  const savedValue = JSON.parse(localStorage.getItem(key));

  if (savedValue) {
    return savedValue;
  }
  if (initialValue instanceof Function) {
    return initialValue();
  } else {
    return initialValue;
  }
};
