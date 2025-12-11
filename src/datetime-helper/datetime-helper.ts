import { Comparator } from '../comparator/comparator';

export class DatetimeHelper {
  static getNumberOfDaysInYear(year: number): 365 | 366 {
    return DatetimeHelper.isLeapYear(year) ? 366 : 365;
  }

  static isLeapYear(year: number): boolean {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  static differenceInDays(date1: Date, date2: Date): number {
    return Math.abs(date1.getTime() - date2.getTime()) / this.totalTicksInOneDay;
  }

  static differanceInHours(date1: Date, date2: Date): number {
    return Math.abs(date1.getTime() - date2.getTime()) / this.totalTicksInOneHour;
  }

  static getStartOfTheDay(date = new Date()): Date {
    let response = new Date(date.getTime());
    response.setHours(0, 0, 0, 0);
    return response;
  }

  static getDayCountOfTheMonth(date: Date): number {
    if (Comparator.isDate(date)) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    } else {
      throw new Error('Invalid date');
    }
  }

  static addDays(date: Date, days: number): Date {
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

  static get totalTicksInOneDay(): number {
    return 24 * 60 * 60 * 1000;
  }

  static get totalTicksInOneHour(): number {
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
    return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
      date.getDate() < 10 ? '0' : ''
    }${date.getDate()}`;
  }

  static getDaysBetweenRange(from: Date, to: Date): Date[] {
    let dateArray: Date[] = [];
    let currentDate = from;
    while (currentDate <= to) {
      dateArray.push(currentDate);
      currentDate = DatetimeHelper._addDayWithoutTimeZone(currentDate);
    }
    dateArray.pop();
    return dateArray;
  }

  private static _addDayWithoutTimeZone(date: Date): Date {
    let dateCandidate = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
        date.getDate() + 1 < 10 ? '0' : ''
      }${date.getDate() + 1}`
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
