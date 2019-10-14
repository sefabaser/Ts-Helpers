export class DatetimeHelper {
  static getNumberOfDaysInYear(year: number) {
    return DatetimeHelper.isLeapYear(year) ? 366 : 365;
  }

  static isLeapYear(year: number) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  static differanceInHours(date1: Date, date2: Date) {
    return Math.abs(date1.valueOf() - date2.valueOf()) / 36e5;
  }

  static get totalTicksInOneDay() {
    return 24 * 60 * 60 * 1000;
  }
}
