import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{course.title}</h2>
      <p className="text-gray-600 mb-4">{course.description}</p>
      <Link to={`/course/${course.slug}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">
        Voir le cours
      </Link>
    </div>
  );
}