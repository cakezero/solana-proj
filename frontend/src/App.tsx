import { AppProvider } from "./providers/AppProvider";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { UserProvider } from "./providers/UserProvider";

function App() {
  return (
    <AppProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </UserProvider>
   </AppProvider>
  )
}

export default App

 