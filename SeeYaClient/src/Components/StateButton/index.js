import { Component } from 'react';
import CircleLoader from 'Components/CircleLoader';
import Check from 'Icons/check.svg';
import X from 'Icons/x.svg';
import './_StateButton.scss';

export default class StateButton extends Component {

  static defaultProps = {
    Tag: 'button',
    text: '',
    className: '',
    loading: false,
    error: false,
    success: false,
    iconDimensions: 40
  }

  shouldComponentUpdate({ loading, error, success }) {
    const curProps = this.props;
    if (loading !== curProps.loading) return true;
    else if (error !== curProps.error) return true;
    else if (success !== curProps.success) return true;
    return false;
  }

  getClassNames() {
    const { className: propClass, loading, error, success } = this.props;
    let className = 'state-button';
    if (propClass) className += ` ${propClass}`;
    if (loading) className += ' loading';
    if (error) className += ' error';
    if (success) className += ' success';
    return className;
  }

  render() {
    const { Tag, attibutes, text, iconDimensions, loading, error, success } = this.props;
    return (
      <Tag
        className={this.getClassNames()}
        {...attibutes}
        disabled={loading || error || success}>
        {text}
        <CircleLoader
          aria-hidden={!loading}
          height={iconDimensions}
          width={iconDimensions} />
        <img
          aria-hidden={!success}
          className='check'
          src={Check} alt='success' />
        <img
          aria-hidden={!error}
          className='x'
          src={X} alt='failed' />
      </Tag>
    )
  }
}
