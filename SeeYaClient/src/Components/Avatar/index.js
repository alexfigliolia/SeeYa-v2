import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ResizeObserver from 'HOCs/ResizeObserver';
import './_Avatar.scss';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = { source: null, ready: false };
    this.timer = null;
    this.width = 0;
    this.image = null;
    this.resize = this.resize.bind(this);
    this.setImg = this.setImg.bind(this);
    this.onImageLoaded = this.onImageLoaded.bind(this);
  }

  static defaultProps = {
    fill: '#fff',
    image: '',
  }

  componentDidMount() {
    if (this.image && this.image.complete) {
      this.setState({ ready: true });
    }
  }

  shouldComponentUpdate({ image }, { source, ready }) {
    if (image !== this.props.image) return true;
    else if (source !== this.state.source) return true;
    else if (ready !== this.state.ready) return true;
    return false;
  }

  componentDidUpdate(pp) {
    const { image } = this.props;
    if (image !== pp.image && !!pp.image && !!image) {
      this.createSource();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  resize({ width }) {
    this.width = width;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(() => {
      this.createSource();
    }, 250);
  }

  createSource() {
    const [token1, token2] = this.props.image.split('/upload/');
    this.setState({ source: `${token1}/upload/ar_1.0,c_fill,w_${this.width}/${token2}` });
  }

  setImg(c) {
    this.image = c;
  }

  onImageLoaded() {
    if (!this.state.ready) {
      this.setState({ ready: true });
    }
  }

  getAvatar() {
    const { source, ready } = this.state;
    return (
      <Fragment>
        <div className={`avatar-skeleton${ready ? ' ready' : ''}`} />
        <ResizeObserver
          Tag='img'
          attributes={{
            src: source,
            alt: 'User',
            onLoad: this.onImageLoaded
          }}
          setRef={this.setImg}
          resize={this.resize} />
      </Fragment>
    );
  }

  render() {
    const { image, fill } = this.props;
    return (
      <div className='avatar'>
        {
          !!image ?
            this.getAvatar()
            :
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill={fill}>
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z' />
            </svg>
        }
      </div>
    )
  }
}

const mSTP = ({ Authentication }) => {
  return { image: Authentication.user?.image };
}

export default connect(mSTP)(Avatar);