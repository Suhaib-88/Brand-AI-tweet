import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import './App.css';

const App = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const handleLogin = (newToken: string) => {
  localStorage.setItem('token', newToken);
  setToken(newToken);
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  }
  return (
    <div className='App'>
      {token ?(<>
      <Dashboard token={token} />
      <button onClick={handleLogout}>Logout</button>
      </>): (<Auth onLogin={handleLogin} />)}
    </div>
  );
}
export default App;
