import { Component } from 'react';
import { connect } from 'react-redux';
import ResizeObserver from 'HOCs/ResizeObserver';
import Input from 'Components/Input';
import StateButton from 'Components/StateButton';
import { updateAuthForm } from 'Actions/Authentication';
import Auth from 'Services/Auth/Login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static defaultProps = {
    index: 0,
    email: '',
    password: '',
    active: false,
    cacheHeight: () => { },
    updateAuthForm: () => { }
  }

  shouldComponentUpdate({ active, email, password, loading, loginSuccess, loginError }) {
    const curProps = this.props;
    if (active !== curProps.active) return true;
    else if (email !== curProps.email) return true;
    else if (password !== curProps.password) return true;
    else if (loading !== curProps.loading) return true;
    else if (loginSuccess !== curProps.loginSuccess) return true;
    else if (loginError !== curProps.loginError) return true;
    return false;
  }

  onChange(key) {
    return e => {
      this.props.updateAuthForm(key, e.target.value);
    }
  }

  onInput(e) {
    e.target.value = e.target.value.toLowerCase();
  }

  login(e) {
    e.preventDefault();
    Auth.login();
  }

  resize({ height }) {
    const { cacheHeight, index } = this.props;
    cacheHeight(index, height);
  }

  render() {
    const { active, email, password, loading, loginSuccess, loginError } = this.props;
    return (
      <ResizeObserver
        Tag='form'
        className={`login-form${active ? ' active' : ''}`}
        attributes={{ onSubmit: this.login }}
        resize={this.resize}>
        <Input
          autoFocus
          id='email'
          className='login-input'
          type='text'
          name='email'
          label='Email'
          value={email}
          onInput={this.onInput}
          onChange={this.onChange('email')} />
        <Input
          id='pwd'
          className='login-input'
          type='password'
          name='password'
          label='Password'
          value={password}
          onChange={this.onChange('password')} />
        <StateButton
          className='login-submit'
          text='LOGIN'
          attributes={{
            onClick: this.login
          }}
          loading={loading}
          success={loginSuccess}
          error={loginError}
          iconDimensions={35} />
      </ResizeObserver>
    )
  }
}

const mSTP = ({ Authentication }) => {
  const { email, password, loading, loginSuccess, loginError } = Authentication;
  return { email, password, loading, loginSuccess, loginError };
}

export default connect(mSTP, { updateAuthForm })(Login);