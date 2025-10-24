import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { courses } from '../api/api';

function CourseViewer() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(0);

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
    fetchCourse();
  }, [slug]);

  if (!course) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="mb-6">{course.description}</p>

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

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Contenu du niveau {selectedLevel}</h3>
        <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
          {course.levels.find(l => l.number === selectedLevel)?.content || 'Contenu non disponible'}
        </pre>
      </div>
    </div>
  );
}

export default CourseViewer;
