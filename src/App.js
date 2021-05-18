import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then((res) => setRepos(res.data));
  }, []);

  async function handleAddRepository() {
    const addedRepo = {
      title: `Novo Repo ${Date.now()}`,
      url: `https://www.github.com/andrelfnavarro/${Date.now()}`,
      techs: ['react', 'node', 'react native'],
    };
    api
      .post('repositories', addedRepo)
      .then((res) => setRepos((prevRepos) => [...prevRepos, res.data]));
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepos((prevRepos) => prevRepos.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repos.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
