import React from "react";
import { RecoilRoot } from "recoil";
import "./App.css";
import CurrentUserInfo from "./components/currentUserInfo";
import ErrorBoundary from "./components/errorBoundary";
import TodoList from "./containers/todoList";

function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TodoList />
          <CurrentUserInfo />
        </React.Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}

export default App;
