import React from "react";
import { useRecoilState } from "recoil";
import store from "../store/store";

export default function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(store.filters);

  const updateFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  return (
    <>
      Filter:
      <select value={filter} onChange={updateFilter}>
        <option value="Show All">All</option>
        <option value="Show Completed">Completed</option>
        <option value="Show Uncompleted">Uncompleted</option>
      </select>
    </>
  );
}
