import { Module } from '@nestjs/common';
import { CalculatorModule } from './calculator/calculator.module';
import { LoginModule } from './login/login.module';
import { ContributionsModule } from './contributions/contributions.module';

@Module({
  imports: [CalculatorModule, LoginModule, ContributionsModule],
})
export class AppModule {}
