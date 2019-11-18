import { Comparator } from './comparator/comparator';

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
    return Math.abs(date1.getTime() - date2.getTime()) / this.totalTicksInOneDay;
  }

  static differanceInHours(date1: Date, date2: Date) {
    return Math.abs(date1.getTime() - date2.getTime()) / this.totalTicksInOneHour;
  }

  static getStartOfTheDay(date = new Date()): Date {
    let response = new Date(date.getTime());
    response.setHours(0, 0, 0, 0);
    return response;
  }

  static getStartOfTheNextDay(date = new Date()): Date {
    let response = this.getStartOfTheDay(date);
    response.setDate(response.getDate() + 1);
    return response;
  }

  static getDayCountOfTheMonth(date: Date): number {
    if (Comparator.isDate(date)) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    } else {
      throw -1;
    }
  }

  static addDays(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static isSameDay(date1: Date, date2: Date): boolean {
    if (Comparator.isDate(date1) && Comparator.isDate(date2)) {
      let date1Tick = this.getDayTick(date1);
      let date2Tick = this.getDayTick(date2);
      return date1Tick > -1 && date1Tick === date2Tick;
    } else {
      return false;
    }
  }

  static getDayTick(date: Date): number {
    return Math.floor(date.getTime() / this.totalTicksInOneDay);
  }

  static get totalTicksInOneDay() {
    return 24 * 60 * 60 * 1000;
  }

  static get totalTicksInOneHour() {
    return 60 * 60 * 1000;
  }

  static roundDate(date: Date): Date {
    date = new Date(date);
    let timeStamp = date.getTime();
    timeStamp += timeStamp % (12 * 60 * 60 * 1000);
    timeStamp -= date.getTimezoneOffset() * 60 * 1000;
    date = new Date(timeStamp);
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);
    return new Date(DatetimeHelper.dateToSimpleString(date));
  }

  static dateToSimpleString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
  }

  static getDaysBetweenRange(from: Date, to: Date): Date[] {
    let dateArray: Date[] = [];
    let currentDate = from;
    while (currentDate <= to) {
      dateArray.push(currentDate);
      currentDate = DatetimeHelper.addDayWithoutTimeZone(currentDate);
    }
    dateArray.pop();
    return dateArray;
  }

  private static addDayWithoutTimeZone(date: Date): Date {
    let dateCandidate = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() + 1 < 10 ? '0' : ''}${date.getDate() + 1}`
    );
    if (!Comparator.isDate(dateCandidate)) {
      dateCandidate = new Date(`${date.getFullYear()}-${date.getMonth() + 2 < 10 ? '0' : ''}${date.getMonth() + 2}-01`);
    }
    if (!Comparator.isDate(dateCandidate)) {
      dateCandidate = new Date(`${date.getFullYear() + 1}-01-01`);
    }
    return dateCandidate;
  }
}
