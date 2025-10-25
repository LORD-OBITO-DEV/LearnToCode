import { useEffect, useState } from 'react';
import API from '../api/api';
import CourseCard from '../components/CourseCard';

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get('/courses');
      setCourses(res.data);
      // Ici tu peux aussi récupérer les points de l'utilisateur depuis le backend si besoin
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Vos points : {points}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => <CourseCard key={course.slug} course={course} />)}
      </div>
    </div>
  );
}