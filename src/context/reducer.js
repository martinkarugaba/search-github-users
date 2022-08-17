import {
  SET_REQUESTS,
  SET_ERROR,
  SET_GITHUB_USER,
  SET_SEARCH_ERROR,
  SET_LOADING,
  STOP_LOADING,
  RESET_ERROR,
  SET_REPOS,
  SET_FOLLOWERS,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return { ...state, requests: action.payload };
    case SET_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: 'Oops! You have exceeded your hourly request limit.',
        },
      };
    case SET_GITHUB_USER:
      return { ...state, githubUser: action.payload };
    case SET_SEARCH_ERROR:
      return {
        ...state,
        error: {
          show: true,
          msg: 'Oops! Theres no user with that username',
        },
      };
    case RESET_ERROR:
      return { ...state, error: { show: false, msg: '' } };
    case SET_LOADING:
      return { ...state, isLoading: true };
    case STOP_LOADING:
      return { ...state, isLoading: false };
    case SET_REPOS:
      return { ...state, repos: action.payload };
    case SET_FOLLOWERS:
      return { ...state, followers: action.payload };

    default:
      break;
  }
};

export default reducer;
