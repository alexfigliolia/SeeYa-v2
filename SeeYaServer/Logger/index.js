import Chalk from 'chalk';

export default class Logger {
  static log(styles = ['red', 'bold'], text = '') {
    let temp = Chalk;
    console.log(
      styles.reduce((acc, next) => {
        return acc = acc[next];
      }, temp)(text)
    );
  }
}