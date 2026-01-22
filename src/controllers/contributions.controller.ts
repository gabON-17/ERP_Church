import { ContributionsService } from "../services/contributions.service";

export class ContributionsController {
   constructor(
      private readonly contributionsService: ContributionsService
   ) {}
}