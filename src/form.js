import React from "react";
import { atom, useRecoilState } from "recoil";

export default function Form() {
  const textState = atom({
    key: "textState", // unique ID (with respect to other atoms/selectors)
    default: "", // default value (aka initial value)
  });
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <form>
        <label for="input">Form Input</label>
        <input type="text" value={text} onChange={onChange} />
      </form>
    </div>
  );
}
