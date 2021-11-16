import Store from 'Store';
import GraphHTTP from 'Services/GraphHTTP';
import Queries from './Queries';
import Validations from './Validations';
import AuthHelpers from './AuthHelpers';

const { getState, dispatch } = Store;

export default class SignUp {

  static async signUp() {
    AuthHelpers.loading();
    const { name, email, password } = getState().Authentication;
    if (!Validations.validateName(name)) {
      return;
    }
    if (!Validations.validateLogin(email, password)) {
      return;
    }
    const now = Date.now();
    try {
      const { CreateAccount } = await GraphHTTP.client({
        data: {
          query: Queries.CREATE_ACCOUNT_QUERY,
          variables: {
            input: {
              name,
              email,
              password,
              clientMutationId: 'abc'
            }
          }
        }
      });
      const { error } = CreateAccount;
      if (!!error) {
        AuthHelpers.dispatchError(now, this.dispatchError(error));
      } else {
        AuthHelpers.dispatchSuccess(
          now,
          CreateAccount,
          this.dispatchSuccess
        );
      }
    } catch (error) {
      console.log(error);
      AuthHelpers.dispatchError(now, this.dispatchError(error.message));
    }
  }

  static dispatchSuccess() {
    dispatch({ type: 'SIGN_UP_SUCCESS' });
  }

  static dispatchError(message = '') {
    return () => {
      dispatch({ type: 'SIGN_UP_ERROR' });
      dispatch({ type: 'AUTHENTICATION_ERROR', method: 'signup', message });
      setTimeout(() => {
        dispatch({ type: 'RESET_SIGN_UP_STATE' });
      }, 2000);
    }
  }
}