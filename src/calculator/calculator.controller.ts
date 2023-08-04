import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CalculatorService } from './calculator.service';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}

  @Get()
  calculateRetirementAge(
    @Query('birthday') birthday: string,
    @Query('gender') gender: 'male' | 'female',
    @Res() res: Response,
  ) {
    const result = this.service.calculateRetirementAge(birthday, gender);
    const response = { data: { result } };

    return res.status(200).json(response);
  }
}
