import { Injectable } from '@nestjs/common';
import { Contribution, ContributionResponseType, StateWork } from './types';
import { Gender } from './Gender';
import moment from 'moment';
import { GenderService } from './gender-service.service';
import { convertStateDaysToContributionsDays } from '../helpers';

@Injectable()
export class ContributionsService {
  private fullYears = 0;
  private fullMonths = 0;
  private fullDays = 0;
  private maxYearDays;

  constructor(private readonly genderService: GenderService) {}

  getContributionsResult(
    contributions: Contribution[],
    gender: Gender,
  ): ContributionResponseType {
    this.maxYearDays = this.genderService.getMaxYearPlannedDays(gender);

    let totalDays = 0;
    contributions.forEach((contribution) => {
      if (contribution.isYearCalculated) {
        totalDays += Number(contribution.daysToCalculate);
      }
    });

    this.fullYears = Math.floor(totalDays / this.maxYearDays);

    const remainingDays = totalDays - this.fullYears * this.maxYearDays;

    this.fullMonths = Math.floor(remainingDays / (this.maxYearDays / 12));

    this.fullDays = Math.floor(
      ((remainingDays - this.fullMonths * (this.maxYearDays / 12)) * 30) /
        (this.maxYearDays / 12),
    );

    return {
      fullYears: this.fullYears,
      fullMonths: this.fullMonths,
      fullDays: this.fullDays,
    };
  }

  getYearsWithStateWorkConfigs(
    contributions: Contribution[],
    stateWorkDays: StateWork[],
    gender: Gender,
  ): Contribution[] {
    const allStateDays = [];
    this.maxYearDays = this.genderService.getMaxYearPlannedDays(gender);

    stateWorkDays.forEach((config) => {
      const startDate = moment(config.startDate, 'YYYY-MM-DD');
      const endDate = moment(config.endDate, 'YYYY-MM-DD');

      const startYear = startDate.year();
      const endYear = endDate.year();

      for (let year = startYear; year <= endYear; year++) {
        const yearStart = moment({ year });
        const yearEnd = moment({ year: year + 1 });
        const daysInYear = endDate.isBefore(yearEnd)
          ? endDate.diff(moment.max(startDate, yearStart), 'days')
          : yearEnd.diff(moment.max(startDate, yearStart), 'days');
        const finalDays = Math.floor(
          convertStateDaysToContributionsDays(
            year,
            daysInYear,
            this.maxYearDays,
          ),
        );
        allStateDays.push({ year: year.toString(), days: finalDays });
      }
    });

    const updatedAllYearsData = contributions.map((data) => {
      const matchingYear = allStateDays.find((item) => item.year === data.year);
      if (!!matchingYear) {
        const updatedPlannedDays = Number(data.plannedDays) - matchingYear.days;
        return {
          ...data,
          plannedDays:
            updatedPlannedDays > 0 ? updatedPlannedDays.toString() : '0',
        };
      }
      // } else {
      //   const updatedPlannedDays =
      //     this.genderService.getMaxYearPlannedDays(gender);
      //   return {
      //     ...data,
      //     plannedDays: updatedPlannedDays,
      //   };
      // }
      return data;
    });
    return updatedAllYearsData;
  }
}
