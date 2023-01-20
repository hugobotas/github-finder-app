import React from 'react';
import { GithubReposResponseType } from '../../context/github/GithubReducer';
import RepoItem from './RepoItem';

interface RepoListType {
  repos: GithubReposResponseType[];
}

const RepoList = ({ repos }: RepoListType) => {
  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>Latest Repositories</h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default RepoList;
