const YELLOW = '\x1b[33m%s\x1b[0m';
const CYAN = '\x1b[36m%s\x1b[0m';
const MAGENTA = '\x1b[35m%s\x1b[0m';
const RED = '\x1b[31m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';
const BLUE = '\x1b[34m%s\x1b[0m';
const GRAY = '\x1b[90m%s\x1b[0m';
const WHITE = '\x1b[37m%s\x1b[0m';

export type ConsoleColor = 'yellow' | 'cyan' | 'magenta' | 'red' | 'green' | 'blue' | 'gray' | 'white';

export class ConsoleHelper {
  static log(message: string, color: ConsoleColor): void {
    console.log(ConsoleHelper.colorToAnsi(color), message);
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
}
