import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">LearnToCode</Link>
      <div className="space-x-4">
        <Link to="/">Accueil</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-white text-primary px-3 py-1 rounded">Connexion</Link>
            <Link to="/register" className="bg-white text-primary px-3 py-1 rounded">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
