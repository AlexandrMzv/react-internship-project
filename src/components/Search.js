import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onSearch } from "../redux/actions/itemsActions";
import useDebounce from "../hooks/useDebounce";

const Input = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  useEffect(() => dispatch(onSearch(debouncedSearchTerm)), [
    debouncedSearchTerm,
    dispatch,
  ]);

  const searchHandler = (str) => {
    setSearchTerm(str);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="input">
      <form onSubmit={(e) => onFormSubmit(e)}>
        <input
          type="text"
          required
          placeholder="Type to search"
          value={searchTerm}
          onChange={(e) => searchHandler(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Input;
