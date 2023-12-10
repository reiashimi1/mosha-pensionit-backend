import { Module } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { ContributionsController } from './contributions.controller';
import { GenderService } from './gender-service.service';

@Module({
  controllers: [ContributionsController],
  providers: [ContributionsService, GenderService],
})
export class ContributionsModule {}
