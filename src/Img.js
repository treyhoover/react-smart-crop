import React from "react";

class Img extends React.Component {
  render() {
    const { src, x, y } = this.props;

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: `${x * 100}% ${y * 100}%`,
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${src})`,
        }}
      />
    );
  }
}

export default Img;
