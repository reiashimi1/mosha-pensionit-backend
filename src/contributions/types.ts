export type Contribution = {
  year: string;
  plannedDays: string;
  completedDays: string;
  daysToSubtract?: number;
  daysToCalculate: string;
  isYearCalculated: boolean;
};

export type ContributionResponseType = {
  fullYears: number;
  fullMonths: number;
  fullDays: number;
};

export type StateWork = {
  startDate: string;
  endDate: string;
};
