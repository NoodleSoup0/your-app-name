import React, { useState, useEffect } from 'react';
import './CourseList.css';
import { timesOverlap } from '../utilities/dateUtils';
import { useAuthState, isAdmin } from '../utilities/firebase';

const CourseList = ({ courses, selectedCourses, selectedTerm, toggleSelected, openCourseModal }) => {
  const [user] = useAuthState(); // Get current user
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  // Filter courses based on the selected term
  const filteredCourses = Object.entries(courses).filter(
    ([code, course]) => course.term === selectedTerm
  );

  useEffect(() => {
    if (user) {
      console.log('user', user);
      // Check if the user is an admin
      isAdmin(user.uid).then((isAdmin) => {
        setIsUserAdmin(isAdmin);
        console.log("isAdmin", isAdmin);
      }).catch((error) => {
        console.error("Error checking admin status:", error);
      });
    } else {
      // If no user is logged in, set isUserAdmin to false
      setIsUserAdmin(false);
    }
  }, [user]); 

  return (
    <div className='course-list'>
      {filteredCourses.map(([code, course]) => {
        const isSelected = selectedCourses.some(c => c.id === code); 
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
            {/* Edit Button */}
            {isUserAdmin && ( // Only if user is admin
              <button className="button" onClick={(e) => {
                e.stopPropagation(); // Prevent the card click event
                openCourseModal(code, course);  
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
