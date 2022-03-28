import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import store from "../store/store";

function CurrentUserInfo() {
  const currentUser = useRecoilValue(store.currentUserInfo);
  const friends = useRecoilValue(store.friendsInfo);
  const setCurrentUserID = useSetRecoilState(store.userID);

  /*
  Note that this pre-fetching works by triggering the selectorFamily() to initiate an async query and populate the selector's cache. If you are using an atomFamily() instead, by either setting the atoms or relying on atom effects to initialize, then you should use useRecoilTransaction_UNSTABLE() instead of useRecoilCallback(), as trying to set the state of the provided Snapshot will have no effect on the live state in the host <RecoilRoot>
  */
  const changeUser = useRecoilCallback(({ snapshot, set }) => (userID) => {
    snapshot.getLoadable(store.userInfo(userID)); // pre-fetch user info
    set(setCurrentUserID, userID); // change current user to start new render
  });

  return (
    <div>
      <h1>{currentUser?.name}</h1>
      <ul>
        {friends?.map((friend) => (
          <li
            key={friend?.id}
            onClick={() => setCurrentUserID(friend.id)}
            // onClick={() => changeUser(friend?.id)}
          >
            {friend?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CurrentUserInfo;
