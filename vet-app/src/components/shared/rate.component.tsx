import { Rate } from "antd";
import React, { useState } from "react";

const desc = ["terrible 😱", "bad 👎", "normal 👌", "good 👍", "wonderful 👌"];

interface IProp {
  fontSize?: number
}
const RaterComponent: React.FC<IProp> = ({ fontSize }) => {
  const [value, setValue] = useState(3);
  console.log("value: ", value);
  return (
    <>
      <span>
        <Rate
          tooltips={desc}
          style={{ color: "#f77908", fontSize: fontSize ? fontSize :"12px" }}
          onChange={setValue}
          value={value}
        />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
    </>
  );
};

export default RaterComponent;
