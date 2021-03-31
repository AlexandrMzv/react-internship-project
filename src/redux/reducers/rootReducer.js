import { combineReducers } from "redux";
import { itemsReducer, dataIsLoading, dataFetchError } from "./itemsReducer";
import { fetchClicked } from "./fetchClickedReducer";

const rootReducer = combineReducers({
  itemsReducer,
  dataIsLoading,
  dataFetchError,
  fetchClicked,
});

export default rootReducer;
