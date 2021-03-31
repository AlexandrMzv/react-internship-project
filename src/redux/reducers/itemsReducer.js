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

const initialState = {
  data: {
    columns: {
      inStock: {
        id: "inStock",
        itemsIds: [],
      },
      inBasket: {
        id: "inBasket",
        itemsIds: [],
      },
    },
    byIds: {},
  },
  backupData: {},
};

export const dataIsLoading = (state = false, action) => {
  if (action.type === DATA_IS_LOADING) {
    return action.isLoading;
  }
  return state;
};

export const dataFetchError = (state = false, action) => {
  if (action.type === DATA_FETCH_ERROR) {
    return action.isError;
  }
  return state;
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SNEAKERS_DATA:
      return sneakersData(state, action);
    case ON_SEARCH:
      return onSearch(state, action);
    case MOVE_ALL_TO_BASKET:
      return moveAllToBasket(state, action);
    case MOVE_ALL_TO_STOCK:
      return moveAllToStock(state, action);
    case MOVE_TO_BASKET:
      return moveToBasket(state, action);
    case MOVE_TO_STOCK:
      return moveToStock(state, action);
    case ON_DRAG:
      return onDrag(state, action);
    default:
      return state;
  }
};

const sneakersData = (state, action) => {
  return {
    ...state,
    data: action.payload,
    backupData: action.payload,
  };
};

const onSearch = (state, action) => {
  const searchStr = action.searchStr;
  const idsInBasket = state.data.columns.inBasket.itemsIds;
  const filteredItems = state.backupData.columns.inStock.itemsIds.filter(
    (valId) => {
      return (
        state.data.byIds[valId].model
          .toLowerCase()
          .includes(searchStr.toLowerCase()) && !idsInBasket.includes(valId)
      );
    }
  );
  return {
    ...state,
    data: {
      ...state.data,
      columns: {
        ...state.data.columns,
        inStock: {
          id: "inStock",
          itemsIds: [...filteredItems],
        },
      },
      byIds: {
        ...state.data.byIds,
      },
    },
  };
};

const moveAllToBasket = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      columns: {
        ...state.data.columns,
        inStock: {
          id: "inStock",
          itemsIds: [],
        },
        inBasket: {
          id: "inBasket",
          itemsIds: [
            ...state.data.columns.inBasket.itemsIds,
            ...action.itemsInStock,
          ],
        },
      },
      byIds: {
        ...state.data.byIds,
      },
    },
  };
};

const moveAllToStock = (state, action) => {
  return {
    ...state,
    data: {
      ...state.data,
      columns: {
        ...state.data.columns,
        inStock: {
          id: "inStock",
          itemsIds: [
            ...state.data.columns.inStock.itemsIds,
            ...action.itemsInBasket,
          ],
        },
        inBasket: {
          id: "inBasket",
          itemsIds: [],
        },
      },
      byIds: {
        ...state.data.byIds,
      },
    },
  };
};

const moveToBasket = (state, action) => {
  const itemId = state.data.columns.inStock.itemsIds.indexOf(action.itemId);
  return {
    ...state,
    data: {
      columns: {
        inStock: {
          id: "inStock",
          itemsIds: [
            ...state.data.columns.inStock.itemsIds.slice(0, itemId),
            ...state.data.columns.inStock.itemsIds.slice(itemId + 1),
          ],
        },
        inBasket: {
          id: "inBasket",
          itemsIds: [...state.data.columns.inBasket.itemsIds, action.itemId],
        },
      },
      byIds: {
        ...state.data.byIds,
      },
    },
  };
};

const moveToStock = (state, action) => {
  const itemId = state.data.columns.inBasket.itemsIds.indexOf(action.itemId);
  return {
    ...state,
    data: {
      ...state.data,
      columns: {
        ...state.data.columns,
        inStock: {
          id: "inStock",
          itemsIds: [...state.data.columns.inStock.itemsIds, action.itemId],
        },
        inBasket: {
          id: "inBasket",
          itemsIds: [
            ...state.data.columns.inBasket.itemsIds.slice(0, itemId),
            ...state.data.columns.inBasket.itemsIds.slice(itemId + 1),
          ],
        },
      },
      byIds: {
        ...state.data.byIds,
      },
    },
  };
};

const onDrag = (state, action) => {
  const { source, destination } = action.result;

  const reorder = ({ list, startIndex, endIndex }) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = ({
    source,
    destination,
    droppableSource,
    droppableDestination,
  }) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {
      [droppableSource.droppableId]: {
        id: [droppableSource.droppableId].toString(),
        itemsIds: sourceClone,
      },
      [droppableDestination.droppableId]: {
        id: [droppableDestination.droppableId].toString(),
        itemsIds: destClone,
      },
    };

    return result;
  };

  const getList = (id) => state.data.columns[id].itemsIds;

  if (!destination) {
    return state;
  }

  if (source.droppableId === destination.droppableId) {
    const newItems = reorder({
      list: getList(source.droppableId),
      startIndex: source.index,
      endIndex: destination.index,
    });

    const newColumn = {
      ...state.data.columns[source.droppableId],
      itemsIds: newItems,
    };

    return {
      ...state,
      data: {
        columns: {
          ...state.data.columns,
          [newColumn.id]: newColumn,
        },
        byIds: {
          ...state.data.byIds,
        },
      },
    };
  } else {
    const newData = move({
      source: getList(source.droppableId),
      destination: getList(destination.droppableId),
      droppableSource: source,
      droppableDestination: destination,
    });

    return {
      ...state,
      data: {
        columns: {
          ...state.data.columns,
          [source.droppableId]: newData[source.droppableId],
          [destination.droppableId]: newData[destination.droppableId],
        },
        byIds: {
          ...state.data.byIds,
        },
      },
    };
  }
};
