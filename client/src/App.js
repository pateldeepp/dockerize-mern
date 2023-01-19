import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [user, setUser] = useState([{}]);

  const fetchData = () => {
    return fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <footer>
        <div>
          <ul>
            {user && user.length > 0 && user.map((userObj, index) => (
              <li key={index}>{userObj.name}</li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
