// CoursePage.jsx
import React, { useState } from 'react';
import CourseList from './CourseList';
import Modal from './Modal';
import './CoursePage.css';

const CoursePage = ({ courses, selectedTerm }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSelected = (course) => {
    setSelectedCourses((prevSelected) =>
      prevSelected.includes(course)
        ? prevSelected.filter((x) => x !== course)
        : [...prevSelected, course]
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
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
