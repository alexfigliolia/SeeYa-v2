import { Component } from 'react';
import ProgressBar from 'Components/ProgressBar';
import Check from 'Icons/check.svg';
import X from 'Icons/x.svg';
import './_Uploader.scss';

export default class Uploader extends Component {

  static defaultProps = {
    title: '',
    subtext: '',
    visible: false,
    reducer: '',
    progressExtractor: '',
    successExtractor: '',
    errorExtractor: ''
  }

  shouldComponentUpdate({ title, subtext, visible }) {
    const curProps = this.props;
    if (visible !== curProps.visible) return true;
    else if (title !== curProps.title) return true;
    else if (subtext !== curProps.subtext) return true;
    return false;
  }

  render() {
    const {
      title,
      subtext,
      reducer,
      visible,
      errorExtractor,
      successExtractor,
      progressExtractor,
    } = this.props;
    return (
      <div className={`uploader${visible ? ' visible' : ''}`}>
        {
          title &&
          <div className='u-title'>{title}</div>
        }
        {
          subtext &&
          <div className='u-subtitle'>{subtext}</div>
        }
        <div className='u-progress'>
          <ProgressBar
            reducer={reducer}
            errorExtractor={errorExtractor}
            successExtractor={successExtractor}
            progressExtractor={progressExtractor} />
          <div className='response-elements'>
            <div className='response-text success-text'>Success!</div>
            <img className='response-icon success-icon' src={Check} alt='success' />
            <div className='response-text error-text'>Please try again.</div>
            <img className='response-icon error-icon' src={X} alt='error' />
          </div>
        </div>
      </div>
    )
  }
}