import React, { useEffect, useReducer } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';
import {
  SET_REQUESTS,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
  SET_GITHUB_USER,
  SET_SEARCH_ERROR,
  RESET_ERROR,
  SET_REPOS,
  SET_FOLLOWERS,
} from './actions';
import reducer from './reducer';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();

const initialState = {
  githubUser: mockUser,
  repos: mockRepos,
  followers: mockFollowers,
  requests: 0,
  isLoading: false,
  error: { show: false, msg: '' },
};

// Provider, Consumer = GithubContext.Provider
const GithubProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const searchGithubUser = async (user) => {
    dispatch({ type: RESET_ERROR });
    dispatch({ type: SET_LOADING });
    const response = await axios(`${rootUrl}/users/${user}`).catch(
      (error) => console.log(error)
    );

    if (response) {
      dispatch({ type: SET_GITHUB_USER, payload: response.data });
      console.log(response.data);
      const { login, followers_url } = response.data;
      // fetch repos
      axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(
        (response) => {
          dispatch({
            type: SET_REPOS,
            payload: response.data,
          });
          //console.log('Repos', response.data);
        }
      );
      // fetch followers
      axios(`${followers_url}?per_page=100`).then((response) => {
        dispatch({ type: SET_FOLLOWERS, payload: response.data });
        //console.log('Followers', response.data);
      });
    } else {
      dispatch({ type: SET_SEARCH_ERROR });
    }
    checkRequests();
    dispatch({ type: STOP_LOADING });
  };

  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        //console.log(remaining);
        dispatch({ type: SET_REQUESTS, payload: remaining });
        if (remaining === 0) {
          dispatch({ type: SET_ERROR });
        }
      })
      .catch((err) => console.log(err));
  };

  //const toggleError = (show, msg) => {
  //  dispatch({ type: SET_ERROR, payload:{show, msg} });
  //};

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider value={{ ...state, searchGithubUser }}>
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
