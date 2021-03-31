import { useState } from "react";
import { useDispatch } from "react-redux";
import { getData } from "../redux/actions/itemsActions";
import { fetchClicked } from "../redux/actions/fetchClickedAction";
import { URL } from "../config";

const CatalogBeforeData = () => {
  const [activeBtn, setActiveBtn] = useState(null);

  const dispatch = useDispatch();
  const handleGetData = (url) => {
    dispatch(getData(url));
    dispatch(fetchClicked());
  };

  return (
    <div className="catalog-before-data">
      <h2>Выберите тип:</h2>
      <div className="preload-buttons-group">
        <button
          id="ru-mode-btn"
          type="button"
          className={activeBtn === "ru-mode-btn" ? "active-btn" : ""}
          onClick={(e) => setActiveBtn(e.currentTarget.id)}
        >
          Кросовки
        </button>
        <button
          id="en-mode-btn"
          type="button"
          className={activeBtn === "en-mode-btn" ? "active-btn" : ""}
          onClick={(e) => setActiveBtn(e.currentTarget.id)}
        >
          Sneakers
        </button>
      </div>
      <button
        type="submit"
        className="fetch-button"
        disabled={Boolean(!activeBtn)}
        onClick={() => handleGetData(URL)}
      >
        Загрузить каталог
      </button>
    </div>
  );
};

export default CatalogBeforeData;
