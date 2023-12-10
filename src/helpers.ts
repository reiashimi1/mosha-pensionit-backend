import moment from 'moment';

export const convertStateDaysToContributionsDays = (
  year: number,
  daysInYear: number,
  maxYearDays: number,
): number => {
  const isLeapYear = moment([year]).isLeapYear();
  const currentYear = isLeapYear ? 366 : 365;

  return Number((daysInYear * maxYearDays) / currentYear);
};
