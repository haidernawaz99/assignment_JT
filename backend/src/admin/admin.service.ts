import { Injectable } from '@nestjs/common';
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

@Injectable()
export class AdminService {
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

  async getCategories(): Promise<[object]> {
    return await getCategoriesFS(); // <-- This is how the frontend's table accepts the data
  }

  async setCategories(input: SetCategoriesInputParams): Promise<[object]> {
    const updatedConfig = { ...input };
    console.log('updatedConfig', updatedConfig);
    setCategoriesFS(updatedConfig);
    return this.getCategories();
  }

  // Categories Config Ends Here
  // ---------------------------------------------------------------
}
