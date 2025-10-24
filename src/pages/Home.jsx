import React, { useEffect, useState } from 'react';
import { courses } from '../api/api';
import CourseCard from '../components/CourseCard';

function Home() {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await courses.getAll();
        setAllCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur LearnToCode !</h1>
      <p className="mb-6">Gagne des points en regardant des pubs et débloque des cours pour apprendre JS, Python, HTML, CSS et plus.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Home;
