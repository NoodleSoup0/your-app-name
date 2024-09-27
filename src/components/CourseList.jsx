// CourseList.jsx
import React from 'react';
import './CourseCards.css';

const CourseList = ({ courses, selectedCourses, toggleSelected, selectedTerm }) => {
  // Filter courses based on the selected term
  const filteredCourses = Object.entries(courses).filter(
    ([, course]) => course.term === selectedTerm
  );

  return (
    <div className='course-list'>
      {filteredCourses.map(([code, course]) => (
        <div
          className={`course-card ${selectedCourses.includes(course) ? 'selected' : ''}`}
          key={code}
          onClick={() => toggleSelected(course)}
        >
          <div className='course-info'>
            {course.term} CS {course.number}: {course.title}
          </div>
          <div className='divider'></div>
          <div className='course-meets'>
            {course.meets}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
