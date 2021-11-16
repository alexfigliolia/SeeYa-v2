const initialState = {
  token: null,
  refreshToken: null,
  name: '',
  email: '',
  password: '',
  loginErrorMessage: '',
  signUpErrorMessage: '',
  loginSuccess: false,
  loading: false,
  loginError: false,
  signUpError: false,
  signUpSuccess: false,
  user: {},
  fadeLogin: false,
  checkedAuthState: false,
}

const Authentication = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_FORM_CHANGE': {
      const { key, value } = action;
      return Object.assign({}, state, { [key]: value });
    }
    case 'SENDING_AUTH_REQUEST':
      return Object.assign({}, state, {
        loading: true,
        loginErrorMessage: '',
        signUpErrorMessage: ''
      });
    case 'AUTHENTICATED':
      return Object.assign({}, state, { loading: false });
    case 'LOGGED_IN': {
      const { token, refreshToken, user } = action;
      return Object.assign({}, state, { token, refreshToken, user });
    }
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { loginSuccess: true });
    case 'LOGIN_ERROR':
      return Object.assign({}, state, { loginError: true });
    case 'RESET_LOGIN_STATE':
      return Object.assign({}, state, { loginSuccess: false, loginError: false, loading: false });
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state, { signUpSuccess: true });
    case 'SIGN_UP_ERROR':
      return Object.assign({}, state, { signUpError: true });
    case 'RESET_SIGN_UP_STATE':
      return Object.assign({}, state, { signUpSuccess: false, signUpError: false, loading: false });
    case 'AUTHENTICATION_ERROR': {
      const { message, method } = action;
      return Object.assign({}, state, {
        [method === 'signup' ? 'signUpErrorMessage' : 'loginErrorMessage']: message,
        loading: false
      });
    }
    case 'FADE_LOGIN_SCREEN':
      return Object.assign({}, state, { fadeLogin: true });
    case 'CHECKED_AUTH_STATE':
      return Object.assign({}, state, { checkedAuthState: true });
    default:
      return state;
  }
}

export default Authentication;