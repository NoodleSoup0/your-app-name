import React from 'react';
import './CourseList.css';
import { timesOverlap } from '../utilities/dateUtils';
import { useAuthState } from '../utilities/firebase'; // Import useAuthState

const CourseList = ({ courses, selectedCourses, selectedTerm, toggleSelected, openCourseModal }) => {
  // Use the custom hook to get the authenticated user
  const [user] = useAuthState(); // Get the current user state

  // Filter courses based on the selected term
  const filteredCourses = Object.entries(courses).filter(
    ([code, course]) => course.term === selectedTerm
  );

  return (
    <div className='course-list'>
      {filteredCourses.map(([code, course]) => {
        const isSelected = selectedCourses.some(c => c.id === code); // Check by course key
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
            onClick={() => !isConflicted && toggleSelected(code, course)} // Pass both key and course data
          >
            <div className='course-info'>
              {course.term} CS {course.number}: {course.title}
              {/* Show conflict indicator only for conflicted courses that are not selected */}
              {isConflicted && !isSelected && <span className="conflict-indicator"> (Conflicted)</span>}
            </div>
            <div className='divider'></div>
            <div className='course-meets'>
              {course.meets}
            </div>
            {/* Edit Button to open Course Details Modal */}
            {user && ( // Show button only if user is signed in
              <button className="button" onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                openCourseModal(code, course);  // Pass both key and course data to the modal
              }}>
                Edit
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseList;
