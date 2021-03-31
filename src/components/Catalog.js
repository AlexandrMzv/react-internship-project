import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Search from "./Search";
import CatalogBeforeData from "./CatalogBeforeData";
import CatalogLists from "./CatalogLists";

const Catalog = () => {
  const dataFetchError = useSelector((state) => state.dataFetchError);
  const dataIsLoading = useSelector((state) => state.dataIsLoading);
  const dataByIds = useSelector((state) => state.itemsReducer.data.byIds);

  const dataIsReady =
    !dataIsLoading && !dataFetchError && Object.keys(dataByIds).length;

  if (dataIsLoading) {
    return (
      <div className="loader-wrapper">
        <Loader
          className="loader"
          type="TailSpin"
          color="#f1356d"
          height={100}
          width={100}
        />
      </div>
    );
  }

  if (dataIsLoading) {
    return (
      <div className="loader-wrapper">
        <Loader
          className="loader"
          type="TailSpin"
          color="#f1356d"
          height={100}
          width={100}
        />
      </div>
    );
  }

  if (!dataIsReady) {
    return (
      <div className="catalog">
        {dataFetchError && <div>Fetch error</div>}
        <CatalogBeforeData />
      </div>
    );
  }

  return (
    <div className="catalog">
      <Search />
      <CatalogLists />
    </div>
  );
};

export default Catalog;
