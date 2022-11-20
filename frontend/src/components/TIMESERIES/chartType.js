/* eslint-disable */
import React from "react";
import { useDrag } from "react-dnd";

const ChartType = ({ name }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "chartText",
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className="chart-text" ref={dragRef}>
      {name}
      {isDragging && "!"}
    </div>
  );
};

export default ChartType;
