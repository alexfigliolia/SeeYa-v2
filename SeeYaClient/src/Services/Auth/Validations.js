import Store from 'Store';

const { dispatch } = Store;

export default class Validations {

  static validateLogin(email, password, method = 'login') {
    if (!this.validateEmail(email)) {
      this.throwError('Please enter a valid email', method);
      return false;
    }
    const { valid, message } = this.validatePassword(password);
    if (!valid) {
      this.throwError(message, method);
      return false;
    }
    return true;
  }

  static validateName(name) {
    if (name.length < 4 || name.indexOf(' ') === -1) {
      this.throwError('Your full name is required', 'signup')
      return false
    }
    return true;
  }

  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+$/;
    return regex.test(email);
  }

  static validatePassword(password) {
    const { length } = password;
    if (length < 6 || length > 16) {
      return { valid: false, message: 'Your password must be between 6 and 16 characters' };
    }
    const regex = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regex.test(password)) {
      return { valid: false, message: 'Your password should contain at least one letter and one number' };
    }
    return { valid: true };
  }

  static throwError(message, method = 'login') {
    dispatch({ type: 'LOGIN_ERROR' });
    dispatch({ type: 'AUTHENTICATION_ERROR', message, method });
    setTimeout(() => {
      dispatch({ type: 'RESET_LOGIN_STATE' });
    }, 1250);
  }
}