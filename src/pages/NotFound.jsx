import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="mb-4">Page non trouvée</p>
      <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Retour à l'accueil</Link>
    </div>
  );
}