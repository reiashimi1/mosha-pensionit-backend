import { Injectable } from '@nestjs/common';
import { Gender } from './Gender';
import { YearPlannedDays } from './YearPlannedDays';

@Injectable()
export class GenderService {
  getMaxYearPlannedDays = (gender: Gender): number => {
    if (gender == Gender.Male) {
      return YearPlannedDays.MaleDays;
    } else if (gender == Gender.Female) {
      return YearPlannedDays.FemaleDays;
    } else {
      throw new Error('Invalid gender');
    }
  };
}
