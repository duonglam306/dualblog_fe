import {
  SPINNER_REQUEST,
  SPINNER_SUCCESS,
} from "../constants/spinnerConstants";

export const spinnerReducer = (
  state = { spinner: { index: -1, flag: "" } },
  action
) => {
  switch (action.type) {
    case SPINNER_REQUEST:
      return {
        spinner: action.payload,
      };
    case SPINNER_SUCCESS:
      return { spinner: { index: -1, flag: "" } };
    default:
      return state;
  }
};
