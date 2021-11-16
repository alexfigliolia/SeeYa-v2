import { Component } from 'react';
import './_FormToggler.scss';

export default class FormToggler extends Component {
  constructor(props) {
    super(props);
    this.width = `${100 / this.props.buttons.length}`;
  }

  static defaultProps = {
    active: 0,
    className: '',
    buttons: [],
    setActive: () => { }
  }

  shouldComponentUpdate({ active }) {
    return active !== this.props.active;
  }

  onClick(index) {
    return () => {
      this.props.setActive(index);
    }
  }

  getClassNames(classProp) {
    let className = 'form-toggler';
    if (classProp) className += ` ${classProp}`;
    return className;
  }

  render() {
    const { active, buttons, className } = this.props;
    const width = `${this.width}%`;
    return (
      <div className={this.getClassNames(className)}>
        <div className='abs-container'>
          {
            buttons.map((button, i) => {
              return (
                <button
                  key={button}
                  style={{ width }}
                  onClick={this.onClick(i)}
                  className={`ft-button${active === i ? ' active' : ''}`}>{button}</button>
              );
            })
          }
        </div>
        <div className='abs-container'>
          <div
            className='highlighter'
            style={{
              width,
              left: `${this.width * active}%`
            }} />
        </div>
      </div>
    )
  }
}
