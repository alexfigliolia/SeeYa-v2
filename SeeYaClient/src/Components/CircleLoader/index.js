import { PureComponent } from 'react';
import './_CircleLoader.scss';

export default class CircleLoader extends PureComponent {

  static defaultProps = {
    width: '45px',
    height: '45px',
  }

  render() {
    return (
      <svg
        className='circle-loader'
        {...this.props}
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'>
        <circle
          cx='50'
          cy='50'
          r='44'
          strokeWidth='7'
          stroke='#fff'
          strokeDasharray='69.11503837897544 69.11503837897544'
          fill='none'
          strokeLinecap='round'>
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='1s'
            keyTimes='0;1'
            values='0 50 50;360 50 50' />
        </circle>
      </svg>
    );
  }
}