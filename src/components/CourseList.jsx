import React from 'react';
import './CourseCards.css';
import { timesOverlap } from '../utilities/dateUtils';


const CourseList = ({ courses, selectedCourses, selectedTerm, toggleSelected }) => {
  // Filter courses based on the selected term
  const filteredCourses = Object.entries(courses).filter(([code, course]) => course.term === selectedTerm);

  return (
      <div className='course-list'>
          {filteredCourses.map(([code, course]) => {
              const isSelected = selectedCourses.includes(course);
              const isConflicted = selectedCourses.some(selectedCourse => 
                  selectedCourse.term === course.term &&
                  timesOverlap(selectedCourse.meets, course.meets)
              );

              // Determine the class names based on selection and conflict
              const className = `course-card ${isSelected ? 'selected' : ''} ${isConflicted && !isSelected ? 'conflicted' : ''}`;

              return (
                  <div
                      className={className}
                      key={code}
                      onClick={() => !isConflicted && toggleSelected(course)}
                  >
                      <div className='course-info'>
                          {course.term} CS {course.number}: {course.title}
                          {/* Show conflict indicator only for conflicted courses that are not selected */}
                          {isConflicted && !isSelected}
                      </div>
                      <div className='divider'></div>
                      <div className='course-meets'>
                          {course.meets}
                      </div>
                  </div>
              );
          })}
      </div>
  );
};

export default CourseList;