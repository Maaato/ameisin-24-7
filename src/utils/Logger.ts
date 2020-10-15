class Logger {
  static info(message: string): void {
    console.log(
      '\x1b[36m%s\x1b[0m',
      '[INFO]',
      '\x1b[2m',
      new Date().toLocaleString(),
      '\x1b[0m',
      `${message}`
    );
  }

  static error(message: string): void {
    console.log(
      '\x1b[31m',
      '[ERROR]',
      '\x1b[2m',
      new Date().toLocaleString(),
      '\x1b[0m',
      `${message}`
    );
  }
}

export { Logger };
