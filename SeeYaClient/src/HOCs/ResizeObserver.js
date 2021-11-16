import { Component } from 'react';
import { ResizeObserver as SizeObserver } from '@juggle/resize-observer';

export default class ResizeObserver extends Component {
  constructor(props) {
    super(props);
    this.element = null;
    this.height = null;
    this.width = null;
    this.map = {
      'border-box': 'borderBoxSize',
      'content-box': 'contentBoxSize',
      'content-rect': 'contentRect',
      'device-pixel': 'devicePixelContentBoxSize'
    }
    this.observer = new SizeObserver(entries => {
      const { length } = entries;
      for (let i = 0; i < length; i++) {
        const { height, width } = this.parse(entries[i]);
        const { checkHeight, checkWidth, resize } = this.props;
        let update = false;
        if (checkHeight) {
          if (height !== this.height) {
            this.height = height;
            update = true;
          }
        }
        if (checkWidth) {
          if (width !== this.width) {
            this.width = width;
            update = true;
          }
        }
        if (update) {
          resize({ height, width });
        }
      }
    });
    this.setRef = this.setRef.bind(this);
  }

  static defaultProps = {
    Tag: 'div',
    id: null,
    className: '',
    boxSizing: 'border-box',
    checkHeight: true,
    checkWidth: true,
    attributes: {},
    setRef: null,
    resize: () => { }
  }

  componentDidMount() {
    this.observer.observe(this.element);
  }

  componentWillUnmount() {
    this.observer.disconnect();
    this.observer = null;
  }

  setRef(c) {
    this.element = c;
    const { setRef } = this.props;
    if (setRef) setRef(c);
  }

  parse(entry) {
    const parser = {
      'borderBoxSize': entries => {
        const { blockSize, inlineSize } = entries[entries.length - 1];
        return { height: blockSize, width: inlineSize };
      },
      'contentBoxSize': entries => {
        const { blockSize, inlineSize } = entries[entries.length - 1];
        return { height: blockSize, width: inlineSize };
      },
      'contentRect': ({ height, width }) => {
        return { height, width };
      },
      'devicePixelContentBoxSize': entries => {
        const { blockSize, inlineSize } = entries[entries.length - 1];
        return { height: blockSize, width: inlineSize };
      }
    };
    const dimensionKey = this.map[this.props.boxSizing];
    return parser[dimensionKey](entry[dimensionKey]);
  }

  render() {
    const { Tag, id, className, attributes, children } = this.props;
    return (
      <Tag
        id={id}
        ref={this.setRef}
        className={className}
        {...attributes}>{children}</Tag>
    );
  }
}