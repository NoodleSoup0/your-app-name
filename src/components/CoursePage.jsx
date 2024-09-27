import React, { useState } from 'react';
import CourseList from './CourseList';
import Modal from './Modal';
import './CoursePage.css';
import { hasConflict } from '../utilities/dateUtils';

const CoursePage = ({ courses, selectedTerm }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelected = (course) => {
      if (selectedCourses.includes(course)) {
          // Unselect the course
          setSelectedCourses((prevSelected) => 
              prevSelected.filter((x) => x !== course)
          );
      } else if (!hasConflict(course, selectedCourses)) {
          // Select the course if there is no conflict
          setSelectedCourses((prevSelected) => [...prevSelected, course]);
      }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
              </div>
              <button onClick={openModal} className="modal-button" style={{ marginLeft: 'auto' }}>
                  Course Plan
              </button>
          </div>
          <CourseList
              courses={courses}
              selectedCourses={selectedCourses}
              selectedTerm={selectedTerm}
              toggleSelected={toggleSelected}
          />
          
          <Modal open={isModalOpen} close={closeModal}>
        {selectedCourses.length > 0 ? (
          <div>
            <h2>Your Selected Courses</h2>
            <ul>
              {selectedCourses.map((course) => (
                <div key={course.code}>
                  {course.term} CS {course.number}: {course.title} ({course.meets})
                </div>
              ))}
            </ul>
            <button onClick={closeModal} className="modal-button">Close</button>
          </div>
        ) : (
          <div>
            <h2>No Courses Selected</h2>
            <p>Please select courses to view your course plan.</p>
            <button onClick={closeModal} className="modal-button">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CoursePage;