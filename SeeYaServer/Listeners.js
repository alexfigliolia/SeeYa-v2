import Logger from 'Logger';

export default () => {
  if (process.env.NODE_ENV === 'development') {
    Logger.log(['red', 'bold'], '\n» Development mode: Attaching SIGINT listeners')
    process.once('SIGUSR2', function () {
      process.kill(process.pid, 'SIGUSR2');
    });

    process.on('SIGINT', function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, 'SIGINT');
    });
  }
}