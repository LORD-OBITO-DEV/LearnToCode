import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import Exercise from '../components/Exercise';

export default function CoursePage() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${slug}`);
        setCourse(res.data);
      } catch (err) {
        alert('Erreur récupération cours');
      }
    };
    fetchCourse();
  }, [slug]);

  const handleExerciseCompleted = (newPoints) => {
    setPoints(prev => prev + newPoints);
  };

  if (!course) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">{course.description}</p>
      {course.levels.map(level => (
        <div key={level.number} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Niveau {level.number}</h2>
          <p className="mb-2">Prix : {level.pricePoints} points</p>
          {level.exercises.map((exercise, index) => (
            <Exercise
              key={index}
              courseSlug={course.slug}
              levelNumber={level.number}
              exercise={exercise}
              index={index}
              onCompleted={handleExerciseCompleted}
            />
          ))}
        </div>
      ))}
      <p className="text-lg font-bold mt-4">Points gagnés sur ce cours : {points}</p>
    </div>
  );
}