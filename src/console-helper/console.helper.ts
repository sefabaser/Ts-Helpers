const FOR_THE_REST = '%s\x1b[0m';

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
    console.log(ConsoleHelper.colorToAnsi(color) + FOR_THE_REST, message);
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

  static yellow(): string {
    return YELLOW;
  }

  static cyan(): string {
    return CYAN;
  }

  static magenta(): string {
    return MAGENTA;
  }

  static red(): string {
    return RED;
  }

  static green(): string {
    return GREEN;
  }

  static blue(): string {
    return BLUE;
  }

  static gray(): string {
    return GRAY;
  }
}
