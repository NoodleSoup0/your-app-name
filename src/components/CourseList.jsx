const CourseList = ({ courses }) => (
    <ul>
      {Object.entries(courses).map(([code, course]) => (
        
          <h2>
            {course.term} CS {course.number}: {course.title}
          </h2>
    
      ))}
    </ul>
  );
  
  export default CourseList;
  