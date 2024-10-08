import React, { useState, useEffect } from 'react';
import './App.css';
import Banner from './components/Banner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TermSelector from './components/TermSelector.jsx';
import CoursePage from './components/CoursePage.jsx';
import { database } from './utilities/firebase.js';
import { ref, onValue } from 'firebase/database'; 
import { HashRouter } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';

const queryClient = new QueryClient();

const Main = ({ setData, setLoading, setError }) => {
  useEffect(() => {
    const dbRef = ref(database); 
    setLoading(true);
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setLoading(false);
    }, (error) => {
      setError(error);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, [setData, setLoading, setError]);

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

  const [isPlanningModalOpen, setIsPlanningModalOpen] = useState(false);

  const openPlanningModal = () => setIsPlanningModalOpen(true);
  const closePlanningModal = () => setIsPlanningModalOpen(false);

  const handleSelectTerm = (term) => {
    setSelectedTerm(term);
  };


  return (
    <HashRouter>
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">

          <Main setData={setData} setLoading={setLoading} setError={setError} />

          {isLoading && <h1>Loading courses...</h1>}
          {error && <h1>Error loading courses: {error.message}</h1>}

          {data && <Banner title={data.title}/>}
          <div>
            <Navigation/>
          </div>
          <h3>Course Selection</h3>
          
            
            
          <div style={{ display: 'flex'}}>
            <div>
              <TermSelector selectedTerm={selectedTerm} onSelectTerm={handleSelectTerm} />
            </div>
            <div>
              <button onClick={openPlanningModal} className="modal-button">
                <i style={{ marginRight: '5px' }}></i>
                Course Plan
              </button>
            </div>
            
          </div>

        </header>
        <div className = "body">
          {data && <CoursePage 
          courses={data.courses} 
          selectedTerm = {selectedTerm} 
          openPlanningModal={openPlanningModal} 
          closePlanningModal={closePlanningModal} 
          isPlanningModalOpen={isPlanningModalOpen}/>}
        </div>
      </div>
      
    </QueryClientProvider>
    </HashRouter>
  );
};

export default App;