const chalk = require("chalk");

class ConsoleLogger {
  constructor() {
    this.origin = this._getLogOrigin().split(/[\\/]/).pop();
  }

  _getLogOrigin() {
    let filename;

    const _pst = Error.prepareStackTrace;
    Error.prepareStackTrace = function (err, stack) {
      return stack;
    };
    try {
      const err = new Error();
      let callerfile;
      let currentfile;

      currentfile = err.stack.shift().getFileName();

      while (err.stack.length) {
        callerfile = err.stack.shift().getFileName();

        if (currentfile !== callerfile) {
          filename = callerfile;
          break;
        }
      }
    } catch (err) {}
    Error.prepareStackTrace = _pst;

    return filename;
  }

  error(content) {
    console.log(
      chalk.grey(new Date().toLocaleTimeString()) +
        `  ❗️ [` +
        chalk.red.bold(
          `${
            this.origin.length > 25
              ? this.origin.substring(0, 17) + "..."
              : this.origin
          }`
        ) +
        `] ` +
        " ".repeat(25 - (this.origin.length > 25 ? 25 : this.origin.length)) +
        "| " +
        content
    );
  }

  info(content) {
    console.log(
      chalk.grey(new Date().toLocaleTimeString()) +
        `  🔆  [` +
        chalk.yellow.bold(
          `${
            this.origin.length > 25
              ? this.origin.substring(0, 17) + "..."
              : this.origin
          }`
        ) +
        `] ` +
        " ".repeat(25 - (this.origin.length > 25 ? 25 : this.origin.length)) +
        "| " +
        content
    );
  }

  success(content) {
    console.log(
      chalk.grey(new Date().toLocaleTimeString()) +
        `  ❇️   [` +
        chalk.green.bold(
          `${
            this.origin.length > 25
              ? this.origin.substring(0, 17) + "..."
              : this.origin
          }`
        ) +
        `] ` +
        " ".repeat(25 - (this.origin.length > 25 ? 25 : this.origin.length)) +
        "| " +
        content
    );
  }

  custom(content, emoji, color, brightColor = false) {
    console.log(
      chalk.grey(new Date().toLocaleTimeString()) +
        `  ${emoji}  [` +
        chalk.bold[color + (brightColor ? "Bright" : "")](
          `${
            this.origin.length > 20
              ? this.origin.substring(0, 17) + "..."
              : this.origin
          }`
        ) +
        `] ` +
        " ".repeat(20 - (this.origin.length > 20 ? 20 : this.origin.length)) +
        "| " +
        content
    );
  }
}

module.exports = ConsoleLogger;
