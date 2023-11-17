import { Controller, Get, Query, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Get()
  calculateRetirementAge(
    @Query('username') username: string,
    @Query('password') password: string,
    @Res() res: Response,
  ) {
    const response = {
      result: this.service.login(username, password),
    };

    return response.result.isLoggedIn
      ? res.status(200).json(response)
      : res.status(400).json(response);
  }
}
