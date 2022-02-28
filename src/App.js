import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Header from "./components/Common/Header/Header";
import ThemeContext from "./context/ThemeContext";
import Landing from "./pages/Landing";
import PrivateRoute from "./components/Private/PrivateRoute";
import Dash from "./pages/Dash";
function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Private Routes in React Router Dom V6*/ }
          <Route path='/dash' element={<PrivateRoute />}>
            <Route path='/dash' element={<Dash />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
