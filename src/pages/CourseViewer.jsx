import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses, ads } from '../api/api';
import Exercise from '../components/Exercise';

function CourseViewer() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await courses.getOne(slug);
        setCourse(res.data);
        if (res.data.levels.length > 0) setSelectedLevel(res.data.levels[0].number);
      } catch (err) {
        console.error(err);
      }
    }

    // Récupérer les points de l'utilisateur depuis le token
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserPoints(payload.points || 0);
    }

    fetchCourse();
  }, [slug]);

  const handleExerciseComplete = async () => {
    try {
      const res = await ads.watched(); // Ajouter 1 point par exercice réussi
      setUserPoints(res.data.points);
      alert('✅ Exercice réussi ! Point ajouté.');
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <p>Chargement...</p>;

  const currentLevel = course.levels.find(l => l.number === selectedLevel);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <p className="mb-4">Points disponibles : {userPoints}</p>

      <h2 className="text-2xl font-bold mb-2">Niveaux</h2>
      <div className="flex gap-2 mb-4">
        {course.levels.map(level => (
          <button
            key={level.number}
            onClick={() => setSelectedLevel(level.number)}
            className={`px-3 py-1 rounded ${selectedLevel === level.number ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            Niveau {level.number} ({level.pricePoints} pts)
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-bold mb-2">Contenu du niveau {selectedLevel}</h3>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{currentLevel.content}</pre>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">Exercices</h3>
        {currentLevel.exercises.map((ex, idx) => (
          <Exercise key={idx} exercise={ex} onComplete={handleExerciseComplete} />
        ))}
      </div>
    </div>
  );
}

export default CourseViewer;
