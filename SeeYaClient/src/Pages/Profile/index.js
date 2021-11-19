import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from 'Components/Page';
import Username from 'Components/Username';
import Uploader from 'Components/Uploader';
import Background from './Background';
import './_Profile.scss';

class Profile extends Component {

  static defaultProps = {
    uploadingNewImage: false
  }

  shouldComponentUpdate({ uploadingNewImage }) {
    return uploadingNewImage !== this.props.uploadingNewImage;
  }

  render() {
    return (
      <Page className='user-profile'>
        <Background />
        <Username />
        <Uploader
          visible={this.props.uploadingNewImage}
          title='Uploading'
          subtext="It'll only take a moment..."
          reducer='User'
          successExtractor='imageUploadSuccess'
          errorExtractor='imageUploadError'
          progressExtractor='imageUploadProgress' />
      </Page>
    )
  }
}

const mSTP = ({ User: { uploadingNewImage } }) => {
  return { uploadingNewImage };
}

export default connect(mSTP)(Profile);