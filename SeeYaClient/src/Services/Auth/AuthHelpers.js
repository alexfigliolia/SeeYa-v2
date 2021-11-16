import Store from 'Store';

const { dispatch } = Store;

export default class AuthHelpers {

  static getTimeout(startTime) {
    const elapsed = Date.now() - startTime;
    if (elapsed > 1000) return 0;
    return 1000 - elapsed;
  }

  static loading() {
    dispatch({ type: 'SENDING_AUTH_REQUEST' });
  }

  static dispatchSuccess(startTime, payload, uiSuccess = () => { }) {
    this.storeToken(payload);
    setTimeout(() => {
      uiSuccess();
      setTimeout(() => {
        dispatch({ type: 'FADE_LOGIN_SCREEN' });
      }, 1250);
      setTimeout(() => {
        dispatch({ type: 'LOGGED_IN', ...payload });
      }, 1750);
    }, this.getTimeout(startTime));
  }

  static dispatchError(startTime, uiError = () => { }) {
    setTimeout(() => {
      uiError();
    }, this.getTimeout(startTime));
  }

  static storeToken({ token }) {
    localStorage.setItem('accessToken', token);
  }
}