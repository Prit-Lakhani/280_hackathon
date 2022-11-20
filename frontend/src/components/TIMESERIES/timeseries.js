/* eslint-disable */
import React, { Component } from "react";
import Navbar from "../navbar";
import Basket from "./dropArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

class TimeSeries extends Component {
  render() {
    return (
      <div>
        <DndProvider backend={HTML5Backend}>
          <Navbar />
          <Basket />
        </DndProvider>
      </div>
    );
  }
}

export default TimeSeries;
