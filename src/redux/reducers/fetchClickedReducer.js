import { FETCH_CLICKED } from "../constants/actionTypes";

const initialState = {
  clicked: false,
};

export const fetchClicked = (state = initialState, action) => {
  if (action.type === FETCH_CLICKED) {
    return { ...state, clicked: true };
  }
  return state;
};
