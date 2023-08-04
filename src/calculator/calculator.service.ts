import { Injectable } from '@nestjs/common';
import moment from 'moment';

@Injectable()
export class CalculatorService {
  private birthday: string;
  private gender: string;

  private calculateRetirementYear = (baseYears, isMale = false): string => {
    const retirementDate = moment(this.birthday).add(baseYears, 'years');
    if (
      (isMale && moment(retirementDate).get('year') < 2033) ||
      (!isMale && moment(retirementDate).get('year') < 2015)
    ) {
      const finalRetirementDate = retirementDate.format('YYYY-MM-DD');
      return finalRetirementDate;
    }
    if (isMale) {
      const yearsDifference = moment(retirementDate).get('year') - 2032;
      const monthsToAdd = this.calculateExtraMonths(yearsDifference, 1, 24);
      const finalRetirementDate = retirementDate
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');
      return finalRetirementDate;
    } else {
      const yearsDifference = (moment(retirementDate).get('year') - 2014) * 2;
      const monthsToAdd = this.calculateExtraMonths(yearsDifference, 2, 84);
      const finalRetirementDate = retirementDate
        .add(monthsToAdd, 'months')
        .format('YYYY-MM-DD');
      return finalRetirementDate;
    }
  };

  private calculateExtraMonths = (
    yearsDifference,
    growthRate,
    maxMonthsToAdd,
  ) => {
    let total = yearsDifference + moment(this.birthday).get('month');
    let extraMonths = 0;
    while (total >= 12) {
      extraMonths += growthRate;
      total = total - 12 + growthRate;
    }
    return extraMonths + yearsDifference < maxMonthsToAdd
      ? extraMonths + yearsDifference
      : maxMonthsToAdd;
  };

  calculateRetirementAge(birthday: string, gender: 'male' | 'female'): string {
    this.birthday = birthday;
    this.gender = gender;
    if (!birthday || !gender) {
      throw new Error('Invalid data');
    }
    if (gender === 'male') {
      return this.calculateRetirementYear(65, true);
    } else {
      return this.calculateRetirementYear(60);
    }
  }
}
