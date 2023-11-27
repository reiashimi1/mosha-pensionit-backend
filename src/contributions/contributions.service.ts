import { Injectable } from '@nestjs/common';
import { Contribution, ContributionResponseType } from './types';

@Injectable()
export class ContributionsService {
  private fullYears = 0;
  private fullMonths = 0;
  private fullDays = 0;

  getContributionsResult(
    contributions: Contribution[],
  ): ContributionResponseType {
    let totalDays = 0;
    contributions.forEach((contribution) => {
      if (contribution.isYearCalculated) {
        totalDays += Number(contribution.daysToCalculate);
      }
    });

    this.fullYears = Math.floor(totalDays / 280);

    const remainingDays = totalDays - this.fullYears * 280;

    this.fullMonths = Math.floor(remainingDays / (280 / 12));

    this.fullDays = Math.floor(
      ((remainingDays - this.fullMonths * (280 / 12)) * 30) / (280 / 12),
    );

    return {
      fullYears: this.fullYears,
      fullMonths: this.fullMonths,
      fullDays: this.fullDays,
    };
  }
}
