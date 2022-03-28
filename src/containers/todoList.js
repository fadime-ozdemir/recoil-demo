import React from "react";
import { useRecoilValue } from "recoil";
import CurrentCatInfo from "../components/currentCatInfo";
import TodoItem from "../components/todoItem";
import TodoItemCreator from "../components/todoItemCreator";
import TodoListFilters from "../components/todoListFilters";
import TodoListStats from "../components/todoListStats";
import store from "../store/store";

function TodoList() {
  // changed from todoListState to filteredTodoListState
  const todoList = useRecoilValue(store.filteredTodos);
  //   const todoList = useRecoilValue(store.todoList);

  return (
    <>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {todoList.map((todoItem) => (
        <TodoItem key={todoItem.id} item={todoItem} />
      ))}

      <CurrentCatInfo />
    </>
  );
}

export default TodoList;
