import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";
import Search from "./Search";
import CatalogBeforeData from "./CatalogBeforeData";
import CatalogLists from "./CatalogLists";

const Catalog = () => {
  const dataFetchError = useSelector((state) => state.dataFetchError);
  const dataIsLoading = useSelector((state) => state.dataIsLoading);
  const fetchClicked = useSelector((state) => state.fetchClicked.clicked);

  if (!fetchClicked) {
    return (
      <div className="catalog">
        <CatalogBeforeData />
      </div>
    );
  }

  const dataIsReady = !dataIsLoading && !dataFetchError;

  return (
    <div className="catalog">
      {dataFetchError && <div>Error</div>}
      {dataIsLoading && (
        <div className="loader-wrapper">
          <Loader
            className="loader"
            type="TailSpin"
            color="#f1356d"
            height={100}
            width={100}
          />
        </div>
      )}
      {dataIsReady && <Search />}
      {dataIsReady && <CatalogLists />}
    </div>
  );
};

export default Catalog;
