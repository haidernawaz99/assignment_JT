import { Injectable } from '@nestjs/common';
import {
  getExtensionPeriod,
  setExtensionPeriod,
} from 'common/utils/extension-period';
import { AdminConfig } from './interfaces/admin.config.interface';
import { GetAdminConfigInputParams } from './dtos/admin.getAdminConfigInput';
import { SetAdminConfigInputParams } from './dtos/admin.setAdminConfigInput';

@Injectable()
export class AdminService {
  async getAdminConfig(input: GetAdminConfigInputParams): Promise<AdminConfig> {
    //TODO: Protect the route
    console.log(await getExtensionPeriod());
    return { days: (await getExtensionPeriod()) / 1000 / 60 / 60 / 24 };
  }

  async setAdminConfig(input: SetAdminConfigInputParams): Promise<AdminConfig> {
    //TODO: Protect the route

    const updatedConfig = { ...input };

    setExtensionPeriod(updatedConfig);
    return { days: (await getExtensionPeriod()) / 1000 / 60 / 60 / 24 };
  }
}
