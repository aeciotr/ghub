import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './style.scss';


interface User {
  login: string;
  name: string;
  company: string;
  blog: string;
  avatar_url: string;
}

const Home: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [users, setUsers] = useState<User[]>(() => {
    const storagedUsers = localStorage.getItem(
      '@GithubExplorer:users',
    );

    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:users',
      JSON.stringify(users),
    );
  }, [users]);

  function clear(
    event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setUsers([]);
    localStorage.setItem(
      '@GithubExplorer:users',
      '',
    );
  }

  async function handleAddUser(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newUser) {
      setInputError('Digite o usuário do github.');
      return;
    }

    try {
      const response = await api.get<User>(`/users/${newUser}`);

      const user = response.data;

      setUsers([...users, user]);
      setNewUser('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
    <Header/>
    <div className="container">
      <form  onSubmit={handleAddUser}>
          <input
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Digite o nome do usuário"
          />
          <button type="submit">Pesquisar</button>

        </form>
        <a className="clear" href="" onClick={clear}>Limpar pesquisa</a>

        {inputError && <span className="__error">{inputError}</span>}

        <div className="user">
          {users.map((user, index) => (
            <div className="item" key={index}>
              <div>
                <img
                  src={user.avatar_url}
                  alt={user.avatar_url}
                />
                <p>{user.login}</p>
              </div>
              <div>
                <strong>{user.name}</strong>
                <p>{user.company}</p>
                <p>{user.blog}</p>
              </div>
              <div>
              <Link className="btn btn-repo" to={`/repositories/${user.login}/repos`}> Repositorios </Link>
              <Link className="btn btn-star" to={`/starreds/${user.login}/starred`}> Starreds </Link>
            </div>
              <FiChevronRight size={20} />
            </div>
          ))}
        </div>
       </div>
      <Footer/>
    </>
  );
};

export default Home;
