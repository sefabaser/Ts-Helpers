const DEFAULT = '\x1b[0m';

const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const GRAY = '\x1b[90m';
const WHITE = '\x1b[37m';

export type ConsoleColor = 'yellow' | 'cyan' | 'magenta' | 'red' | 'green' | 'blue' | 'gray' | 'white';

export class ConsoleHelper {
  static log(message: string, color: ConsoleColor): void {
    console.log(ConsoleHelper.colorToAnsi(color) + '%s' + DEFAULT, message);
  }

  static newLine(): void {
    console.log();
  }

  private static colorToAnsi(color: ConsoleColor): string {
    switch (color) {
      case 'yellow':
        return YELLOW;
      case 'cyan':
        return CYAN;
      case 'magenta':
        return MAGENTA;
      case 'red':
        return RED;
      case 'green':
        return GREEN;
      case 'blue':
        return BLUE;
      case 'gray':
        return GRAY;
      case 'white':
        return WHITE;
    }
  }

  static get yellow(): string {
    return YELLOW;
  }

  static get cyan(): string {
    return CYAN;
  }

  static get magenta(): string {
    return MAGENTA;
  }

  static get red(): string {
    return RED;
  }

  static get green(): string {
    return GREEN;
  }

  static get blue(): string {
    return BLUE;
  }

  static get gray(): string {
    return GRAY;
  }

  static get white(): string {
    return WHITE;
  }

  static get default(): string {
    return DEFAULT;
  }
}
