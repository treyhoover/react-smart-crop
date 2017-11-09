import React from "react";
import ReactCursorPosition from 'react-cursor-position';
import { clamp } from "lodash";
import Img from './Img';
import src from "./img.jpg";

const CURSOR_OFFSET_X = -10;
const CURSOR_OFFSET_Y = -25;

class App extends React.Component {
  state = {
    x: 0.5,
    y: 0.5,
  };

  _percentX = 0;
  _percentY = 0;

  handleMousePositionChange = (position) => {
    if (!position || !position.elementDimensions || !position.position) return;

    const { width, height } = position.elementDimensions;
    const { x, y } = position.position;

    const percentX = (x + CURSOR_OFFSET_X) / width;
    const percentY = (y + CURSOR_OFFSET_Y) / height;

    if (Number.isFinite(percentX) && Number.isFinite(percentY)) {
      this._percentX = percentX;
      this._percentY = percentY;
    }
  };

  setCenter = (e) => {
    const x = clamp(this._percentX, 0, 1);
    const y = clamp(this._percentY, 0, 1);

    console.log([x, y]);

    this.setState({ x, y });
  };

  render() {
    const { x, y } = this.state;

    return (
      <ReactCursorPosition
        shouldDecorateChildren={false}
        onPositionChanged={this.handleMousePositionChange}
      >
        <div
          onClick={this.setCenter}
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
          }}
        >
          <Img src={src} x={x} y={y} />

          <span
            style={{
              position: "absolute",
              top: ` ${y * 100}%`,
              left: `${x * 100}%`,
              fontSize: 32,
              color: "red",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
          {"⌖"}
        </span>
        </div>
      </ReactCursorPosition>
    );
  }
}

export default App;
