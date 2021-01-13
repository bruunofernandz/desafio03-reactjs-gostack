import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositores, setRepositories ] = useState([]);
  const [inputValue, setInputValue] = useState({});
  let text = "";

  useEffect(() => {
    api.get('/repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  function handleInputChange(e) {
    setInputValue({
      title: e.target.value,
    });
  }

  async function handleAddRepository() {
    const response = await api.post('/repositories', inputValue)
      .then(res => {
        setRepositories([...repositores, res.data]);
      });

      console.log(inputValue);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`).then(res => {
      setRepositories(repositores.filter(repo => repo.id !== id));
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositores.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <div>
        <input
         type="text"
         placeholder="Digite um título"
         onChange={handleInputChange}
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
