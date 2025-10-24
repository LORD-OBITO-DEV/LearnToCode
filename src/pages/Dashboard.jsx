import React, { useEffect, useState } from 'react';
import { courses, ads } from '../api/api';
import CourseCard from '../components/CourseCard';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ points: 0 });
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const decoded = jwtDecode(token);
    setUser(prev => ({ ...prev, email: decoded.email }));

    async function fetchData() {
      try {
        const coursesRes = await courses.getAll();
        setAllCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleWatchAd = async () => {
    try {
      const res = await ads.watched();
      setUser(prev => ({ ...prev, points: res.data.points }));
      alert('Point ajouté !');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">Points disponibles : {user.points}</p>
      <button
        onClick={handleWatchAd}
        className="mb-6 bg-accent text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Regarder une pub
      </button>
      <h2 className="text-2xl font-bold mb-4">Tous les cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
