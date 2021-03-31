import { useDispatch } from "react-redux";
import { moveToBasket, moveToStock } from "../redux/actions/itemsActions";

const SneakerItem = ({ sneaker, id, columnId }) => {
  const dispatch = useDispatch();

  const toBasketHandler = (itemId) => {
    dispatch(moveToBasket(itemId));
  };
  const toStockHandler = (itemId) => {
    dispatch(moveToStock(itemId));
  };
  const moveItem = (itemId, column) => {
    column === "inStock" ? toBasketHandler(itemId) : toStockHandler(itemId);
  };

  return (
    <div className="sneaker-item">
      <img src={sneaker.img} alt={sneaker.model.slice(0, 20)} />
      <p className="sneaker-model">{sneaker.model}</p>
      <button className="icon-button" onClick={() => moveItem(id, columnId)}>
        {columnId === "inStock" ? (
          <span className="material-icons md-white">shopping_cart</span>
        ) : (
          <span className="material-icons md-white">delete</span>
        )}
      </button>
    </div>
  );
};

export default SneakerItem;
