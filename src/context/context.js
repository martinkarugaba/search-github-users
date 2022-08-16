import React, { useState, useEffect, useReducer } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import { SET_REQUESTS } from './actions';
import reducer from './reducer';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();

const initialState = {
  githubUser: mockUser,
  repos: mockRepos,
  followers: mockFollowers,
  requests: 0,
  loading: false,
};

// Provider, Consumer = GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        dispatch({ type: SET_REQUESTS, payload: remaining });
      })
      .catch((err) => console.log(err));
  };

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider value={{ ...state }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
