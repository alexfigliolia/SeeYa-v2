import { batch } from 'react-redux';
import Store from 'Store';
import GraphHTTP from 'Services/GraphHTTP';
import Queries from './Queries';

const { dispatch } = Store;

export default class AuthStatus {

  static checkStatus() {
    const token = this.getToken();
    if (!token) {
      dispatch({ type: 'CHECKED_AUTH_STATE' });
      return;
    }
    this.validateToken(token);
  }

  static getToken() {
    return localStorage.getItem('accessToken');
  }

  static async validateToken(token) {
    try {
      const { CheckAuthStatus } = await GraphHTTP.client({
        data: {
          query: Queries.AUTH_STATE_QUERY,
          variables: {
            input: {
              token,
              clientMutationId: 'abc'
            }
          }
        }
      });
      if (!CheckAuthStatus || !CheckAuthStatus?.user) {
        dispatch({ type: 'CHECKED_AUTH_STATE' });
        return;
      }
      batch(() => {
        dispatch({
          type: 'LOGGED_IN',
          token,
          refreshToken: token,
          user: CheckAuthStatus.user
        });
        dispatch({ type: 'CHECKED_AUTH_STATE' });
      })
    } catch (error) {
      console.log(error);
    }
  }
}