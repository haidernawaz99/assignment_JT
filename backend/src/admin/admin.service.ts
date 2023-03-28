import { Inject, Injectable } from '@nestjs/common';
import {
  getExtensionPeriodFS,
  setExtensionPeriodFS,
} from 'common/utils/extension-period';
import { ExpirationConfig } from './interfaces/expiration.config.interface';
import { SetExpirationInputParams } from './dtos/admin.setExpirationInput';
import { CategoriesConfig } from './interfaces/categories.config.interface';
import {
  getCategoriesFS,
  setCategoriesFS,
} from 'common/utils/manage-categories';
import { SetCategoriesInputParams } from './dtos/admin.setCategoriesInput';
import { JobsService } from 'src/jobs/jobs.service';

@Injectable()
export class AdminService {
  @Inject(JobsService)
  private readonly jobsService: JobsService;

  // ----------------------------------------------------------------
  // Expiration Period Config Starts From Here
  async getExpiration(): Promise<ExpirationConfig> {
    return { days: (await getExtensionPeriodFS()) / 1000 / 60 / 60 / 24 }; //<--- Convert to Days from Milliseconds
  }

  async setExpiration(
    input: SetExpirationInputParams,
  ): Promise<ExpirationConfig> {
    const updatedConfig = { ...input };
    setExtensionPeriodFS(updatedConfig);
    return this.getExpiration();
  }

  // Expiration Period Config Ends Here
  // ----------------------------------------------------------------

  // ----------------------------------------------------------------
  // Categories Config Starts From Here

  async setCategories(input: SetCategoriesInputParams): Promise<[object]> {
    console.log(input);
    const updatedConfig = { ...input };
    setCategoriesFS(updatedConfig);
    return this.jobsService.getCategories();
  }

  // Categories Config Ends Here
  // ---------------------------------------------------------------
}
