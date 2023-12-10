import { Controller, Get, Query, Res } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { Response } from 'express';
import { Contribution, StateWork } from './types';
import { Gender } from './Gender';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly service: ContributionsService) {}

  @Get()
  calculateRetirementAge(
    @Query('allYearsData') allYearsData: [],
    @Query('gender') gender: Gender,
    @Res() res: Response,
  ) {
    const contributions = Object.values(allYearsData);
    const response = {
      result: this.service.getContributionsResult(contributions, gender),
    };

    return res.status(200).json(response);
  }

  @Get('/state-days')
  calculateStateDays(
    @Query('allYearsData') allYearsData: [],
    @Query('stateWorkConfigs') stateWorkConfigs: [],
    @Query('gender') gender: Gender,
    @Res() res: Response,
  ) {
    const contributions = Object.values(allYearsData);
    const stateWorkDays = Object.values(stateWorkConfigs);
    const response = {
      result: this.service.getYearsWithStateWorkConfigs(
        contributions,
        stateWorkDays,
        gender,
      ),
    };

    return res.status(200).json(response);
  }
}
