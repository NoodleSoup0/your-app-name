import React, { useState } from 'react';
import CourseList from './CourseList';
import Modal from './Modal';
import CourseEditor from '../pages/CourseEditor';
import './CoursePage.css';
import { hasConflict } from '../utilities/dateUtils';

const CoursePage = ({ courses, selectedTerm }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Toggle selected courses, now passing courseKey (code) and courseData
  const toggleSelected = (courseKey, courseData) => {
    const courseWithKey = { ...courseData, id: courseKey }; // Include key with course data

    if (selectedCourses.some(c => c.id === courseKey)) {
      setSelectedCourses((prevSelected) => 
        prevSelected.filter((x) => x.id !== courseKey)
      );
    } else if (!hasConflict(courseWithKey, selectedCourses)) {
      setSelectedCourses((prevSelected) => [...prevSelected, courseWithKey]);
    }
  };

  const openPlanningModal = () => setIsPlanningModalOpen(true);
  const closePlanningModal = () => setIsPlanningModalOpen(false);

  // Open Course Modal with courseKey and courseData
  const openCourseModal = (courseKey, courseData) => {
    console.log('Selected Course:', courseData);
    setCurrentCourse({ ...courseData, id: courseKey });
    setIsCourseModalOpen(true);
  };

  const closeCourseModal = () => {
    setIsCourseModalOpen(false);
    setCurrentCourse(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Course Management</h1>
        <button onClick={openPlanningModal} className="modal-button" style={{ marginLeft: 'auto' }}>
          <i className="fas fa-calendar-alt" style={{ marginRight: '5px' }}></i>
          Course Plan
        </button>
      </div>
      <CourseList
        courses={courses}
        selectedCourses={selectedCourses}
        selectedTerm={selectedTerm}
        toggleSelected={toggleSelected} 
        openCourseModal={openCourseModal}
      />

      {/* Planning Modal */}
      {isPlanningModalOpen && (
        <Modal open={isPlanningModalOpen} close={closePlanningModal}>
          <div>
            <h2>Your Selected Courses</h2>
            <ul>
              {selectedCourses.map((course) => (
                <li key={course.id}> 
                  {course.term} CS {course.number}: {course.title} ({course.meets})
                </li>
              ))}
            </ul>
            <button onClick={closePlanningModal} className="modal-button">Close</button>
          </div>
        </Modal>
      )}

      {/* Course Details Modal */}
      {isCourseModalOpen && currentCourse && (
        <Modal open={isCourseModalOpen} close={closeCourseModal}>
          <div>
            <h2>Edit Course Details</h2>
            <CourseEditor course={currentCourse} courseId={currentCourse.id} onClose={closeCourseModal} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CoursePage;
