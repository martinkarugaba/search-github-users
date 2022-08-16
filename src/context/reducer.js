import { SET_REQUESTS } from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_REQUESTS:
      return {...state, requests:action.payloa}
      
      break;
  
    default:
      break;
  }
};

export default reducer;
