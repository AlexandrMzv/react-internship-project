import { combineReducers } from "redux";
import { itemsReducer, dataIsLoading, dataFetchError } from "./itemsReducer";

const rootReducer = combineReducers({
  itemsReducer,
  dataIsLoading,
  dataFetchError,
});

export default rootReducer;
