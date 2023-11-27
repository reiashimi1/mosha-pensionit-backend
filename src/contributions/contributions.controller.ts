import { Controller, Get, Query, Res } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { Response } from 'express';
import { Contribution } from './types';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly service: ContributionsService) {}

  @Get()
  calculateRetirementAge(
    @Query('allYearsData') allYearsData: [],
    @Res() res: Response,
  ) {
    const contributions = Object.values(allYearsData);
    const response = {
      result: this.service.getContributionsResult(contributions),
    };

    return res.status(200).json(response);
  }
}
