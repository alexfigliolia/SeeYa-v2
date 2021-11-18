import { Component } from 'react';
import './_Page.scss';

export default class Page extends Component {

  static defaultProps = {
    className: '',
    children: [],
  }

  getClassNames(propClass) {
    let className = 'page';
    if (!!propClass) className += ` ${propClass}`;
    return className;
  }

  render() {
    const { className, children } = this.props;
    return (
      <section className={this.getClassNames(className)}>
        {children}
      </section>
    )
  }
}
