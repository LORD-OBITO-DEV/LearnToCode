import React from 'react';
import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2">{course.title}</h2>
        <p className="text-gray-600 mb-2">{course.description}</p>
        <p className="text-sm text-gray-500">Catégorie : {course.category}</p>
      </div>
      <Link 
        to={`/course/${course.slug}`} 
        className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-secondary text-center"
      >
        Voir le cours
      </Link>
    </div>
  );
}

export default CourseCard;
