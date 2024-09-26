import './CourseCards.css';

const CourseList = ({ courses }) => (
  <div className='course-list'>
    {Object.entries(courses).map(([code, course]) => (
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

export default CourseList;
