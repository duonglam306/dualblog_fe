import {
  SPINNER_REQUEST,
  SPINNER_SUCCESS,
} from "../constants/spinnerConstants";

export const spinnerReducer = (state = { spinner: -1 }, action) => {
  switch (action.type) {
    case SPINNER_REQUEST:
      return { spinner: action.payload };
    case SPINNER_SUCCESS:
      return { spinner: -1 };
    default:
      return state;
  }
};
