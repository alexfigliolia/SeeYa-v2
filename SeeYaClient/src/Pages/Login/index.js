import { Component } from 'react';
import { connect } from 'react-redux';
import FormToggler from './FormToggler';
import LoginForm from './Forms/Login';
import SignUp from './Forms/SignUp';
import './_Login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeForm: 0,
      heights: {
        0: 'auto',
        1: 'auto'
      }
    };
    this.cacheHeight = this.cacheHeight.bind(this);
    this.setActiveForm = this.setActiveForm.bind(this);
  }

  shouldComponentUpdate(
    { loginErrorMessage, signUpErrorMessage, fadeLogin },
    { activeForm, heights }
  ) {
    const curProps = this.props;
    if (loginErrorMessage !== curProps.loginErrorMessage) return true;
    else if (signUpErrorMessage !== curProps.signUpErrorMessage) return true;
    else if (fadeLogin !== curProps.fadeLogin) return true;
    const curState = this.state;
    if (activeForm !== curState.activeForm) return true;
    else if (heights[0] !== curState.heights[0]) return true;
    else if (heights[1] !== curState.heights[1]) return true;
    return false;
  }

  setActiveForm(index) {
    this.setState({ activeForm: index });
  }

  cacheHeight(index, height) {
    const { heights } = this.state;
    if (heights[index] !== height) {
      this.setState(({ heights }) => {
        return {
          heights: Object.assign(
            {},
            heights,
            { [index]: height }
          )
        }
      });
    }
  }

  render() {
    const { loginErrorMessage, signUpErrorMessage, fadeLogin } = this.props;
    const { activeForm, heights } = this.state;
    const error = activeForm === 0 ? loginErrorMessage : signUpErrorMessage;
    return (
      <section className={`login${fadeLogin ? ' hide' : ''}`}>
        <div className='login-form-container'>
          <FormToggler
            active={activeForm}
            buttons={['Login', 'Sign Up']}
            setActive={this.setActiveForm} />
          <h1>See Ya</h1>
          <p className={`login-error${!!error ? ' active' : ''}`}>{error || 'There was an error'}</p>
          <div
            className='form-container'
            style={{ height: heights[activeForm] }}>
            <LoginForm
              index={0}
              active={activeForm === 0}
              cacheHeight={this.cacheHeight} />
            <SignUp
              index={1}
              active={activeForm === 1}
              cacheHeight={this.cacheHeight} />
          </div>
        </div>
      </section>
    );
  }
}

const mSTP = ({ Screen, Authentication }) => {
  const { loginErrorMessage, signUpErrorMessage, fadeLogin } = Authentication;
  return {
    loginErrorMessage,
    signUpErrorMessage,
    fadeLogin
  };
}

export default connect(mSTP)(Login);