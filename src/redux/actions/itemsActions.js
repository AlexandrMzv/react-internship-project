import axios from "axios";
import {
  ON_SEARCH,
  ON_DRAG,
  MOVE_ALL_TO_BASKET,
  MOVE_ALL_TO_STOCK,
  MOVE_TO_BASKET,
  MOVE_TO_STOCK,
  SNEAKERS_DATA,
  DATA_FETCH_ERROR,
  DATA_IS_LOADING,
} from "../constants/actionTypes";

export const onSearch = (searchStr) => {
  return {
    type: ON_SEARCH,
    searchStr: searchStr.trim(),
  };
};

export const onDrag = (result) => {
  return {
    type: ON_DRAG,
    result,
  };
};

export const moveAllToBasket = (itemsInStock) => {
  return {
    type: MOVE_ALL_TO_BASKET,
    itemsInStock,
  };
};

export const moveAllToStock = (itemsInBasket) => {
  return {
    type: MOVE_ALL_TO_STOCK,
    itemsInBasket,
  };
};

export const moveToBasket = (itemId) => {
  return {
    type: MOVE_TO_BASKET,
    itemId,
  };
};

export const moveToStock = (itemId) => {
  return {
    type: MOVE_TO_STOCK,
    itemId,
  };
};

export const dataFetchError = (isError) => {
  return {
    type: DATA_FETCH_ERROR,
    isError,
  };
};

export const dataIsLoading = (isLoading) => {
  return {
    type: DATA_IS_LOADING,
    isLoading,
  };
};

export const getData = (url) => {
  return (dispatch) => {
    dispatch(dataIsLoading(true));
    axios
      .get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(`Error ${response.status}: couldn't fetch data`);
        }
        dispatch(dataIsLoading(false));
        return response;
      })
      .then((sneakers) => {
        const itemsIds = [];
        const byIds = {};
        sneakers.data.forEach((elem) => {
          const { id, ...other } = elem;
          itemsIds.push(String(id));
          byIds[id] = { ...other };
        });
        dispatch({
          type: SNEAKERS_DATA,
          payload: {
            columns: {
              inStock: {
                id: "inStock",
                itemsIds,
              },
              inBasket: {
                id: "inBasket",
                itemsIds: [],
              },
            },
            byIds,
          },
        });
      })
      .catch((error) => {
        console.log(error);

        dispatch(dataIsLoading(false));
        dispatch(dataFetchError(true));
      });
  };
};
