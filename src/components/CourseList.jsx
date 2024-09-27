import './CourseCards.css';

const CourseList = ({ courses , selectedTerm }) => {
  // Filter courses based on the selected term
  const filteredCourses = Object.entries(courses).filter(([code, course]) => course.term === selectedTerm);

  return (
    <div className='course-list'>
      {filteredCourses.map(([code, course]) => (
        <div className='course-card' key={code}>
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
