import React, { Component } from 'react';
import Page from 'Components/Page';
import Username from 'Components/Username';
import Background from './Background';
import './_Profile.scss';

export default class Profile extends Component {

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Page className='user-profile'>
        <Background />
        <Username />
      </Page>
    )
  }
}
