import { Controller, Get, Query, Res } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { Response } from 'express';
import { Contribution } from './types';

@Controller('contributions')
export class ContributionsController {
  constructor(private readonly service: ContributionsService) {}

  @Get()
  calculateRetirementAge(
    @Query('allYearsData') allYearsData: Contribution[],
    @Res() res: Response,
  ) {
    const response = {
      result: this.service.getContributionsResult(allYearsData),
    };

    return res.status(200).json(response);
  }
}
