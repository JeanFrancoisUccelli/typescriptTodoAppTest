import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import components
import Tasks from '../Tasks';
import Form from '../Form';

// import CSS
import './App.scss';

const App: React.FC = () => {

  
  const [tasks, setTasks] = useState([]);
  const [value, setValue] = useState<string>("");

  // FUNCTION FOR GET LIST FROM API 
  const getDataFromAPI = () => {
    axios.get(`http://localhost:1337/tasks`)
    .then((response) => {
      console.log(response.data);
      setTasks(response.data)
    })
    .catch((error) => {
      console.error(error);
    });
  };

  useEffect(() => {
    // launch request
    getDataFromAPI();
  }, []); 
  
  return (
    <div className="app">
      <h1 className="app-title">ma `to do` liste</h1>
      <section className="app-container">
        <Form 
          value={value}
          handleValue={setValue}
          getDataFromAPI={getDataFromAPI}
        />
        <p className="app-p">J'ai <span className="app-span">{tasks.length}</span> élément(s) dans ma liste</p>
        <Tasks
          tasks={tasks}
          getDataFromAPI={getDataFromAPI}
        />

      </section>
    </div>
  );
};

export default App;
