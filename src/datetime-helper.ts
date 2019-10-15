export class DatetimeHelper {
  static getNumberOfDaysInYear(year: number) {
    return DatetimeHelper.isLeapYear(year) ? 366 : 365;
  }

  static isLeapYear(year: number) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  static addDay(date: Date, days: number) {
    let result = new Date(date.getTime());
    result.setDate(date.getDate() + days);
    return result;
  }

  static differenceInDays(date1: Date, date2: Date) {
    return Math.abs(date1.valueOf() - date2.valueOf()) / this.totalTicksInOneDay;
  }

  static differanceInHours(date1: Date, date2: Date) {
    return Math.abs(date1.valueOf() - date2.valueOf()) / this.totalTicksInOneHour;
  }

  static get totalTicksInOneDay() {
    return 24 * 60 * 60 * 1000;
  }

  static get totalTicksInOneHour() {
    return 60 * 60 * 1000;
  }
}
