import Store from 'Store';
import GraphHTTP from 'Services/GraphHTTP';
import Validations from './Validations';
import Queries from './Queries';
import AuthHelpers from './AuthHelpers';

const { getState, dispatch } = Store;

export default class Login {

  static async login() {
    AuthHelpers.loading();
    const { email, password } = getState().Authentication;
    if (!Validations.validateLogin(email, password)) {
      return;
    }
    const startTime = Date.now();
    try {
      const { Login } = await GraphHTTP.client({
        data: {
          query: Queries.LOGIN_QUERY,
          variables: {
            input: {
              email,
              password,
              clientMutationId: 'abc'
            }
          }
        }
      });
      const { error } = Login;
      if (error) {
        AuthHelpers.dispatchError(startTime, this.dispatchError(error));
      } else {
        AuthHelpers.dispatchSuccess(startTime, Login, this.dispatchSuccess);
      }
    } catch (error) {
      AuthHelpers.dispatchError(startTime, this.dispatchError(error.message));
    }
  }

  static dispatchSuccess() {
    dispatch({ type: 'LOGIN_SUCCESS' });
  }

  static dispatchError(message = '') {
    return () => {
      dispatch({ type: 'LOGIN_ERROR' });
      dispatch({ type: 'AUTHENTICATION_ERROR', method: 'login', message });
      setTimeout(() => {
        dispatch({ type: 'RESET_LOGIN_STATE' });
      }, 2000);
    }
  }
}