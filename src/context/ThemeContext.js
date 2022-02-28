import React,{createContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext();
// Provider is the component that will be used to wrap the app
//this uses the useLocalStorage hook to set the theme and set the value in local storage
//the value is set to light by default
export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useLocalStorage('theme', 'light')
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
  )
}

export default ThemeContext