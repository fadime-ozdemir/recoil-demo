import React from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import store from "../store/store";

export default function CurrentCatInfo() {
  function CatInfo({ catID }) {
    const catNameLoadable = useRecoilValueLoadable(store.catName(catID));
    console.log("catNameLoadable", catNameLoadable);
    switch (catNameLoadable.state) {
      case "hasValue":
        return <div>{catNameLoadable.contents}</div>;
      case "loading":
        return <div>Loading...</div>;
      case "hasError":
        throw catNameLoadable.contents;
      default:
        break;
    }
  }
  const currentCatID = useRecoilValue(store.currentCatID);
  const currentCat = useRecoilValue(store.catName(currentCatID));
  //   const refreshCatInfo = useRecoilRefresher_UNSTABLE(currentCat(currentCatID));
  console.log("currentCat", currentCat);
  return (
    <div>
      {CatInfo(2)}

      <div>
        <h1>{currentCat?.name}</h1>
        {/* <button onClick={() => refreshCatInfo()}>Refresh</button> */}
      </div>
    </div>
  );
}
