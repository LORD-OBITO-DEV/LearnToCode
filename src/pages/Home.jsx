import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

export default function Home() {
  // Exemple de cours à afficher sur la landing page
  const coursesPreview = [
    { title: 'JavaScript Complet', description: 'Apprends JS pour web et bots', slug: 'javascript' },
    { title: 'HTML & CSS Complet', description: 'Crée des sites beaux et interactifs', slug: 'html-css' },
    { title: 'Création de Bots', description: 'Apprends à coder des bots JS & Python', slug: 'bots' },
  ];

  // Exemple fictif de points que l'utilisateur pourrait gagner
  const pointsExamples = [
    { action: 'Regarder une pub', points: 1 },
    { action: 'Inviter un ami', points: 5 },
    { action: 'Compléter un exercice', points: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100">
      <header className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">LearnToCode</h1>
        <p className="text-xl mb-6 max-w-xl mx-auto">
          Apprends à coder en JavaScript, Python, HTML, CSS et crée tes propres bots.
          Gagne des points en regardant des publicités et en invitant tes amis pour débloquer des cours !
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600">
            S’inscrire
          </Link>
          <Link to="/login" className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600">
            Connexion
          </Link>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Nos cours populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coursesPreview.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-white py-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Comment gagner des points ?</h2>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {pointsExamples.map((p, i) => (
            <div key={i} className="border p-4 rounded shadow hover:shadow-lg text-center">
              <h3 className="font-bold mb-2">{p.action}</h3>
              <p className="text-blue-600 text-xl font-bold">+{p.points} points</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-6 text-center mt-12">
        &copy; {new Date().getFullYear()} LearnToCode. Tous droits réservés.
      </footer>
    </div>
  );
}