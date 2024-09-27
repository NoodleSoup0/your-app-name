// CoursePage.jsx
import { useState } from 'react';
import CourseList from './CourseList';

const CoursePage = ({ courses , selectedTerm }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleSelected = (courses) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(courses)
        ? prevSelected.filter((x) => x !== courses)
        : [...prevSelected, courses]
    );
  };

  return (
    <div>
      <CourseList 
        courses={courses} 
        selectedCourses={selectedCourses} 
        selectedTerm={selectedTerm}
        toggleSelected={toggleSelected} 
      />
    </div>
  );
};

export default CoursePage;
