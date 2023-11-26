import { Injectable } from '@nestjs/common';
import { Contribution } from './types';

@Injectable()
export class ContributionsService {
  getContributionsResult(contributions: Contribution[]): string {
    return null;
  }
}
