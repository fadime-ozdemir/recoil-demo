import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export default function Info() {
  const textState = atom({
    key: "textState", // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
  });
  const charCountState = selector({
    key: "charCountState", // unique ID (with respect to other atoms/selectors)
    get: ({ get }) => {
      const text = get(textState);

      return text.length;
    },
  });
  const [text] = useRecoilState(textState);
  const count = useRecoilValue(charCountState);
  return (
    <div>
      <p>
        Value input <span id="value">{text}</span>
      </p>
      <p>
        count letters <span id="count">{count}</span>
      </p>
    </div>
  );
}
