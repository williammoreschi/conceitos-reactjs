import React, {useState, useEffect} from "react";

import axios from './services/api';

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    async function getRepositories(){
      const response = await axios.get(`/repositories`);
      setRepositories(response.data);
    }
    getRepositories();
  },[]);

  async function handleAddRepository() {
    const response = await axios.post(`/repositories`,{
      title: 'Rocketseat',
      url: 'https://rocketseat.com.br/',
      techs: ["Node.js", "ReactJS", "React Native"]
    });
    setRepositories([...repositories,response.data]);
  }
  
  async function handleRemoveRepository(id) {
    await axios.delete(`/repositories/${id}`);
    const newRepository = repositories.filter(repo => repo.id !== id);
    setRepositories(newRepository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
