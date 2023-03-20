import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

import { AffiliatesService } from './affiliates.service';
import { ApproveAffiliatesInputParams } from './dtos/admin.approveAffiliatesInput';
import { DeleteAffiliatesInputParams } from './dtos/admin.deleteAffiliateInput';
import { DisableAffiliatesInputParams } from './dtos/admin.disableAffiliateInput';
import { EnableAffiliatesInputParams } from './dtos/admin.enableAffiliateInput';
import { AdminAffiliateReturn } from './dtos/affiliate.adminAffiliates.return';
import { CreateAffiliateReturn } from './dtos/affiliate.createAffiliate.return';
import { GetAllAffiliatesInputParams } from './dtos/affiliate.getAllAffiliatesInput';
import { CreateAffiliateInputParams } from './dtos/affiliate.getCreateAffiliateInput';
import { AffiliateJobReturn } from './dtos/affiliate.getJobsAffiliate.return';
import { GetJobAffiliatesInputParams } from './dtos/affiliate.getJobsInput';

@Resolver()
export class AffiliatesResolver {
  constructor(private readonly affiliateService: AffiliatesService) {}
  @Mutation(() => CreateAffiliateReturn)
  async createAffiliate(@Args('input') input: CreateAffiliateInputParams) {
    console.log('Create Affiliate: ', input);
    return this.affiliateService.createAffiliate(input);
  }

  @Query(() => [AdminAffiliateReturn])
  async getAllAffiliates(@Args('input') input: GetAllAffiliatesInputParams) {
    return this.affiliateService.getAllAffiliates(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async approveAffiliate(@Args('input') input: ApproveAffiliatesInputParams) {
    console.log('Manage Affiliate: ', input);
    return this.affiliateService.approveAffiliate(input);
  }

  @Query(() => [AffiliateJobReturn])
  async getJobsAffiliate(
    @Args('input', { nullable: true }) input: GetJobAffiliatesInputParams,
  ) {
    return this.affiliateService.getJobsAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async deleteAffiliate(@Args('input') input: DeleteAffiliatesInputParams) {
    console.log('Delete Affiliate: ', input);
    return this.affiliateService.deleteAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async disableAffiliate(@Args('input') input: DisableAffiliatesInputParams) {
    console.log('Disable Affiliate: ', input);
    return this.affiliateService.disableAffiliate(input);
  }

  @Mutation(() => AdminAffiliateReturn)
  async enableAffiliate(@Args('input') input: EnableAffiliatesInputParams) {
    console.log('Enable Affiliate: ', input);
    return this.affiliateService.enableAffiliate(input);
  }
}
