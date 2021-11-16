import { Component } from 'react';
import './_Input.scss';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: this.props.value.length > 0
    };
    this.input = null;
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setInput = this.setInput.bind(this);
  }

  static defaultProps = {
    id: null,
    name: 'input',
    type: 'text',
    className: '',
    value: '',
    label: '',
    onInput: null,
    onFocus: null,
    onBlur: null,
    onChange: null,
    autoFocus: false
  }

  componentDidMount() {
    if (
      this.props.autoFocus &&
      this.input
    ) {
      this.input.focus();
    }
  }

  shouldComponentUpdate({ value, className }, { focused }) {
    const curProps = this.props;
    if (value !== curProps.value) return true;
    else if (className !== curProps.className) return true;
    else if (focused !== this.state.focused) return true;
    return false;
  }

  getClassName(propClass, value, focused) {
    let className = 'base-input';
    if (!!propClass) className += ` ${propClass}`;
    if (value.length || focused) className += ' is-focused';
    return className;
  }

  onFocus(e) {
    this.setState({ focused: true }, () => {
      const { onFocus } = this.props;
      onFocus && onFocus(e);
    });
  }

  onBlur(e) {
    this.setState({ focused: false }, () => {
      const { onBlur } = this.props;
      onBlur && onBlur(e);
    });
  }

  setInput(c) {
    this.input = c;
  }

  render() {
    const {
      id,
      type,
      name,
      value,
      label,
      className,
      onInput,
      onChange
    } = this.props;
    return (
      <div className={this.getClassName(className, value, this.state.focused)}>
        {
          label &&
          <label htmlFor={id}>{label}</label>
        }
        <div>
          <input
            id={id}
            type={type}
            name={name}
            value={value}
            onInput={onInput}
            onChange={onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={this.setInput} />
        </div>
      </div>
    );
  }
}