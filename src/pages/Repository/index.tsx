import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

import api from '../../services/api';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './style.scss';

interface RepositoryParams {
  repository: string;
  page: string;
}

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}
  const currentLocation = window.location.pathname;
  let title = 'Repositórios';

  const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  const [repositories, setRepositories] = useState<Repository[] | null>(null);

  if (params.page !== 'repos'){
    title = 'Repositórios Favoritos';
  }

  useEffect(() => {
    api.get(`users/${params.repository}/${params.page}`).then((response) => {
      setRepositories(response.data);
    });
  }, [params.repository]);

  return (
    <>
      <Header/>
      <Link className="back" to="/">
          <FiChevronLeft size={16}/> Voltar
      </Link>

      <div className="container">
        <h1 className="title">{title}</h1>
        {repositories && (
          <div className="repository_info">
          {repositories.map((repo, index ) => (
          <div className="item" key={index}>
            <ul>
              <li>
                <a href={repo.html_url} target="_blank"><strong>{repo.name}</strong></a>
                <p>{repo.description}</p>
              </li>
            </ul>
            <ul className="info_repo">
              <li>
                <strong>{repo.stargazers_count}</strong>
                <span>Stars</span>
              </li>
              <li>
                <strong>{repo.forks_count}</strong>
                <span>Forks</span>
              </li>
              <li>
                <strong>{repo.open_issues_count}</strong>
                <span>Issues abertas</span>
              </li>
            </ul>
          </div>
          ))}
        </div>
        )}
      </div>
      <Footer/>

    </>
  );
};

export default Repository;
