import React, {useState, useEffect, useReducer} from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import reducer from './reducer'

const rootUrl = "https://api.github.com";
const GithubContext = React.createContext();

const initialState = {
  gitHubUser: mockUser,
  repos: mockRepos,
  followers: mockFollowers,
};

// Provider, Consumer = GithubContext.Provider

const GithubProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GithubContext.Provider value={{...state}}>
      {children}
    </GithubContext.Provider>
  );
};

export {GithubProvider, GithubContext};
