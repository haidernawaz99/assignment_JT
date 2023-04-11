import { Injectable } from '@nestjs/common';
import {
  getExtensionPeriodFS,
  setExtensionPeriodFS,
} from 'common/utils/extension-period';
import { ExpirationConfig } from './interfaces/expiration.config.interface';
import { SetExpirationInputParams } from './dtos/admin.setExpirationInput';
import {
  getCategoriesFS,
  setCategoriesFS,
} from 'common/utils/manage-categories';
import { SetCategoriesInputParams } from './dtos/admin.setCategoriesInput';
import { Config } from './interfaces/config.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SetUserViewInputParams } from './dtos/admin.setUserViewInput.return';

@Injectable()
export class AdminService {
  constructor(@InjectModel('Config') private configModel: Model<Config>) {}

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
    return await getCategoriesFS();
  }

  // Categories Config Ends Here
  // ---------------------------------------------------------------

  // ----------------------------------------------------------------
  // Default Sort Order Config Starts From Here

  async getSortConfig(): Promise<Config> {
    const res = await this.configModel.findOne({ key: 'sort' });
    return res;
  }

  async getOrderConfig(): Promise<Config> {
    const res = await this.configModel.findOne({ key: 'order' });
    return res;
  }

  async setSortConfig(input: string): Promise<Config> {
    const res = await this.configModel.findOneAndUpdate(
      { key: 'sort' },
      { $set: { value: input } },
      { new: true },
    );
    return res;
  }

  async setOrderConfig(input: string): Promise<Config> {
    const res = await this.configModel.findOneAndUpdate(
      { key: 'order' },
      { $set: { value: input } },
      { new: true },
    );
    return res;
  }
  // Categories Config Ends Here

  // Default Limit Config Starts From Here
  async getLimitConfig(): Promise<Config> {
    const res = await this.configModel.findOne({ key: 'limit' });
    return res;
  }

  async setLimitConfig(input: number): Promise<Config> {
    const res = await this.configModel.findOneAndUpdate(
      { key: 'limit' },
      { $set: { value: input } },
      { new: true },
    );
    return res;
  }
  // Default Limit Config Ends Here

  // Default User View Config Starts From Here

  async getUserViewConfig(): Promise<Config[]> {
    const res = await this.configModel.find();
    return res;
  }

  async setUserViewConfig(input: SetUserViewInputParams): Promise<Config[]> {
    await this.configModel.updateOne(
      { key: 'limit' },
      { $set: { value: input.limit } },
    );
    await this.configModel.updateOne(
      { key: 'order' },
      { $set: { value: input.order } },
    );
    await this.configModel.updateOne(
      { key: 'sort' },
      { $set: { value: input.sort } },
    );
    await this.configModel.updateOne(
      { key: 'extensionPeriod' },
      { $set: { value: input.extensionPeriod } },
    );

    return await this.getUserViewConfig();
  }

  // ---------------------------------------------------------------
}
