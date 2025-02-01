// なんか知らんけど一時的にno-restricted-syntaxが外れた？
// eslint-disable-next-line
export enum DateFormat {
  DATE = 'MM/DD/YYYY',
  DATE_WITH_SHORT_YEAR = 'MM/DD/YY',
  DATE_WITH_SHORT_YEAR_MILITARY = 'MM/DD/YY, HHmm',
  TIME_12 = 'hh:mm A',
  WEEKDAY = 'dddd',
  WEEKDAY_WITH_TIME_WITHOUT_TIMEZONE = 'ddd, HHmm',
  TIME_24_WITH_SECONDS = 'HH:mm:ss',
  DATE_TIME_12 = 'MM/DD/YYYY hh:mm A',
  DATE_TIME_12_MILITARY = 'MM/DD/YYYY HHmm',
  ISO_DATE = 'YYYY-MM-DD',
  DATE_WITH_SHORT_DAY_OF_WEEK = 'ddd, MM/DD/YY',
  DATE_WITH_SHORT_DAY_OF_WEEK_AND_TIME = 'ddd, MM/DD/YY, hh:mm A',
  DATE_WITH_SHORT_DAY_OF_WEEK_AND_MILITARY_TIME = 'ddd, MM/DD/YY, HHmm',
  ISO_DATE_TIME_WITHOUT_TIMEZONE = 'YYYY-MM-DDTHH:mm:ss',
  MILITARY_TIME = 'HHmm',
  LOCAL_TIME = 'hh:mm:ss',
}
