import { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'Components/Input';
import StateButton from 'Components/StateButton';
import ResizeObserver from 'HOCs/ResizeObserver';
import Auth from 'Services/Auth/SignUp';
import { updateAuthForm } from 'Actions/Authentication';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  static defaultProps = {
    active: false,
    name: '',
    email: '',
    password: '',
    cacheHeight: () => { },
    updateAuthForm: () => { }
  }

  shouldComponentUpdate({ active, name, email, password, signUpError, signUpSuccess, loading }) {
    const curProps = this.props;
    if (active !== curProps.active) return true;
    else if (name !== curProps.name) return true;
    else if (email !== curProps.email) return true;
    else if (password !== curProps.password) return true;
    else if (loading !== curProps.loading) return true;
    else if (signUpSuccess !== curProps.signUpSuccess) return true;
    else if (signUpError !== curProps.signUpError) return true;
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

  signUp(e) {
    e.preventDefault();
    Auth.signUp();
  }

  resize({ height }) {
    const { cacheHeight, index } = this.props;
    cacheHeight(index, height);
  }

  render() {
    const { active, name, email, password, signUpError, signUpSuccess, loading } = this.props;
    return (
      <ResizeObserver
        Tag='form'
        className={`login-form sign-up-form${active ? ' active' : ''}`}
        attributes={{ onSubmit: this.signUp }}
        resize={this.resize}>
        <Input
          id='name'
          className='login-input'
          type='text'
          name='name'
          label='Name'
          value={name}
          onChange={this.onChange('name')} />
        <Input
          id='s-email'
          className='login-input'
          type='text'
          name='s-email'
          label='Email'
          value={email}
          onInput={this.onInput}
          onChange={this.onChange('email')} />
        <Input
          id='s-pwd'
          className='login-input'
          type='password'
          name='s-password'
          label='Password'
          value={password}
          onChange={this.onChange('password')} />
        <StateButton
          className='login-submit'
          text='SIGN UP'
          attributes={{
            onClick: this.signUp
          }}
          loading={loading}
          success={signUpSuccess}
          error={signUpError}
          iconDimensions={35} />
      </ResizeObserver>
    )
  }
}

const mSTP = ({ Authentication }) => {
  const { name, email, password, signUpError, signUpSuccess, loading } = Authentication;
  return { name, email, password, signUpError, signUpSuccess, loading };
}

export default connect(mSTP, { updateAuthForm })(SignUp);