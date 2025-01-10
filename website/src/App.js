import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import NotFound from './components/NotFound';
import Login from './components/Login'; // Import the Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;