import {
  atom,
  selector,
  selectorFamily,
  waitForAll,
  waitForNone,
} from "recoil";

const todoListState = atom({
  key: "TodoList",
  default: [],
});

const todoListFilterState = atom({
  key: "TodoListFilter",
  default: "Show All",
});

const filteredTodoListState = selector({
  key: "FilteredTodoList",
  get: ({ get }) => {
    const filter = get(store.filters);
    const list = get(store.todoList);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: "TodoListStats",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

async function myDBQuery(id) {
  try {
    const r = await fetch("http://localhost:3000/users?id=" + id?.userID);
    const data = await r.json();
    return data;
  } catch (e) {
    return console.log(e);
  }
}
// user list
const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

// Sometimes you want to be able to query based on parameters that aren't just based on derived state.
const userInfoQuery = selectorFamily({
  key: "UserInfoQuery",
  get: (userID) => async () => {
    const response = await myDBQuery({ userID });
    if (response.error) {
      throw response.error;
    }
    return response?.[0];
  },
});

const currentUserInfoQuery = selector({
  key: "CurrentUserInfoQuery",
  get: ({ get }) => get(userInfoQuery(get(currentUserIDState))),
});

// serialized requests
// const friendsInfoQuery = selector({
//   key: "FriendsInfoQuery",
//   get: ({ get }) => {
//     const { friendList } = get(currentUserInfoQuery);
//     return friendList.map((friendID) => get(userInfoQuery(friendID)));
//   },
// });

// concurrent requests with waitForAll
// const friendsInfoQuery = selector({
//   key: "FriendsInfoQuery",
//   get: ({ get }) => {
//     const user = get(currentUserInfoQuery);
//     const friendList = user.friends;
//     const friends = get(
//       waitForAll(friendList.map((friendID) => userInfoQuery(friendID.id)))
//     );
//     return friends;
//   },
// });

// concurrent requests to handle incremental updates to the UI with partial data
const friendsInfoQuery = selector({
  key: "FriendsInfoQuery",
  get: ({ get }) => {
    const currentUser = get(currentUserInfoQuery);
    const friendList = currentUser.friends;
    const friendLoadables = get(
      waitForNone(friendList?.map((friend) => userInfoQuery(friend.id)))
    );

    return friendLoadables
      .filter(({ state }) => state === "hasValue")
      .map(({ contents }) => contents);
  },
});

const store = {
  todoList: todoListState,
  filters: todoListFilterState,
  filteredTodos: filteredTodoListState,
  stats: todoListStatsState,
  currentUserInfo: currentUserInfoQuery,
  userInfo: userInfoQuery,
  friendsInfo: friendsInfoQuery,
  userID: currentUserIDState,
};

export default store;
