import { Component } from 'react';
import { connect } from 'react-redux';
import './_ProgressBar.scss';

class ProgressBar extends Component {

  static defaultProps = {
    progress: 0,
    reducer: '',
    error: false,
    success: false,
    errorExtractor: '',
    successExtractor: '',
    progressExtractor: ''
  }

  shouldComponentUpdate({ progress, error, success }) {
    const curProps = this.props;
    if (progress !== curProps.progress) return true;
    else if (error !== curProps.error) return true;
    else if (success !== curProps.success) return true;
    return false;
  }

  getClassNames(error, success) {
    let className = 'progress-bar';
    if (error) className += ' error';
    if (success) className += ' success';
    return className;
  }

  render() {
    const { error, success, progress } = this.props;
    return (
      <div className={this.getClassNames(error, success)}>
        <div
          className='fill'
          style={{ width: `${progress}%` }} />
      </div>
    )
  }
}

const mSTP = (
  state, {
    reducer,
    errorExtractor,
    successExtractor,
    progressExtractor
  }) => {
  const {
    [errorExtractor]: error,
    [successExtractor]: success,
    [progressExtractor]: progress
  } = (state?.[reducer] || {});
  return { error, success, progress };
}

export default connect(mSTP)(ProgressBar);