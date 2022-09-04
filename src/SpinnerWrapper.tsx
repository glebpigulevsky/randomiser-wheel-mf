import React from "react";
import { render } from "react-dom";
import { Circle } from "./components/Circle/Circle";

export default (element, items, isReady) => {
  render(<Circle items={items} isReady={isReady} />, element);
};
