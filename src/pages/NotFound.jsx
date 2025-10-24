import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page non trouvée</p>
      <Link to="/" className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary">
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
