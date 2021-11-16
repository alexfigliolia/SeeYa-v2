import { Component } from 'react';
import './_Loader.scss';

export default class Loader extends Component {

  static defaultProps = {
    dimensions: '100px',
    fill: 'transparent',
    stroke: '#000'
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { dimensions, fill, stroke } = this.props;
    return (
      <svg
        className='triangle-loader'
        width={dimensions}
        height={dimensions}
        viewBox="-3 -4 39 39">
        <polygon
          fill={fill}
          stroke={stroke}
          strokeWidth="1"
          points="16,0 32,32 0,32" />
      </svg>
    );
  }
}