import { useSelector, useDispatch } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import ItemList from "./ItemList";
import {
  onDrag,
  moveAllToBasket,
  moveAllToStock,
} from "../redux/actions/itemsActions";

const CatalogLists = () => {
  const dispatch = useDispatch();
  const onDragEnd = (result) => {
    dispatch(onDrag(result));
  };

  const moveItemsToBasket = (itemsInStock) => {
    dispatch(moveAllToBasket(itemsInStock));
  };

  const moveItemsToStock = (itemsInBasket) => {
    dispatch(moveAllToStock(itemsInBasket));
  };

  const stock = useSelector(
    (state) => state.itemsReducer.data.columns["inStock"]
  );
  const basket = useSelector(
    (state) => state.itemsReducer.data.columns["inBasket"]
  );
  const byIds = useSelector((state) => state.itemsReducer.data.byIds);

  return (
    <div className="sneaker-lists-wrap">
      <div className="dnd-sneaker-list">
        <DragDropContext onDragEnd={onDragEnd}>
          <ItemList items={stock.itemsIds} byIds={byIds} id={stock.id}>
            <button
              className="add-all-to-basket"
              disabled={!stock.itemsIds.length}
              onClick={() => moveItemsToBasket(stock.itemsIds)}
            >
              Добавить все
            </button>
          </ItemList>
          <ItemList items={basket.itemsIds} byIds={byIds} id={basket.id}>
            <button
              className="add-all-to-stock"
              disabled={!basket.itemsIds.length}
              onClick={() => moveItemsToStock(basket.itemsIds)}
            >
              Убрать все
            </button>
          </ItemList>
        </DragDropContext>
      </div>
    </div>
  );
};

export default CatalogLists;
