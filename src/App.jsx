import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';
import TermSelector from './components/TermSelector.jsx';
import CoursePage from './components/CoursePage.jsx';

const queryClient = new QueryClient();

const Main = ({ setData, setLoading, setError }) => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  // Update the states 
  React.useEffect(() => {
    setData(data);
    setLoading(isLoading);
    setError(error);
  }, [data, isLoading, error, setData, setLoading, setError]);

  if (error) return <h1>Error loading course data: {error.message}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;

  return null; 
};

const toggleSelected = (course) => {
  setSelected(selected.includes(course)
    ? selected.filter(x => x !== course)
    : [...selected, course]
  );
};

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
  };


  return (
    
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          

          <Main setData={setData} setLoading={setLoading} setError={setError} />

          

          {isLoading && <h1>Loading courses...</h1>}
          {error && <h1>Error loading courses: {error.message}</h1>}
          {data && <Banner title={data.title}/>}
          <div>
            <h3>Course Selection</h3>
            <TermSelector selectedTerm={selectedTerm} onSelectTerm={handleSelectTerm} />
          </div>
          
        </header>
        <div className = "body">
          {data && <CoursePage courses={data.courses} selectedTerm = {selectedTerm}/>}
        </div>
      </div>
      
    </QueryClientProvider>
  );
};

export default App;
