import React, { useState } from 'react';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch.js';

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

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          

          <Main setData={setData} setLoading={setLoading} setError={setError} />

          {isLoading && <h1>Loading courses...</h1>}
          {error && <h1>Error loading courses: {error.message}</h1>}
          {data && <Banner title={data.title}/>}
          {data && <CourseList courses={data.courses} /> }
        </header>
      </div>
    </QueryClientProvider>
  );
};

export default App;
