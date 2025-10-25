import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">LearnToCode</Link>
      <div>
        {user ? (
          <>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Déconnexion</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600">Connexion</Link>
        )}
      </div>
    </nav>
  );
}