import { Module } from '@nestjs/common';
import { CalculatorModule } from './calculator/calculator.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [CalculatorModule, LoginModule],
})
export class AppModule {}
