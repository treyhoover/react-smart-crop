import React, { Component } from "react";
import { withContentRect } from 'react-measure'
import smartcrop from "smartcrop";
import { debounce, get, isEqual } from "lodash";

const CROP_DEBOUNCE = 15;

class CroppedImg extends Component {
  state = {
    xPercent: 0,
    yPercent: 0,
    scale: 1,
    loaded: false,
  };

  componentDidMount() {
    this.crop();
  }

  componentWillReceiveProps(nextProps) {
    const oldBounds = get(this.props, "contentRect.bounds");
    const newBounds = get(nextProps, "contentRect.bounds");

    if (!isEqual(oldBounds, newBounds)) {
      const { width, height } = newBounds;

      this.crop(width, height);
    }
  }

  crop = debounce((width = 0, height = 0) => {
    const { src, boost } = this.props;

    if (width <= 0 || height <= 0) return;

    const img = new Image();

    img.onload = (e) => {
      smartcrop.crop(e.target, { width, height, boost }).then((result) => {
        const { x, y } = result.topCrop;
        const scale = result.topCrop.width / width;

        console.log(result);

        const xPercent = Math.min(100, x / result.topCrop.width * 100);
        const yPercent = Math.min(100, y / result.topCrop.height * 100);
        const loaded = true;

        this.setState({ xPercent, yPercent, loaded, scale });
      });
    };

    img.src = src;
  }, CROP_DEBOUNCE);

  render() {
    const { loaded, xPercent, yPercent } = this.state;
    const { src, measureRef } = this.props;

    return (
      <div
        ref={measureRef}
        style={{
          opacity: loaded ? 1 : 0,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: `${xPercent}% ${yPercent}%`,
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${src})`,
          transition: "opacity 100ms ease",
        }}
      />
    );
  }
}

export default withContentRect('bounds')(CroppedImg);
